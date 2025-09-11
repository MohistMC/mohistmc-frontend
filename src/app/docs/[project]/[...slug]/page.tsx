
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
                title: 'Document Not Found', // 文档未找到
                description: 'The requested document does not exist' // 请求的文档不存在
            };
        }
        // Parse frontmatter // 解析 frontmatter
        const { frontmatter } = parseFrontmatter(content);
        const title = frontmatter.title || 'Document'; // 文档
        const description = frontmatter.description || '';

        const formattedTitle = capitalizeFirstLetter(title);
        const formattedProject = capitalizeFirstLetter(project);
        return {
            title: `${formattedTitle} - ${formattedProject} Documentation`, // 文档
            description: description,
        };
    } catch {
        return {
            title: 'Document Not Found', // 文档未找到
            description: 'The requested document does not exist' // 请求的文档不存在
        };
    }
}

// Function to parse frontmatter // 解析 frontmatter 的函数
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

        // Remove the frontmatter section, return only the content // 移除 frontmatter 部分，只返回内容
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

        // If content doesn't exist, display document not found page // 如果内容不存在，显示文档未找到页面
        if (!originalContent) {
            return (
                <DocPageLayout
                    docsTree={docsTree}
                    project={project}
                    breadcrumbs={[{ name: 'Documentation' }, { name: 'Not Found' }]} // 文档, 未找到
                >
                    <div className="text-center py-10">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Document Not Found</h1> // 文档未找到
                        <p className="text-gray-600">Sorry, the document you requested does not exist.</p> // 抱歉，您请求的文档不存在。
                    </div>
                </DocPageLayout>
            );
        }

        // Parse frontmatter and get cleaned content // 解析 frontmatter 并获取清理后的内容
        const { frontmatter, content } = parseFrontmatter(originalContent);
        const title = frontmatter.title || '';
        const description = frontmatter.description || '';

        // Generate breadcrumbs // 生成面包屑
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
        // Display error page instead of calling notFound() // 显示错误页面而不是调用notFound()
        const docsTree = await getProjectDocsTree(project);
        return (
            <DocPageLayout
                docsTree={docsTree}
                project={project}
                breadcrumbs={[{ name: 'Documentation' }, { name: 'Error' }]} // 文档, 错误
            >
                <div className="text-center py-10">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Loading Error</h1> // 加载错误
                    <p className="text-gray-600">Sorry, an error occurred while loading the document.</p> // 抱歉，加载文档时发生错误。
                </div>
            </DocPageLayout>
        );
    }
}