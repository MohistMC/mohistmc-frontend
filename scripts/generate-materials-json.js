// scripts/generate-materials-json.js
const fs = require('fs');
const path = require('path');

// 配置路径
const imagesDir = path.join(__dirname, '..', 'public', 'img', 'items_1.21');
const outputDir = path.join(__dirname, '..', 'public', 'data');
const outputFile = path.join(outputDir, 'materials.json');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

try {
    // 读取目录中的所有文件
    const files = fs.readdirSync(imagesDir);

    // 过滤出PNG文件并处理文件名
    const materials = files
        .filter(file => file.endsWith('.png'))
        .map(file => {
            // 移除文件扩展名
            const name = file.replace('.png', '');

            // 如果文件名包含minecraft_前缀，则转换为minecraft:格式
            if (name.startsWith('minecraft_')) {
                return `minecraft:${name.replace('minecraft_', '')}`;
            }

            // 否则保持原样
            return name;
        })
        .sort(); // 排序以便更好地组织数据

    // 创建输出数据
    const outputData = {
        materials: materials,
        count: materials.length,
        generatedAt: new Date().toISOString()
    };

    // 写入JSON文件
    fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2));

    console.log(`Successfully generated materials.json with ${materials.length} items`);
    console.log(`Output file: ${outputFile}`);

} catch (error) {
    console.error('Error generating materials JSON:', error);
    process.exit(1);
}
