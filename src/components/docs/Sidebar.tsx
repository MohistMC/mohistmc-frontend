'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import {IoHomeOutline} from "react-icons/io5";

type DocItem = {
    id: string;
    title: string;
    path: string;
    children?: DocItem[];
};

export default function Sidebar({ docsTree, project }: { docsTree: DocItem[]; project: string }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const filteredDocsTree = docsTree.filter(item => item.id !== 'index' && item.path !== 'index');

        const initialExpanded: Record<string, boolean> = {};
        const expandAllFolders = (items: DocItem[], prefix = '') => {
            items.forEach((item, index) => {
                const uniqueId = `${prefix}${index}-${item.id}`;
                if (item.children && item.children.length > 0) {
                    initialExpanded[uniqueId] = true;
                    expandAllFolders(item.children, `${uniqueId}-`);
                }
            });
        };
        expandAllFolders(filteredDocsTree);
        setExpandedFolders(initialExpanded);

        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [docsTree, isMobileMenuOpen]);

    const toggleFolder = (folderId: string) => {
        setExpandedFolders(prev => ({
            ...prev,
            [folderId]: !prev[folderId]
        }));
    };

    const renderDocTree = (items: DocItem[], depth = 0, prefix = '', parentPath = '') => {
        const filteredItems = items.filter(item => item.id !== 'index' && item.path !== 'index');

        return (
            <ul className={`${depth > 0 ? 'pl-5' : ''}`}>
                {filteredItems.map((item, index) => {
                    const uniqueKey = `${prefix}${index}-${item.id}`;
                    const hasChildren = item.children && item.children.length > 0;
                    const isExpanded = expandedFolders[uniqueKey] ?? true;
                    const currentPath = parentPath ? `${parentPath}-${index}` : `${index}`;

                    return (
                        <li key={uniqueKey} className="mb-0.5 relative">
                            {depth > 0 && (
                                <div className="absolute left-0 top-0 w-5 h-full -translate-x-5">
                                    <div className="absolute left-4 top-0 w-0.5 h-[calc(100%+0.25rem)] bg-base-300"></div>
                                </div>
                            )}

                            {hasChildren ? (
                                <>
                                    <div
                                        className="flex items-center justify-between py-2 px-2 rounded cursor-pointer hover:bg-base-200 text-base-content transition-colors"
                                        onClick={() => toggleFolder(uniqueKey)}
                                    >
                                        <span className="font-medium text-sm flex-1">{item.title}</span>
                                        <svg
                                            className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    {isExpanded && (
                                        <div className="mt-0.5">
                                            {renderDocTree(item.children!, depth + 1, `${uniqueKey}-`, currentPath)}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={`/docs/${project}/${item.path}`}
                                    className={`block py-2 px-2 rounded transition-colors text-sm ${
                                        pathname === `/docs/${project}/${item.path}`
                                            ? 'bg-primary/80 text-primary-content font-medium'
                                            : 'text-base-content/80 hover:bg-base-200 hover:text-base-content'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)} // 移动端点击后关闭菜单
                                >
                                    <div className="flex items-center">
                                        <span className="ml-1">{item.title}</span>
                                    </div>
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <>
            <div className="lg:hidden fixed bottom-5 left-4 z-40">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="btn btn-circle btn-primary shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    aria-label="Toggle navigation menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>
            </div>

            <div
                className={`lg:hidden fixed inset-0 bg-base-300 bg-opacity-50 z-30 transition-opacity duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } hidden`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
            ></div>

            <aside
                className={`fixed top-20 h-screen w-full max-w-[16rem] bg-base-100 z-40 transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 lg:top-20 lg:h-[calc(100vh-5rem)] lg:z-30 lg:block overflow-hidden flex-shrink-0 ${
                    !isMobileMenuOpen ? 'hidden lg:block' : 'block'
                }`}
            >
                <nav className="h-full flex flex-col">
                    <div className="flex-1 overflow-y-auto p-0">
                        <ul className="p-3">
                            <li>
                                <Link
                                    href={`/docs/${project}/`}
                                    className={`flex items-center py-1.5 px-3 rounded-lg transition-colors text-sm ${
                                        pathname === `/docs/${project}/` || pathname === `/docs/${project}`
                                            ? 'bg-primary text-primary-content font-medium'
                                            : 'text-base-content/80 hover:bg-base-200 hover:text-base-content'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <IoHomeOutline className="h-4 w-4 mr-2" />
                                    <span>{project.charAt(0).toUpperCase() + project.slice(1)}</span>
                                </Link>
                            </li>
                        </ul>
                        <div className="px-3">
                            {renderDocTree(docsTree)}
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
}
