
// src/components/ProductPage.tsx
"use client";

import {FaArrowRight} from "react-icons/fa6";
import CommentSection from "@/components/CommentSection";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import {API_ENDPOINTS} from "@/lib/api";

interface ProductFeature {
    title: string;
    description: string;
    color: string;
}

interface ProductPageProps {
    productName: string;
    description: string;
    banner: string;
    imageAlt: string;
    downloadLink: string;
    docsLink: string;
    issuesLink: string;
    features: ProductFeature[];
    jsonPath: string;
    warning?: {
        text: string;
        linkText: string;
        linkHref: string;
    };
}

export default function ProductPage({
                                        productName,
                                        description,
                                        banner,
                                        imageAlt,
                                        downloadLink,
                                        docsLink,
                                        issuesLink,
                                        features,
                                        jsonPath,
                                        warning
                                    }: ProductPageProps) {
    return (
        <div className="bg-base-100 text-base-content">
            <section className="pt-8">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 md:flex md:items-center">
                    {/* Left text content */}
                    <div className="md:w-1/2 md:pr-12">
                        <h1 className="mb-8 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
                            {productName}
                        </h1>
                        <p className="mb-12 text-lg font-normal text-base-content/70 lg:text-xl">
                            {description}
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                            <Link
                                href={downloadLink}
                                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 group transition-all shadow-lg hover:shadow-xl relative overflow-hidden min-w-[140px]"
                            >
                                <span className="mr-2 z-10">⬇️ Download</span>
                                <FaArrowRight
                                    className="transform group-hover:translate-x-1 group-hover:rotate-45 transition-transform z-10"/>
                                <div
                                    className="absolute inset-0 bg-[length:400%_400%] animate-gradientFlow opacity-10"></div>
                            </Link>
                            <Link
                                href={docsLink}
                                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-accent to-secondary hover:from-accent/80 hover:to-secondary/80 group transition-all shadow-lg hover:shadow-xl relative overflow-hidden min-w-[140px]"
                            >
                                <span className="mr-2 group-hover:animate-flip z-10">📑</span>
                                <span className="z-10">Wiki</span>
                                <div
                                    className="absolute inset-0 bg-[length:400%_400%] animate-gradientFlow opacity-10"></div>
                            </Link>
                            <Link
                                href={issuesLink}
                                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg bg-base-200 hover:bg-base-300 group transition-all relative shadow-sm hover:shadow-md border border-base-300 min-w-[140px]"
                                target="_blank"
                            >
                                <span className="mr-2 group-hover:animate-bounce">🐞</span>
                                <span className="relative">
                                    Feedback
                                    <div
                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/30 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                </span>
                            </Link>
                            <Link
                                href={API_ENDPOINTS.DISCORD}
                                target="_blank"
                                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 group transition-all shadow-lg hover:shadow-xl relative overflow-hidden min-w-[140px]"
                            >
                                <span className="mr-2 z-10">🖥️ Discord</span>
                                <FaArrowRight
                                    className="transform group-hover:translate-x-1 group-hover:scale-125 transition-transform z-10"/>
                                <div
                                    className="absolute -top-1 -right-4 w-12 h-12 bg-white/20 rotate-45 group-hover:translate-x-8 transition-transform duration-500"></div>
                            </Link>
                        </div>

                    </div>
                    {/* Right banner display area */}
                    <div className="md:w-1/2 mt-8 md:mt-0">
                        <div className="relative w-full pt-[56.25%] rounded-box overflow-hidden shadow-xl">
                            <div className="absolute inset-0">
                                <Image
                                    src={banner}
                                    alt={imageAlt}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {warning && (
                    <div role="alert" className="alert alert-warning mx-auto max-w-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             className="stroke-current h-6 w-6 shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{warning.text}</span>
                        <Link
                            href={warning.linkHref}
                            target="_blank"
                            className="btn btn-sm btn-primary"
                            role="button"
                        >
                            {warning.linkText}
                        </Link>
                    </div>
                )}

                <section>
                    <h2 className="pt-10 md:pt-20 text-center text-3xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-4xl">
                        What's so special about {productName}?
                    </h2>

                    <div className="flex flex-wrap justify-center gap-12 w-full pt-10 md:pt-20 md:pb-20 pb-10">
                        {features.map((feature, index) => (
                            <div key={index} className="max-w-sm border border-base-300 rounded-box shadow bg-base-200">
                                <div className={`bg-${feature.color}-500 rounded-t-box h-2`}>
                                    &nbsp;
                                </div>
                                <div className="p-5">
                                    <h2 className="mb-2 text-2xl font-bold tracking-tight">
                                        {feature.title}
                                    </h2>
                                    <p className="mb-3 font-normal text-base-content/80">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={`pt-5 md:pt-10 pb-10`}>
                    <div className="pt-20 px-4 mx-auto max-w-screen-xl mb-24">
                        <CommentSection jsonPath={jsonPath}/>
                    </div>
                </section>
            </section>
        </div>
    );
}