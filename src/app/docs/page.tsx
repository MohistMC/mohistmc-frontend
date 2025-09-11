
// src/app/docs/page.tsx
import React from "react";
import TitleContainer from "@/components/TitleContainer";
import DocCard from "@/components/docs/DocCard";

export default function DocsPage() {
    // 定义图标组件
    const MohistIcon = (
        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    );

    const YouerIcon = (
        <svg className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h7m0 0v7m0-7l-7 7-7-7m7 7l7 7m-7-7l-7 7" />
        </svg>
    );

    const SilkardIcon = (
        <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
    );

    const APIIcon = (
        <svg className="h-8 w-8 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    );

    return (
        <section className="flex flex-col min-h-screen pt-10 sm:pt-20 bg-base-100 text-base-content">
            <TitleContainer
                titleKey="Documentation by MohistMC"
                subtitleKey="MohistMC provides various documentation for our software. Simply click on the software you want to find!"
                fromColor="from-accent"
                toColor="to-secondary"
            />

            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DocCard
                    href="/docs/mohist"
                    title="Mohist"
                    description="A powerful Forge hybrid server software that implements Bukkit and Spigot."
                    icon={MohistIcon}
                    color="text-primary"
                />

                <DocCard
                    href="/docs/youer"
                    title="Youer"
                    description="A revolutionary NeoForge hybrid server software that implements Paper and PurPur."
                    icon={YouerIcon}
                    color="text-secondary"
                />

                <DocCard
                    href=""
                    title="Silkard"
                    description="A newly architected Fabric hybrid server software that implements Bukkit and Spigot."
                    icon={SilkardIcon}
                    color="text-accent"
                    disabled={true}
                />

                <DocCard
                    href="/docs/api"
                    title="REST API"
                    description="View our REST API documentation to learn how to interact with MohistMC services."
                    icon={APIIcon}
                    color="text-info"
                />
            </div>
        </section>
    )
}