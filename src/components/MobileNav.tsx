import Link from 'next/link'
import React from 'react'
import {headerData} from "@/utils/headerData";
import {FaBilibili, FaGithub, FaQq} from "react-icons/fa6";
import {FaDiscord} from "react-icons/fa";
import {usePathname} from 'next/navigation';

interface SidebarLayoutProps {
    sidebarOpen: boolean
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface HeaderItem {
    name: string;
    link: string;
}

const MobileNav = ({ sidebarOpen, setSidebarOpen }: SidebarLayoutProps) => {
    // 创建一个关闭侧边栏的函数
    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const pathname = usePathname();

    return (
        <nav>
            <div className="block">
                {/* 背景覆盖层 */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 h-screen w-screen"
                        onClick={closeSidebar}
                    />
                )}

                <div
                    className={`overflow-y-auto z-50 flex pt-5 top-0 flex-col h-screen w-4/5 max-w-sm fixed bg-base-200 duration-500 ease-in gap-2 shadow-xl ${
                        sidebarOpen ? 'left-0' : '-left-full'
                    }`}
                >
                    <div className="relative flex flex-col gap-5 px-5 pb-6 mt-4 text-lg font-normal leading-6">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-base text-base-content/80">菜单</h4>
                            <button
                                onClick={closeSidebar}
                                className="btn btn-circle btn-sm bg-base-300 border-0 hover:bg-base-400"
                                aria-label="关闭菜单"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-base-content"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        {/*  menu lists */}
                        {headerData.map((item: HeaderItem, index: number) => (
                            <Link
                                href={item.link}
                                key={index}
                                onClick={closeSidebar}
                                className={`link link-hover text-base transition hover:duration-300 ${
                                    pathname === item.link
                                        ? 'text-primary font-medium'
                                        : 'text-base-content/80 hover:text-primary'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 px-5 pb-6">
                        <Link
                            href="https://discord.gg/mohistmc"
                            className="text-base-content/70 hover:text-primary"
                            onClick={closeSidebar}
                        >
                            <FaDiscord className="w-7 h-7" />
                        </Link>
                        <Link
                            href="https://github.com/MohistMC"
                            aria-label="Github"
                            className="text-base-content/70 hover:text-primary"
                            onClick={closeSidebar}
                        >
                            <FaGithub className="w-6 h-6"/>
                        </Link>
                        <Link
                            href="https://qm.qq.com/q/N4IqFA1rag"
                            aria-label="QQ"
                            className="text-base-content/70 hover:text-primary"
                            onClick={closeSidebar}
                        >
                            <FaQq className="w-5 h-5"/>
                        </Link>
                        <Link
                            href="https://space.bilibili.com/15859660"
                            className="text-base-content/70 hover:text-primary"
                            onClick={closeSidebar}
                        >
                            <FaBilibili className="w-6 h-6"/>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MobileNav
