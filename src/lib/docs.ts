// lib/docs.ts
import fs from 'fs';
import path from 'path';

export type DocItem = {
    id: string;
    title: string;
    path: string;
    children?: DocItem[];
};

interface MetaData {
    title?: string;
    description?: string;
    pages?: string[];
    folders?: string[];
    defaultOpen?: boolean;
}

// 在文档树中查找指定路径的项
export function findItemInTree(tree: any[], path: string): any | null {
    for (const item of tree) {
        if (item.path === path) {
            return item;
        }
        if (item.children) {
            const found = findItemInTree(item.children, path);
            if (found) {
                return found;
            }
        }
    }
    return null;
}

// 获取项目信息
export async function getProjectInfo(projectId: string) {
    // 添加参数验证
    if (!projectId) {
        return null;
    }

    try {
        const docsDir = path.join(process.cwd(), 'content/docs');
        const projectPath = path.join(docsDir, projectId);

        // 检查项目目录是否存在
        if (!fs.existsSync(projectPath)) {
            return null;
        }

        const indexPath = path.join(projectPath, 'index.mdx');
        let name = projectId;
        let description = '';

        // 如果有 index.mdx 文件，从中读取信息
        if (fs.existsSync(indexPath)) {
            const content = fs.readFileSync(indexPath, 'utf8');
            const titleMatch = content.match(/^#\s+(.*)$/m);
            const descMatch = content.match(/^description:\s+(.*)$/m);

            if (titleMatch) name = titleMatch[1];
            if (descMatch) description = descMatch[1];
        }

        return {
            id: projectId,
            name,
            description
        };
    } catch (error) {
        console.error('Error getting project info:', error);
        return null;
    }
}

// 获取项目文档树
export async function getProjectDocsTree(projectId: string): Promise<DocItem[]> {
    if (!projectId) {
        return [];
    }

    try {
        const docsDir = path.join(process.cwd(), 'content/docs', projectId);

        // 检查项目目录是否存在
        if (!fs.existsSync(docsDir)) {
            return [];
        }

        // 使用支持 meta.json 的方法读取目录
        const docsTree = buildDocsTree(docsDir, '', projectId);

        // 先检查是否有 index.mdx 作为首页
        const indexPath = path.join(docsDir, 'index.mdx');
        if (fs.existsSync(indexPath)) {
            const content = fs.readFileSync(indexPath, 'utf8');
            const titleMatch = content.match(/^#\s+(.*)$/m);
            const title = titleMatch ? titleMatch[1] : '首页';

            return [{
                id: 'index',
                title,
                path: 'index'
            }, ...docsTree];
        }

        return docsTree;
    } catch (error) {
        console.error('Error getting project docs tree:', error);
        return [];
    }
}

function buildDocsTree(dirPath: string, relativePath: string, project: string): DocItem[] {
    if (!fs.existsSync(dirPath)) {
        return [];
    }

    const items: DocItem[] = [];
    const dirEntries = fs.readdirSync(dirPath);

    // 检查是否存在 meta.json
    let meta: MetaData = {};
    const metaPath = path.join(dirPath, 'meta.json');
    if (fs.existsSync(metaPath)) {
        try {
            meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
        } catch (e) {
            console.error('Error parsing meta.json:', e);
        }
    }

    // 获取页面顺序
    const pageOrder = meta.pages || [];
    const folderOrder = meta.folders || [];

    // 分离文件和文件夹
    const files: string[] = [];
    const folders: string[] = [];

    for (const entry of dirEntries) {
        // 跳过 meta.json 和其他非文档文件
        if (entry === 'meta.json') continue;
        if (entry.startsWith('.')) continue;
        if (entry.endsWith('.DS_Store')) continue;

        const entryPath = path.join(dirPath, entry);
        const stat = fs.statSync(entryPath);

        if (stat.isDirectory()) {
            folders.push(entry);
        } else if (entry.endsWith('.mdx') || entry.endsWith('.md')) {
            files.push(entry);
        }
    }

    // 按照 meta.json 中定义的顺序排序文件夹
    folders.sort((a, b) => {
        const indexA = folderOrder.indexOf(a);
        const indexB = folderOrder.indexOf(b);

        // 如果都在排序列表中，按列表顺序
        if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
        }

        // 如果只有一个是排序列表中的文件夹，排在前面
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;

        // 都不在排序列表中，按字母顺序
        return a.localeCompare(b);
    });

    // 按照 meta.json 中定义的顺序排序文件
    files.sort((a, b) => {
        const nameA = a.replace(/\.(mdx|md)$/, '');
        const nameB = b.replace(/\.(mdx|md)$/, '');

        const indexA = pageOrder.indexOf(nameA);
        const indexB = pageOrder.indexOf(nameB);

        // 如果都在排序列表中，按列表顺序
        if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
        }

        // 如果只有一个是排序列表中的页面，排在前面
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;

        // 都不在排序列表中，按字母顺序
        return nameA.localeCompare(nameB);
    });

    // 处理文件夹
    for (const folder of folders) {
        const folderPath = path.join(dirPath, folder);
        const folderRelativePath = relativePath ? `${relativePath}/${folder}` : folder;

        // 检查文件夹中的 meta.json 获取标题
        let folderTitle = folder.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const folderMetaPath = path.join(folderPath, 'meta.json');
        if (fs.existsSync(folderMetaPath)) {
            try {
                const folderMeta: MetaData = JSON.parse(fs.readFileSync(folderMetaPath, 'utf-8'));
                if (folderMeta.title) {
                    folderTitle = folderMeta.title;
                }
            } catch (e) {
                console.error('Error parsing folder meta.json:', e);
            }
        }

        const children = buildDocsTree(folderPath, folderRelativePath, project);

        if (children.length > 0) {
            items.push({
                id: folderRelativePath,
                title: folderTitle,
                path: folderRelativePath,
                children: children
            });
        }
    }

    // 处理文件
    for (const file of files) {
        const fileName = file.replace(/\.(mdx|md)$/, '');
        const filePath = relativePath ? `${relativePath}/${fileName}` : fileName;

        // 读取文件内容获取标题
        let fileTitle = fileName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        try {
            const fileContent = fs.readFileSync(path.join(dirPath, file), 'utf-8');
            const frontmatterMatch = fileContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
            if (frontmatterMatch) {
                const frontmatterContent = frontmatterMatch[1];
                const lines = frontmatterContent.split('\n');
                for (const line of lines) {
                    const [key, ...valueParts] = line.split(':');
                    if (key && key.trim() === 'title' && valueParts.length > 0) {
                        const value = valueParts.join(':').trim().replace(/^"(.*)"$/, '$1');
                        fileTitle = value;
                        break;
                    }
                }
            }
        } catch (e) {
            console.error('Error reading file:', e);
        }

        items.push({
            id: filePath,
            title: fileTitle,
            path: filePath
        });
    }

    return items;
}

// 获取单个文档内容
export async function getDocContent(projectId: string, slug: string[] | undefined) {
    // 添加参数验证
    if (!projectId) {
        return null; // 返回 null 而不是抛出异常
    }

    try {
        const docsDir = path.join(process.cwd(), 'content/docs', projectId);

        // 如果 slug 为 undefined，尝试加载 index.mdx
        if (!slug) {
            const indexPath = path.join(docsDir, 'index.mdx');
            if (fs.existsSync(indexPath)) {
                return fs.readFileSync(indexPath, 'utf8');
            }
            return null; // 返回 null 而不是抛出异常
        }

        // 如果 slug 为空数组，也尝试加载 index.mdx
        if (slug.length === 0) {
            const indexPath = path.join(docsDir, 'index.mdx');
            if (fs.existsSync(indexPath)) {
                return fs.readFileSync(indexPath, 'utf8');
            }
            return null; // 返回 null 而不是抛出异常
        }

        const filePath = path.join(docsDir, ...slug) + '.mdx';

        // 检查文件是否存在
        if (!fs.existsSync(filePath)) {
            // 如果文件不存在，尝试查找目录下的 index.mdx
            const dirPath = path.join(docsDir, ...slug);
            if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
                const indexPath = path.join(dirPath, 'index.mdx');
                if (fs.existsSync(indexPath)) {
                    return fs.readFileSync(indexPath, 'utf8');
                }
            }
            return null; // 返回 null 而不是抛出异常
        }

        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error('Error getting doc content:', error);
        return null; // 发生错误时返回 null
    }
}
