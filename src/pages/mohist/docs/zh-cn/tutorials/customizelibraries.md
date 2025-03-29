## 自定义库：

> 注意：库主要由 Class-Path 加载

### 使用自定义库的示例：

#### 默认库：

例如 Mohist 具有 `\libraries\org\ow2\asm\asm-debug-all\5.2\asm-debug-all-5.2.jar` 默认情况下。
如果我们需要将此库更新到 7.0 怎么办？

- 首先，获取 `asm-debug-all-7.0.jar`
- 将文件名更改为 `asm-debug-all-5.2.jar` (因为我们需要与 Class-Path 保持一致)
- 替换旧的 jar
- 在 mohist.yml 中修改配置
    - 查找默认 `libraries_black_list: aaaaa;bbbbbb`
    - 增加 `asm-debug-all-5.2` 到列表： `libraries_black_list: asm-debug-all-5.2;bbbbbb`
- 您已完成所有步骤，可以运行 mohist

#### 自定义库：

将其他 jar 添加为库

- 将你的 jar 文件放入`\libraries\customize_libraries`
- 您已完成所有步骤，可以运行 mohist
