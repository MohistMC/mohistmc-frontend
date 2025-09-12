"use client";

import Link from "next/link";
import {FaArrowRight, FaBoxOpen, FaExclamationCircle, FaHandHoldingUsd, FaHeart} from "react-icons/fa";
import React from "react";
import FeatureCard from "@/components/FeatureCardProps";
import CuteDashboard from "@/components/CuteDashboard";
import {API_ENDPOINTS} from "@/lib/api";
import DefaultCarousel from "@/components/Carousel";

interface HpageRecommend {
    imageSrc: string
    title: string
    subtitle: string
    descriptionKey: string
    id: string
}

export default function HomeClient({ initialData }: { initialData: HpageRecommend[] }) {
    return (
        <main className="bg-base-100 text-base-content">
            <section className="flex flex-col min-h-screen relative">
                <section className="pt-5">
                    <div className="md:pt-10 md:pb-0 pb-6 px-4 mx-auto max-w-screen-xl text-center">
                        <div className="relative">
                            <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
                                Experience Minecraft software innovation powered by community and AI
                            </h1>

                            <div className="pt-5 mb-12 text-base font-normal lg:text-lg sm:px-16 lg:px-48 space-y-2">
                                <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg backdrop-blur-sm relative overflow-hidden">
                                    {/* 装饰性角标 */}
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-red-500 opacity-10 rounded-bl-3xl"></div>
                                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-orange-500 opacity-10 rounded-tr-3xl"></div>

                                    <div className="flex items-center justify-center mb-3">
                                        <FaExclamationCircle className="text-red-500 mr-2 animate-pulse" />
                                        <p className="font-bold text-lg text-red-600">Important Announcements</p>
                                    </div>
                                    <div className="space-y-2 text-gray-700 relative z-10">
                                        <p className="flex items-start">
                                            <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                            About Mohist: Sold its ownership and copyright in January 2025 (Purchaser: @TT)
                                        </p>
                                        <p className="flex items-start">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                            The codebase has been moved to{" "}
                                            <Link
                                                href="https://github.com/Rz-C/Mohist"
                                                target="_blank"
                                                className="text-blue-600 hover:text-blue-800 underline ml-1"
                                            >
                                                https://github.com/Rz-C/Mohist
                                            </Link>
                                        </p>
                                        <p className="flex items-start">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                            The update has been paused, and the official website download is still accessible.
                                        </p>
                                        <p className="text-sm text-red-500 font-semibold bg-red-50 px-3 py-2 rounded-lg border border-red-200 mt-3">
                                            We do not currently accept or process any feedback on Mohist Core
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 行动按钮区域 */}
                <section className="pt-5 mb-10">
                    <div className="mx-auto max-w-screen-xl text-center">
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                            <Link
                                href="/resources"
                                className="btn btn-outline btn-primary btn-lg"
                            >
                                Resource Station
                            </Link>
                            <Link
                                href="/docs"
                                className="btn btn-outline btn-primary btn-lg"
                            >
                                Documentation
                            </Link>
                            <Link
                                href={API_ENDPOINTS.DISCORD}
                                target="_blank"
                                className="btn btn-outline btn-primary btn-lg"
                            >
                                Discord
                                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="pt-5 pb-10 md:pb-20 py-10 flex flex-col flex-wrap justify-center items-center">
                    <h2 className="text-center mb-10 text-3xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-4xl">
                        Take your server to the{' '}
                        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                          next level
                        </span>
                    </h2>
                    <div className="flex flex-row flex-wrap items-center justify-center max-w-screen-xl gap-6 pt-5">
                        {initialData.map((card: HpageRecommend, index: number) => (
                            <div key={index}>
                                <FeatureCard
                                    imageSrc={card.imageSrc}
                                    title={card.title}
                                    subtitle={card.subtitle}
                                    description={card.descriptionKey}
                                    id={card.id}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                <div className="transform transition-transform duration-500">
                    <CuteDashboard />
                </div>
                <section>
                    <h2 className="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-base-content md:text-5xl lg:text-4xl">
                        A&nbsp;
                        <span className="underline underline-offset-3 decoration-8 decoration-primary">
                            special thanks
                        </span>
                        &nbsp;to
                    </h2>
                    <DefaultCarousel />
                </section>
            </section>
        </main>
    );
}