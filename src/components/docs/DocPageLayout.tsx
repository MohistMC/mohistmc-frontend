import Sidebar from '@/components/layout/Sidebar';
import {findItemInTree} from '@/lib/docs';
import React from "react";

function formatDisplayName(name: string): string {
    return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export function generateBreadcrumbs(project: string, slug: string[] | undefined, title: string, docsTree: any[], isHomePage: boolean = false) {
    const breadcrumbs = [
        { name: 'Docs' }
    ];

    const projectItem = findItemInTree(docsTree, '');
    if (projectItem && projectItem.title) {
        breadcrumbs.push({ name: projectItem.title });
    } else {
        breadcrumbs.push({ name: project });
    }

    if (slug && slug.length > 0) {
        let pathSoFar = '';
        for (let i = 0; i < slug.length; i++) {
            pathSoFar = pathSoFar ? `${pathSoFar}/${slug[i]}` : slug[i];

            const item = findItemInTree(docsTree, pathSoFar);
            if (item) {
                breadcrumbs.push({ name: item.title });
            } else {
                breadcrumbs.push({ name: formatDisplayName(slug[i]) });
            }
        }
    } else if (isHomePage) {
        if (title && title !== breadcrumbs[breadcrumbs.length - 1].name) {
            breadcrumbs.push({ name: title });
        }
    }

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
            <div className="p-4 md:p-6 lg:p-8">
                <div className="max-w-6xl lg:max-w-[90rem] mx-auto px-0 sm:px-4 lg:flex lg:gap-6 xl:gap-8">
                    <div className="hidden lg:block w-60 xl:w-64 flex-shrink-0">
                        <div className="sticky top-20">
                            <Sidebar docsTree={docsTree} project={project}/>
                        </div>
                    </div>

                    <div className="lg:w-full lg:px-0">
                        <div className="lg:hidden -mx-4 mb-4">
                            <Sidebar docsTree={docsTree} project={project}/>
                        </div>

                        <div className="mb-4 px-4 lg:px-6">
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

                        <div className="prose prose-lg dark:prose-invert max-w-none bg-base-100 p-2 md:p-4 lg:p-6 rounded-box lg:max-w-4xl px-4 lg:px-6">
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
                            <div className={topSpacing}>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
