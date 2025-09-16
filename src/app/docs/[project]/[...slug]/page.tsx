
import {MDXRemote} from 'next-mdx-remote/rsc';
import {getDocContent, getProjectDocsTree, generateBreadcrumbs} from '@/lib/docs-server';
import MDXComponents from "@/components/docs/MDXComponents";
import DocPageLayout from "@/components/docs/DocPageLayout";
import {capitalizeFirstLetter} from "@/lib/String";
import remarkGfm from 'remark-gfm';

export async function generateMetadata({ params }: { params: Promise<{ project: string; slug?: string[] }> }) {
    try {
        const { project, slug } = await params;

        const content = await getDocContent(project, slug);
        if (!content) {
            return {
                title: 'Document Not Found',
                description: 'The requested document does not exist'
            };
        }
        // Parse frontmatter
        const { frontmatter } = parseFrontmatter(content);
        const title = frontmatter.title || 'Document';
        const description = frontmatter.description || '';

        const formattedTitle = capitalizeFirstLetter(title);
        const formattedProject = capitalizeFirstLetter(project);
        return {
            title: `${formattedTitle} - ${formattedProject} Documentation`,
            description: description,
        };
    } catch {
        return {
            title: 'Document Not Found',
            description: 'The requested document does not exist'
        };
    }
}

// Function to parse frontmatter
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

        // Remove frontmatter section, only return content
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

        // If content does not exist, display document not found page
        if (!originalContent) {
            return (
                <DocPageLayout
                    docsTree={docsTree}
                    project={project}
                    breadcrumbs={[{ name: 'Documentation' }, { name: 'Not Found' }]}
                >
                    <div className="text-center py-10">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Document Not Found</h1>
                        <p className="text-gray-600">Sorry, the document you requested does not exist.</p>
                    </div>
                </DocPageLayout>
            );
        }

        // Parse frontmatter and get cleaned content
        const { frontmatter, content } = parseFrontmatter(originalContent);
        const title = frontmatter.title || '';
        const description = frontmatter.description || '';

        // Generate breadcrumbs
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
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                        },
                    }}
                />
            </DocPageLayout>
        );
    } catch (error) {
        console.error('Error loading document:', error);
        // Display error page instead of calling notFound()
        const docsTree = await getProjectDocsTree(project);
        return (
            <DocPageLayout
                docsTree={docsTree}
                project={project}
                breadcrumbs={[{ name: 'Docs' }, { name: 'Error' }]}
            >
                <div className="text-center py-10">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Loading Error</h1>
                    <p className="text-gray-600">Sorry, an error occurred while loading the document.</p>
                </div>
            </DocPageLayout>
        );
    }
}
