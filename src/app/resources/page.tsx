"use client";

import {useEffect, useState} from "react";
import ResourceCard from "@/components/resources/ResourceCard";
import {Resources} from "@/types/resource";
import {loadResources} from "@/lib/resources";

export default function Test() {
    const [mods, setMods] = useState<Resources[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data: Resources[] = await loadResources();
                setMods(data)
            } catch (error) {
                console.error('数据加载失败:', error)
                setMods([])
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <div>
            <section className="flex flex-col min-h-screen">
                <section className="flex flex-col justify-center items-center pt-10">
                    <section className="container mx-auto px-4 py-4">
                        {loading ? (
                            <div className="text-center py-8 text-gray-500">
                                加载资源数据中...
                            </div>
                        ) : (
                            <ResourceCard initialMods={mods} />
                        )}
                    </section>
                </section>
            </section>
        </div>
    )
}
