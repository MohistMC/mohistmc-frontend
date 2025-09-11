"use client"

import Link from 'next/link'
import Image from 'next/image'
import mohistLogo from '../../public/img/mohistLogo.webp'
import {FaBilibili, FaGithub, FaQq} from 'react-icons/fa6'

import * as React from "react"
import {useState} from "react"
import useMode from "@/utils/themeMode";
import {IoIosColorPalette} from "react-icons/io";
import {headerData} from "@/utils/headerData";
import MobileNav from "@/components/MobileNav";
import {FaDiscord} from "react-icons/fa";
import {usePathname} from 'next/navigation';

interface HeaderItem {
    link: string;
    name: string;
}

export default function Header() {

    const {theme, setTheme, themes, hydrationError} = useMode()
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    const pathname = usePathname()

    return (
        <header
            className="sticky top-0 z-40 shadow-md bg-base-100/95 backdrop-blur-lg supports-backdrop-filter:bg-base-100/60 border-b border-base-200">
            <div className="max-w-screen-xl flex items-center mx-auto p-4">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <Image
                            src={mohistLogo}
                            className="h-12 w-auto mr-3"
                            alt="MohistMC Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-base-content">
                    MohistMC
                </span>
                    </Link>
                </div>

                <nav className="hidden lg:flex lg:items-center lg:justify-center lg:gap-10 lg:flex-1">
                    {headerData.map((item: HeaderItem, index: number) => (
                        <div key={index}>
                            <Link
                                href={item.link}
                                className={`link link-hover font-medium transition hover:duration-300 ${
                                    pathname === item.link
                                        ? 'text-primary font-semibold'
                                        : 'text-base-content/80 hover:text-primary'
                                }`}
                            >
                                {item.name}
                            </Link>
                        </div>
                    ))}
                </nav>

                <div className="flex items-center space-x-1 ml-auto mr-5">
                    <Link
                        href="https://discord.gg/mohistmc"
                        aria-label="Discord"
                        className="hidden sm:inline-block text-base-content/70 hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/20 rounded-lg text-sm p-2.5"
                    >
                        <FaDiscord className="w-7 h-7" />
                    </Link>
                    <Link
                        href="https://github.com/MohistMC"
                        aria-label="Github"
                        className="hidden sm:inline-block text-base-content/70 hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/20 rounded-lg text-sm p-2.5"
                    >
                        <FaGithub className="w-6 h-6"/>
                    </Link>
                    <Link
                        href="https://qm.qq.com/q/N4IqFA1rag"
                        aria-label="QQ"
                        className="hidden sm:inline-block text-base-content/70 hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/20 rounded-lg text-sm p-2.5"
                    >
                        <FaQq className="w-5 h-5"/>
                    </Link>
                    <Link
                        href="https://space.bilibili.com/15859660"
                        className="hidden sm:inline-block text-base-content/70 hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/20 rounded-lg text-sm p-2.5"
                    >
                        <FaBilibili className="w-6 h-6"/>
                    </Link>
                    {/*Multi themes switcher */}
                    <div className="flex-none mr-2">
                        <div className="dropdown dropdown-end">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-7 rounded-full">
                                    <IoIosColorPalette className="w-7 h-7 text-base-content"/>
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="grid dropdown-content p-3 shadow-lg mt-5 bg-base-200 rounded-box w-52 max-h-80 overflow-x-auto"
                            >
                                {themes.map((item) => (
                                    <li
                                        data-theme={item}
                                        key={item}
                                        className={`capitalize w-full flex mb-2 rounded-box last-of-type:mb-0 justify-between items-center px-2 py-2 hover:bg-base-300 transition-all duration-300 cursor-pointer`}
                                        onClick={() => {
                                            setTheme(item)
                                        }}
                                    >
                        <span className="text-base-content flex items-center gap-2">
                            {hydrationError && theme === item && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-3 h-3 text-primary"
                                >
                                    <path
                                        d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                                </svg>
                            )}
                            {item}
                        </span>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1 h-full">
                                            <div className="bg-primary w-2 rounded"></div>
                                            {' '}
                                            <div className="bg-secondary w-2 rounded"></div>
                                            {' '}
                                            <div className="bg-accent w-2 rounded"></div>
                                            {' '}
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Responsive Sidebar Menu - shown only on mobile screens */}
                    <div className="flex-none ml-2 lg:hidden">
                        <svg
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="cursor-pointer w-8 h-8 text-base-content"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3.33301 5H16.6663M3.33301 10H16.6663M3.33301 15H16.6663"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
                {/* Responsive Sidebar Layout */}
                <MobileNav
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
            </div>
        </header>

    )
}
