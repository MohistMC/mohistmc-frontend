import {MDXRemote} from 'next-mdx-remote/rsc';
import {getDocContent, getProjectDocsTree} from '@/lib/docs';
import MDXComponents from "@/components/docs/MDXComponents";
import DocPageLayout, {generateBreadcrumbs} from "@/components/docs/DocPageLayout";
import {capitalizeFirstLetter} from "@/lib/String";

export async function generateMetadata({ params }: { params: Promise<{ project: string; slug?: string[] }> }) {
    try {
        const { project, slug } = await params;

        const content = await getDocContent(project, slug);
        if (!content) {
            return {
                title: '文档未找到',
                description: '请求的文档不存在'
            };
        }
        // 解析 frontmatter
        const { frontmatter } = parseFrontmatter(content);
        const title = frontmatter.title || '文档';
        const description = frontmatter.description || '';

        const formattedTitle = capitalizeFirstLetter(title);
        const formattedProject = capitalizeFirstLetter(project);
        return {
            title: `${formattedTitle} - ${formattedProject} 文档`,
            description: description,
        };
    } catch {
        return {
            title: '文档未找到',
            description: '请求的文档不存在'
        };
    }
}

// 解析 frontmatter 的函数
function parseFrontmatter(content: string) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = content.match(frontmatterRegex);

    if (match) {
        const frontmatterContent = match[1];
        const lines = frontmatterContent.split('\n');
        const frontmatter: Record<string, string> = {};

        for (const line of lines) {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^"(.*)"$/, '$1');
            }
        }

        // 移除 frontmatter 部分，只返回内容
        const contentWithoutFrontmatter = content.replace(frontmatterRegex, '');

        return {
            frontmatter,
            content: contentWithoutFrontmatter
        };
    }

    return {
        frontmatter: {},
        content
    };
}

export default async function ProjectDocPage({
                                                 params
                                             }: {
    params: Promise<{ project: string; slug?: string[] }>
}) {
    const { project, slug } = await params;

    try {
        const originalContent = await getDocContent(project, slug);
        const docsTree = await getProjectDocsTree(project);

        // 如果内容不存在，显示文档未找到页面
        if (!originalContent) {
            return (
                <DocPageLayout
                    docsTree={docsTree}
                    project={project}
                    breadcrumbs={[{ name: '文档' }, { name: '未找到' }]}
                >
                    <div className="text-center py-10">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">文档未找到</h1>
                        <p className="text-gray-600">抱歉，您请求的文档不存在。</p>
                    </div>
                </DocPageLayout>
            );
        }

        // 解析 frontmatter 并获取清理后的内容
        const { frontmatter, content } = parseFrontmatter(originalContent);
        const title = frontmatter.title || '';
        const description = frontmatter.description || '';

        // 生成面包屑
        const breadcrumbs = generateBreadcrumbs(project, slug, title, docsTree);

        return (
            <DocPageLayout
                docsTree={docsTree}
                project={project}
                breadcrumbs={breadcrumbs}
                title={title}
                description={description}
            >
                <MDXRemote
                    source={content}
                    components={MDXComponents}
                />
            </DocPageLayout>
        );
    } catch (error) {
        console.error('Error loading document:', error);
        // 显示错误页面而不是调用notFound()
        const docsTree = await getProjectDocsTree(project);
        return (
            <DocPageLayout
                docsTree={docsTree}
                project={project}
                breadcrumbs={[{ name: '文档' }, { name: '错误' }]}
            >
                <div className="text-center py-10">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">加载错误</h1>
                    <p className="text-gray-600">抱歉，加载文档时发生错误。</p>
                </div>
            </DocPageLayout>
        );
    }
}
