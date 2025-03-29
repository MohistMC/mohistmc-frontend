## Bungeecord 支持

### 如何将 Bungeecord 与 Mohist 一起使用？

⚠️ **免责声明 : 您需要使用 Lightfall 为 1.13+ forge服务器, 但请记住 Lightfall 仍处于 `测试` 阶段，可能无法与每个 Mod 一起使用.**

Mohist 推荐的代理软件:

- [Waterfall](https://papermc.io/downloads#Waterfall) (for Mohist 1.12.2)
- [Lightfall](https://github.com/ArclightPowered/lightfall) (for Mohist 1.16.5+)

* 如果客户端使用 `GeyserMC` 模组, 将无法与 Mohist 一起使用，因为 Minecraft Windows 10 版本无法使用 forge mods。

如何使用 **Waterfall** 和 **Lightfall**:

- 在你的 Mohist 服务器文件夹中，在你至少运行了一次之后，修改这些配置：

-> **spigot.yml**

```
bungeecord: true
```

-> **server.properties**

```
online-mode=false //如果您仍然想要仅限高级的服务器，您可以稍后在 Waterfall 的配置文件中设置它
```

如果您正在尝试设置代理 在本地网络中，您还需要将 "服务器端口" 值 **server.properties** -> 设置 "服务器端口=25566" 例如
(如果您有多个服务器, _如果您正在运行代理，您应该拥有多个服务器_, 不要在此处为每个服务器设置相同的端口.)

- 现在，为您的 Waterfall 代理创建一个新文件夹，并使用以下 java 命令启动它:

```
java -jar <waterfall jar name>.jar
```

- 然后在代理完全启动后，键入 "**end**" 以关闭您的代理。

- 现在，您需要更改 **config.yml** 在 Waterfall 文件夹内:

-> **config.yml**

```
query_port: 25565 //如果您不在本地，请保留您的托管服务的端口
ip_forward: true
online_mode: true //或者 false 如果您想启用 cracked clients
forge_support: true
```

```
servers:
  lobby:
    motd: '&1My Mohist server - Lobby'
    address: localhost:25566 //use the port of your "lobby" server
    restricted: false
```

⚠️ **对于 1.16.5+ 用户:** 玩家需要下载 [Lightfall-client](https://github.com/ArclightPowered/lightfall-client/releases) 如果您的服务器需要客户端 Mod，则可以加入。您还可以看到 [source code](https://github.com/ArclightPowered/lightfall-client) 的 Lightfall 客户端。

- 现在您可以启动您的代理和所有 Mohist 服务器了！
