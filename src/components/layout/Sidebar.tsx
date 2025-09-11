'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';

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

    // 初始化时展开所有文件夹
    useEffect(() => {
        // 过滤掉首页项（index）
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
    }, [docsTree]); // 只依赖 docsTree

    // 切换文件夹展开/折叠状态
    const toggleFolder = (folderId: string) => {
        setExpandedFolders(prev => ({
            ...prev,
            [folderId]: !prev[folderId]
        }));
    };

    const renderDocTree = (items: DocItem[], depth = 0, prefix = '') => {
        // 每次渲染时都过滤掉首页项
        const filteredItems = items.filter(item => item.id !== 'index' && item.path !== 'index');

        return (
            <ul className={`${depth > 0 ? 'pl-4' : ''}`}>
                {filteredItems.map((item, index) => {
                    const uniqueKey = `${prefix}${index}-${item.id}`;
                    const hasChildren = item.children && item.children.length > 0;
                    const isExpanded = expandedFolders[uniqueKey] ?? true; // 默认展开

                    return (
                        <li key={uniqueKey} className="mb-0.5">
                            {hasChildren ? (
                                <>
                                    <div
                                        className="flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer hover:bg-base-200 text-base-content transition-colors"
                                        onClick={() => toggleFolder(uniqueKey)}
                                    >
                                        <span className="font-medium text-sm flex-1">{item.title}</span>
                                        <svg
                                            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    {isExpanded && (
                                        <div className="mt-1">
                                            {/* 添加竖线指示器 */}
                                            {depth > 0 && (
                                                <div className="relative pl-4">
                                                    {/* 竖线指示器 */}
                                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-base-300"></div>
                                                    {renderDocTree(item.children!, depth + 1, `${uniqueKey}-`)}
                                                </div>
                                            )}
                                            {depth === 0 && (
                                                <div className="pl-4">
                                                    {renderDocTree(item.children!, depth + 1, `${uniqueKey}-`)}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={`/docs/${project}/${item.path}`}
                                    className={`block py-2 px-3 rounded-lg transition-colors text-sm ${
                                        pathname === `/docs/${project}/${item.path}`
                                            ? 'bg-primary text-primary-content font-medium'
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
            {/* 移动端菜单按钮 - 与Header保持一致，使用lg断点 */}
            <div className="lg:hidden fixed bottom-5 left-5 z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="btn btn-circle btn-primary shadow-lg hover:shadow-xl transition-all hover:scale-110"
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

            {/* 移动端菜单遮罩 - 与Header保持一致，使用lg断点 */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-base-300 bg-opacity-50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/* 侧边栏 - 与Header保持一致，使用lg断点 */}
            <aside
                className={`fixed lg:fixed top-0 lg:top-20 left-0 h-screen lg:h-[calc(100vh-5rem)] w-64 bg-base-100 border-r border-base-200 z-50 lg:z-30 transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 lg:block overflow-hidden flex-shrink-0`}
            >
                <nav className="h-full flex flex-col">
                    <div className="flex items-center justify-between p-4 flex-shrink-0 border-b border-base-200" style={{ minHeight: '5rem' }}>
                        <h2 className="text-lg font-semibold text-base-content">文档导航</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3">
                        {/* 添加首页链接，使用项目名称作为标题 */}
                        <ul className="mb-3">
                            <li>
                                <Link
                                    href={`/docs/${project}/`}
                                    className={`flex items-center py-2 px-3 rounded-lg transition-colors text-sm ${
                                        pathname === `/docs/${project}/` || pathname === `/docs/${project}`
                                            ? 'bg-primary text-primary-content font-medium'
                                            : 'text-base-content/80 hover:bg-base-200 hover:text-base-content'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    <span>{project.charAt(0).toUpperCase() + project.slice(1)} 首页</span>
                                </Link>
                            </li>
                        </ul>
                        {renderDocTree(docsTree)}
                    </div>
                </nav>
            </aside>
        </>
    );
}
