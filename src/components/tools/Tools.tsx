// src/components/tools/Tools.tsx
"use client";

import React, {useEffect, useState} from 'react'
import Image from 'next/image'

interface Tool {
    name: string
    text: string
    img: string
    link: string
}

const Tools: React.FC = () => {
    const [motdList, setMotdList] = useState<Tool[]>([])

    useEffect(() => {
        const fetchMotdList = async () => {
            try {
                const response = await fetch('/json/tools.json')
                const data = await response.json()
                setMotdList(data)
            } catch (error) {
                console.error('Error fetching MOTD list:', error)
            }
        }

        fetchMotdList().then(() => '{}')
    }, [])

    // 阻止复制事件
    const handleCopy = (e: React.ClipboardEvent) => {
        e.preventDefault();
    };

    // 阻止选择事件
    const handleSelect = (e: React.MouseEvent) => {
        if (window.getSelection) {
            window.getSelection()?.removeAllRanges();
        }
    };

    return (
        <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 bg-base-100 py-8">
            <div
                className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-7xl"
                onCopy={handleCopy}
            >
                {motdList.map((motd, index) => (
                    <a
                        key={index}
                        href={motd.link}
                        target={motd.link.startsWith('http') ? '_blank' : undefined}
                        className="group flex space-x-4 p-4 items-center rounded-box shadow-md hover:shadow-xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 border border-base-200 h-full active:scale-[0.98] bg-base-200"
                        onCopy={handleCopy}
                        onMouseDown={handleSelect}
                    >
                        {/* 头像容器 */}
                        <div className="block p-1 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 shadow-inner hover:shadow-sm group-hover:rotate-12 transition-transform duration-500 ease-in-out flex-shrink-0">
                            <Image
                                width={56}
                                height={56}
                                src={motd.img}
                                alt={`${motd.name} logo`}
                                className="rounded-full w-14 h-14 object-cover select-none"
                                draggable={false}
                            />
                        </div>

                        {/* 文字内容 */}
                        <div className="flex flex-col space-y-1.5 select-none min-w-0">
                            <div className="flex items-center">
                                <h3 className="font-semibold text-lg text-base-content group-hover:text-primary truncate">
                                    {motd.name}
                                </h3>
                            </div>
                            <p className="text-base-content/70 text-sm leading-5 line-clamp-2">
                                {motd.text}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Tools
