import React, {useEffect, useState} from 'react'
import {DocsThemeConfig, useConfig} from 'nextra-theme-docs'
import {useRouter} from "next/router";
import {getCopyrightText} from "@/util/String";

const config: DocsThemeConfig = {
    docsRepositoryBase: 'https://github.com/MohistMC/website/tree/frontend',
    footer: {
        component: function () {
            return <></>
        }
    },
    useNextSeoProps: function SEO() {
        const router = useRouter();
        const { frontMatter } = useConfig();

        const section = router?.pathname.startsWith("/mohist") ? 'Mohist' : router?.pathname.startsWith('/blog') ? 'Blog' : 'Banner';
        const defaultTitle = frontMatter.overrideTitle || section;

        return {
            defaultTitle,
            titleTemplate: `%s – ${section}`,
        };
    },
    head: function useHead() {
        const router = useRouter();

        const section = router?.pathname.startsWith("/mohist") ? 'Mohist' : router?.pathname.startsWith('/blog') ? 'Blog' : 'Banner';
        const description = section === 'Blog' ?
            `Stay updated with MohistMC's Blog! Explore the latest news, releases, and insights. Connect with our dynamic community. ${getCopyrightText()} MohistMC.` :
            `Need help setting up, configuring and using our software? The docs are here to help you. ${getCopyrightText()} MohistMC.`
        const title = section === 'Blog' ? 'MohistMC - Blog' : 'MohistMC - Docs'

        return (
            <>

                <meta name="title" content={title}/>
                <meta name="description"
                      content={description}/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://new.mohistmc.com/team"/>
                <meta property="og:title" content={title}/>
                <meta property="og:description"
                      content={description}/>
                <meta property="og:image" content="https://new.mohistmc.com/mohist_logo_transparent.png"/>

                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content="https://new.mohistmc.com/team"/>
                <meta property="twitter:title" content={title}/>
                <meta property="twitter:description"
                      content={description}/>
                <meta property="twitter:image" content="https://new.mohistmc.com/mohist_logo_transparent.png"/>
            </>
        )
    },
    themeSwitch: {
        component: null
    },
    editLink: {
        text: "Edit this page on GitHub",
    },
    gitTimestamp({ timestamp }) {
        const [dateString, setDateString] = useState(timestamp.toISOString());

        useEffect(() => {
            try {
                setDateString(
                    timestamp.toLocaleDateString(navigator.language, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })
                );
            } catch (e) {}
        }, [timestamp]);

        return <>Last updated on {dateString}</>;
    },
}

export default config