import Sidebar from '@/components/layout/Sidebar';
import {findItemInTree} from '@/lib/docs';

function formatDisplayName(name: string): string {
    return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// 生成面包屑路径
export function generateBreadcrumbs(project: string, slug: string[] | undefined, title: string, docsTree: any[], isHomePage: boolean = false) {
    const breadcrumbs = [
        { name: 'Docs' }
    ];

    // 查找项目在文档树中的实际标题
    const projectItem = findItemInTree(docsTree, '');
    if (projectItem && projectItem.title) {
        breadcrumbs.push({ name: projectItem.title });
    } else {
        breadcrumbs.push({ name: project });
    }

    // 构建路径层级
    if (slug && slug.length > 0) {
        let pathSoFar = '';
        for (let i = 0; i < slug.length; i++) {
            pathSoFar = pathSoFar ? `${pathSoFar}/${slug[i]}` : slug[i];

            // 在文档树中查找此路径的实际标题
            const item = findItemInTree(docsTree, pathSoFar);
            if (item) {
                breadcrumbs.push({ name: item.title });
            } else {
                // 如果找不到，使用格式化后的名称
                breadcrumbs.push({ name: formatDisplayName(slug[i]) });
            }
        }
    } else if (isHomePage) {
        // 添加当前页面标题（如果与项目名不同）
        if (title && title !== breadcrumbs[breadcrumbs.length - 1].name) {
            breadcrumbs.push({ name: title });
        }
    }

    // 只有当 title 与最后一个路径项不同时才添加
    if (breadcrumbs.length > 0 && breadcrumbs[breadcrumbs.length - 1].name !== title && title && !isHomePage) {
        breadcrumbs.push({ name: title });
    }

    return breadcrumbs;
}

export default function DocPageLayout({
                                          docsTree,
                                          project,
                                          breadcrumbs,
                                          title,
                                          description,
                                          children,
                                          topSpacing = "mt-16"
                                      }: {
    docsTree: any[];
    project: string;
    breadcrumbs: { name: string }[];
    title?: string;
    description?: string;
    children: React.ReactNode;
    topSpacing?: string;
}) {
    return (
        <div className="min-h-screen bg-base-100">
            {/* 桌面端侧边栏 - 固定定位，与Header中的导航菜单保持一致，在lg及以上屏幕显示 */}
            <div className="hidden lg:block fixed top-20 left-0 w-64 h-[calc(100vh-5rem)] z-30">
                <Sidebar docsTree={docsTree} project={project}/>
            </div>

            {/* 主内容区域 - 使用 margin-left 为固定侧边栏留出空间 */}
            <div className="p-4 md:p-8 lg:pl-64">
                <div className="max-w-6xl mx-auto px-0 sm:px-4">
                    {/* 移动端侧边栏 - 与Header中的导航菜单保持一致，在lg以下屏幕显示 */}
                    <div className="lg:hidden mb-4">
                        <Sidebar docsTree={docsTree} project={project}/>
                    </div>

                    {/* 手机端面包屑导航 */}
                    <div className="lg:hidden mb-4">
                        <nav className="text-sm">
                            <ul className="flex flex-wrap items-center">
                                {breadcrumbs.map((crumb, index) => (
                                    <li key={index} className="flex items-center">
                                    <span className={index === breadcrumbs.length - 1
                                        ? "text-base-content font-medium"
                                        : "text-base-content/70"}>
                                        {crumb.name}
                                    </span>
                                        {index < breadcrumbs.length - 1 && (
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 className="h-4 w-4 mx-2 text-base-content/30 flex-shrink-0" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M9 5l7 7-7 7"/>
                                            </svg>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* 内容区域 - 在大屏幕上更居中显示，最大宽度增加 */}
                    <div className="prose prose-lg dark:prose-invert max-w-none bg-base-100 p-2 md:p-6 rounded-box lg:mx-0 lg:max-w-4xl lg:ml-0">
                        {/* 显示标题和副标题 */}
                        {title && (
                            <h1 className="text-3xl font-bold mt-0 mb-2 text-base-content">
                                {title}
                            </h1>
                        )}
                        {description && (
                            <p className="text-base-content/80 mb-6 text-lg">
                                {description}
                            </p>
                        )}
                        {/* 增加间距 */}
                        <div className={topSpacing}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
