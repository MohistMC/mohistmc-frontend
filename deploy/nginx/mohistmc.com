# mohistmc.com: / goes to Dockflow's switch; /maven, /api/v2 (the previous API) and /builds-raw (the
# archives on S3, with the host's snippet s3-archives-proxy.conf) stay nginx's.
# Deployed by the nginx plugin of dockflow.yml: edit it here, not on the server.
server {
    listen 80;
    listen [::]:80;

    server_name mohistmc.com www.mohistmc.com site.mohistmc.com;

    location / {
        proxy_intercept_errors on;

        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_connect_timeout 3s;
        proxy_read_timeout 5s;
        proxy_send_timeout 5s;

        error_page 502 503 504 = /maintenance.html;
    }

    location = /maintenance.html {
        root /var/www;
        internal;
    }

    location /maven {
        proxy_pass http://maven.mohistmc.com/;
    }

    location /api/v2 {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:2024;
    }

    # /builds-raw : servi par proxy vers le bucket public OVH S3.
    # Remplace l'ancien `alias /mnt/mohist-archives` (montage rclone/FUSE) :
    # un acces filesystem bloquant mettait les workers nginx en etat D
    # (insensibles a SIGKILL) des que S3 ralentissait, bloquant le port 80
    # et empechant tout redemarrage. Le proxy est non-bloquant et borne
    # par des timeouts : la requete echoue, le worker survit.

    location = /builds-raw {
        return 301 /builds-raw/;
    }

    # Listings de repertoires : servis depuis un index HTML pre-genere
    # (timer builds-index.timer -> /usr/local/bin/generate-builds-index).
    # L'API de listing S3 exige une signature AWS que nginx ne sait pas
    # produire, et faire lire un montage FUSE a nginx est precisement ce
    # qui bloquait les workers. Ici aucune requete client ne declenche
    # d'appel reseau : le travail S3 se fait dans le timer.
    #
    # try_files et non index : `index` ferait une redirection interne vers
    # .../index.html, qui serait recapturee par la location des fichiers
    # ci-dessous et proxifiee vers S3 (404). try_files sert le fichier
    # sans repasser par le routage des locations.
    location ~ "^/builds-raw/(?:[^/]+/)*$" {
        root /var/www/builds-index;
        try_files ${uri}index.html =404;
        expires 5m;
        add_header Cache-Control "public, max-age=300";
    }

    # Telechargement des fichiers (93% du trafic de /builds-raw).
    # La cle S3 est capturee explicitement : avec une variable dans
    # proxy_pass, nginx ne retire PAS le prefixe de location tout seul
    # (l'URI partirait en /builds-raw/... -> 403 cote S3).
    location ~ "^/builds-raw/(?<s3key>.+)$" {
        set $s3 "mohistmc-archives.s3.gra.io.cloud.ovh.net";
        proxy_pass https://$s3/$s3key;
        include snippets/s3-archives-proxy.conf;

        # S3 repond 403 (et non 404) sur une cle absente, faute de droit
        # de listing sur le bucket. On normalise, et on evite au passage
        # de renvoyer le XML d'erreur S3 au client.
        proxy_intercept_errors on;
        error_page 403 404 = @build_introuvable;
    }

    location @build_introuvable {
        default_type text/plain;
        return 404 "Build introuvable.\n";
    }

}
