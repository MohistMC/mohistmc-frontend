
'use client';

import React from 'react';
import Link from 'next/link';
import { FiServer, FiBarChart2, FiPieChart, FiActivity, FiClock } from 'react-icons/fi';
import TitleContainer from "@/components/TitleContainer";

const AnalyticsDashboard: React.FC = () => {
    const analysisOptions = [
        {
            id: 'network',
            title: 'Network Data Analysis',
            description: 'Analyze network packet distribution, traffic, and performance metrics',
            icon: <FiServer className="text-3xl" />,
            path: '/tools/analytics/network',
            comingSoon: false
        },
        {
            id: 'performance',
            title: 'Performance Analysis',
            description: 'Analyze system performance metrics and bottlenecks',
            icon: <FiActivity className="text-3xl" />,
            path: '/tools/analytics/thread',
            comingSoon: false
        },
        {
            id: 'usage',
            title: 'Usage Analysis',
            description: 'View system usage and user behavior data',
            icon: <FiBarChart2 className="text-3xl" />,
            path: '/tools/analytics/usage',
            comingSoon: true
        },
        {
            id: 'reports',
            title: 'Report Generation',
            description: 'Generate and export analysis reports',
            icon: <FiPieChart className="text-3xl" />,
            path: '/tools/analytics/reports',
            comingSoon: true
        }
    ];

    return (
        <div className="container mx-auto p-4 max-w-7xl min-h-screen">
            <div className="bg-base-100 rounded-xl shadow-lg p-4 md:p-6 mb-8">
                <TitleContainer
                    titleKey="Analytics Center"
                    subtitleKey="Select the data type to analyze"
                    fromColor="from-info"
                    toColor="to-accent"
                />

                <div className="grid grid-cols-1 gap-4 md:gap-6">
                    {analysisOptions.map((option) => (
                        <Link
                            key={option.id}
                            href={option.comingSoon ? '#' : option.path}
                            className={`bg-base-100 border rounded-xl shadow p-4 md:p-6 transition-all duration-300
                        ${option.comingSoon
                                ? 'opacity-70 cursor-not-allowed border-base-200'
                                : 'border-base-200 hover:shadow-lg hover:border-primary cursor-pointer'}`}
                            onClick={(e) => option.comingSoon && e.preventDefault()}
                        >
                            <div className="flex items-start gap-3 md:gap-4">
                                <div className="p-2 md:p-3 rounded-full bg-primary/10 text-primary flex-shrink-0">
                                    {option.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1 md:mb-2">
                                        <h2 className="text-lg md:text-xl font-bold truncate">{option.title}</h2>
                                        {option.comingSoon && (
                                            <span className="badge badge-warning badge-sm whitespace-nowrap">
                                        <FiClock className="mr-1" size={10} />
                                        <span className="text-xs">Coming Soon</span>
                                    </span>
                                        )}
                                    </div>
                                    <p className="text-sm md:text-base text-base-content/70">{option.description}</p>
                                </div>
                            </div>
                            <div className="mt-3 md:mt-4 flex justify-end">
                                <button
                                    className={`btn btn-sm ${option.comingSoon ? 'btn-ghost' : 'btn-primary'}`}
                                    disabled={option.comingSoon}
                                >
                                    {option.comingSoon ? 'Coming Soon' : 'Start Analysis'}
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;