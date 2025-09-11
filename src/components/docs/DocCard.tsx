
// src/components/docs/DocCard.tsx
"use client";

import Link from 'next/link';
import React from "react";

interface DocCardProps {
    href: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    disabled?: boolean;
    maintenance?: boolean; // Add maintenance status
}

export default function DocCard({ href, title, description, icon, color, disabled = false, maintenance = false }: DocCardProps) {
    // Maintenance status has the highest priority
    if (maintenance) {
        return (
            <div className="group relative overflow-hidden rounded-2xl bg-base-200 border border-base-300 p-6 shadow-md opacity-80">
                <div className="absolute top-0 right-0 bg-warning text-warning-content text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Maintenance
                </div>
                <div className="mb-4 flex items-center gap-3">
                    {icon}
                    <h2 className="text-2xl font-bold text-base-content">{title}</h2>
                </div>
                <p className="text-base-content/80 leading-relaxed">
                    {description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-base-content/50">
                    <span>Temporarily unavailable</span>
                </div>
            </div>
        );
    }

    if (disabled) {
        return (
            <div className="group relative overflow-hidden rounded-2xl bg-base-200 border border-base-300 p-6 shadow-md opacity-70">
                <div className="mb-4 flex items-center gap-3">
                    {icon}
                    <h2 className="text-2xl font-bold text-base-content">{title}</h2>
                </div>
                <p className="text-base-content/80 leading-relaxed">
                    {description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-base-content/50">
                    <span>Coming soon</span>
                </div>
            </div>
        );
    }

    return (
        <Link
            href={href}
            className="group relative overflow-hidden rounded-2xl bg-base-200 border border-base-300 p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
        >
            <div className="mb-4 flex items-center gap-3">
                {icon}
                <h2 className="text-2xl font-bold text-base-content">{title}</h2>
            </div>
            <p className="text-base-content/80 leading-relaxed">
                {description}
            </p>
            <div className={`mt-4 flex items-center text-sm font-medium ${color} transition-all group-hover:translate-x-2`}>
                <span>View Documentation</span>
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </Link>
    );
}