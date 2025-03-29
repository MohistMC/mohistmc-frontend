## 如何用 Mohist 拥有多个世界？

⚠️ \*\*免责声明：要在 Mohist 中拥有多个世界，您不能使用 Multiverse 或其他插件替代品，因为它们不能很好地与 forge 和 mod 一起使用。

### ->在 1.12.2 中创建新世界的步骤：

- 下载 [这个模组](https://www.curseforge.com/minecraft/mc-mods/just-enough-dimensions) 并将其放入您的 “mods” 文件夹中。

- 启动服务器并在服务器完全加载后停止服务器以生成配置文件。

- 要创建一个新的简单世界，您可以使用 [此预设 (dimensions.json)](https://cdn.discordapp.com/attachments/815331146303799296/825439539438157904/dimensions.json), 下载它并放在 “config/justenoughdimensions” 中，然后使用 /tpj 2 传送到这个世界。要创建其他世界，请使用与预设相同的语法并更改维度 ID（您不能为多个维度使用相同的维度 ID）。

<details>
  <summary>Main options</summary>
  
    - "dim" : Should be the same than the dimension ID.
  
    - "load_on_start" : set it to true if you want your dimension to be loaded at the start of your server (should be always enabled to not cause issues with plugins).
  
    - "keeploaded" :  set it to false if you want your dimension to be unloaded if there is no players inside.
  
    - "id" : This is the dimension ID  (Remember that you can't have the same dimension ID for more than one dimension).
  
    - "name" : The name of the dimension (only used by forge mods.)
  
    - "worldprovider" : Type of the dimension ("WorldProviderSurface" for an overworld type world, WorldProviderHell  for a nether type world and WorldProviderEnd for a end type world. you can also use worldproviders from mods if you know them !)
  
    - "require_exact_match" : should be always present and set to true.
    
There is other settings that you can set, you can see them in the mod's curseforge page.
</details>

<details>
  <summary>Preset Json</summary>
  
```json
{
  "config_version": {
    "id": "__default",
    "version": 0
    },
    "dimensions":
    [
        {
            "dim": 2,
            "load_on_start": true,
            "dimensiontype": {
                "id": 2,
                "name": "AltWorld",
                "keeploaded": true,
                "worldprovider": "WorldProviderSurface",
                "require_exact_match": true
            }
        }
    ]
}
```
</details>

### -> 在 1.16.5+ 中创建新世界的步骤：

- 下载 [数据包](https://cdn.discordapp.com/attachments/615256015704948808/850816329636380752/multiworld.zip) 并将其解压到 world/datapacks 文件夹中。

- 启动你的服务器并使用命令 /execute in multiworld：altworld-1 run tp ~ ~ ~ 将自己传送到新世界（也可以使用插件命令）。

- 如果你需要更多的世界，你需要复制并粘贴 world/datapacks/multiworld/data/multiworld/dimension 中的.json并重命名它（例如：altworld-3.json）。

<details>
  <summary>Datapack Json</summary>
  
```json
{
  "type": "minecraft:overworld",
  "generator": {
    "type": "minecraft:noise",
    "seed": 0,
    "biome_source": {
      "type": "minecraft:vanilla_layered",
      "seed": 0,
      "large_biomes": false
    },
    "settings": "minecraft:overworld"
  }
}
```
</details>

### -> 在 1.20.1+ 中创建新世界的步骤:

    直接使用 Multiverse-Core 插件 或者直接使用 mohist 自带的 /worlds 命令
