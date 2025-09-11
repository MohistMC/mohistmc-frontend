
// src/app/docs/[project]/page.tsx
import { notFound } from 'next/navigation';
import { getProjectInfo, getProjectDocsTree } from '@/lib/docs';
import path from "path";
import fs from "fs";
import { MDXRemote } from 'next-mdx-remote/rsc';
import MDXComponents from "@/components/docs/MDXComponents";
import DocPageLayout, { generateBreadcrumbs } from "@/components/docs/DocPageLayout";
import {capitalizeFirstLetter} from "@/lib/String";

export async function generateMetadata({ params }: { params: Promise<{ project: string }> }) {
    try {
        const { project } = await params;
        const projectInfo = await getProjectInfo(project);

        if (!projectInfo) {
            return {
                title: 'Project Not Found' // 项目未找到
            };
        }

        // Try to get the title from the homepage document // 尝试获取首页文档的标题
        try {
            const docsDir = path.join(process.cwd(), 'content/docs', project);
            const indexPath = path.join(docsDir, 'index.mdx');

            if (fs.existsSync(indexPath)) {
                const content = fs.readFileSync(indexPath, 'utf8');
                const titleMatch = content.match(/^#\s+(.*)$/m);
                const title = titleMatch ? titleMatch[1] : projectInfo.name;
                const formattedTitle = capitalizeFirstLetter(title);
                const formattedProject = capitalizeFirstLetter(project);
                return {
                    title: `${formattedTitle} - ${formattedProject} Documentation`, // 文档
                };
            }
        } catch (error) {
            console.error('Error getting index title:', error);
        }

        const formattedProjectName = capitalizeFirstLetter(projectInfo.name);
        return {
            title: `${formattedProjectName} - Documentation`, // 文档
        };
    } catch {
        return {
            title: 'Project Not Found' // 项目未找到
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
                const value = valueParts.join(':').trim().replace(/^"(.*)"$/, '$1');
                frontmatter[key.trim()] = value;
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

export default async function ProjectHomePage({ params }: { params: Promise<{ project: string }> }) {
    const { project } = await params;

    try {
        // Check if project exists // 检查项目是否存在
        const projectInfo = await getProjectInfo(project);
        if (!projectInfo) {
            // Display project not found page instead of calling notFound() // 显示项目未找到页面而不是调用notFound()
            const docsTree = await getProjectDocsTree(project);
            return (
                <DocPageLayout
                    docsTree={docsTree}
                    project={project}
                    breadcrumbs={[{ name: 'Documentation' }, { name: 'Project Not Found' }]} // 文档, 项目未找到
                    topSpacing="mt-20"
                >
                    <div className="text-center py-10">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Project Not Found</h1> // 项目未找到
                        <p className="text-gray-600">Sorry, the project you requested does not exist.</p> // 抱歉，您请求的项目不存在。
                    </div>
                </DocPageLayout>
            );
        }

        // Get documentation tree // 获取文档树
        const docsTree = await getProjectDocsTree(project);

        // Load and display index.mdx content directly // 直接加载并显示 index.mdx 内容
        const docsDir = path.join(process.cwd(), 'content/docs', project);
        const indexPath = path.join(docsDir, 'index.mdx');

        if (!fs.existsSync(indexPath)) {
            // Display homepage document not found page instead of calling notFound() // 显示首页文档未找到页面而不是调用notFound()
            return (
                <DocPageLayout
                    docsTree={docsTree}
                    project={project}
                    breadcrumbs={[{ name: 'Documentation' }, { name: 'Homepage Not Found' }]} // 文档, 首页未找到
                    topSpacing="mt-20"
                >
                    <div className="text-center py-10">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Homepage Document Not Found</h1> // 首页文档未找到
                        <p className="text-gray-600">Sorry, the homepage document for this project does not exist.</p> // 抱歉，该项目的首页文档不存在。
                    </div>
                </DocPageLayout>
            );
        }

        const originalContent = fs.readFileSync(indexPath, 'utf8');

        // Parse frontmatter and get cleaned content // 解析 frontmatter 并获取清理后的内容
        const { frontmatter, content } = parseFrontmatter(originalContent);
        const title = frontmatter.title || '';
        const description = frontmatter.description || '';

        // Generate breadcrumbs // 生成面包屑
        const breadcrumbs = generateBreadcrumbs(project, undefined, title, docsTree, true);

        return (
            <DocPageLayout
                docsTree={docsTree}
                project={project}
                breadcrumbs={breadcrumbs}
                title={title}
                description={description}
                topSpacing="mt-20"
            >
                <MDXRemote
                    source={content}
                    components={MDXComponents}
                />
            </DocPageLayout>
        );

    } catch (error) {
        console.error('Error loading project home:', error);
        // Display error page instead of calling notFound() // 显示错误页面而不是调用notFound()
        const docsTree = await getProjectDocsTree(project);
        return (
            <DocPageLayout
                docsTree={docsTree}
                project={project}
                breadcrumbs={[{ name: 'Documentation' }, { name: 'Loading Error' }]} // 文档, 加载错误
                topSpacing="mt-20"
            >
                <div className="text-center py-10">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Loading Error</h1> // 加载错误
                    <p className="text-gray-600">Sorry, an error occurred while loading the project homepage.</p> // 抱歉，加载项目首页时发生错误。
                </div>
            </DocPageLayout>
        );
    }
}