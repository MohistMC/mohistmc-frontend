// components/resources/BuildTable.tsx
"use client";

import React from 'react';
import {BuildDto} from "@/interfaces/Build";
import {API_ENDPOINTS} from "@/lib/api";

interface BuildTableProps {
    projectName: string;
    selectedVersion: string;
    currentBuilds: BuildDto[] | null;
    itemsPerPage: number;
    getGitHubCommitUrl: (gitSha: string) => string;
    loading?: boolean;
}

const BuildTable = ({
                        projectName,
                        selectedVersion,
                        currentBuilds,
                        itemsPerPage,
                        getGitHubCommitUrl,
                        loading = false
                    }: BuildTableProps) => {
    const hasBuilds = currentBuilds && currentBuilds.length > 0;

    if (loading) {
        return (
            <div className="py-8 text-center">
                <div className="bg-base-200 rounded-lg p-6 max-w-2xl mx-auto">
                    <div className="flex flex-col items-center">
                        <span className="loading loading-spinner loading-md text-primary mb-4"></span>
                        <h3 className="text-xl font-bold text-base-content mb-2">Loading Build Info</h3>
                        <p className="text-base-content/80">
                            Please wait while we fetch the latest build data...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!hasBuilds) {
        return (
            <div className="py-8 text-center">
                <div className="bg-warning/10 border border-warning/30 rounded-lg p-6 max-w-2xl mx-auto">
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-warning mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <h3 className="text-xl font-bold text-warning mb-2">API Maintenance</h3>
                        <p className="text-base-content/80 mb-4">
                            Unable to fetch build info. Please try again later.
                        </p>
                        {(projectName.toLowerCase() === 'youer' || projectName.toLowerCase() === 'mohist') && (
                            <a
                                href={projectName.toLowerCase() === 'youer'
                                    ? "https://github.com/MohistMC/Youer/actions"
                                    : "https://github.com/Rz-C/Mohist/actions"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-warning btn-sm"
                            >
                                Nightly Builds
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    const getVersionLabel = () => {
        if (projectName === 'silkard') return 'Fabric Version';
        if (projectName === 'mohist') return 'Forge Version';
        return 'NeoForge Version';
    };

    const getVersionInfo = (build: BuildDto) => {
        if (projectName === 'silkard') {
            return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">Fabric: {build.loader?.fabric_version || 'N/A'}</span>;
        } else if (projectName === 'youer') {
            return <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">{build.loader?.neoforge_version || 'N/A'}</span>;
        } else {
            const forgeVersion = build.loader?.forge_version || 'N/A';
            const neoforgeVersion = build.loader?.neoforge_version;
            if (neoforgeVersion) {
                return (
                    <span>
                        <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-0.5 rounded">{forgeVersion}</span>
                        <span className="mx-1"></span>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">{neoforgeVersion}</span>
                    </span>
                );
            }
            return <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-0.5 rounded">{forgeVersion}</span>;
        }
    };

    const getDesktopVersionInfo = (build: BuildDto) => {
        if (projectName === 'silkard') {
            return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">Fabric: {build.loader?.fabric_version || 'N/A'}</span>;
        } else if (projectName === 'youer') {
            return <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">{build.loader?.neoforge_version || 'N/A'}</span>;
        } else {
            const forgeVersion = build.loader?.forge_version || 'N/A';
            const neoforgeVersion = build.loader?.neoforge_version;
            if (neoforgeVersion) {
                return (
                    <span>
                        <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-0.5 rounded">{forgeVersion}</span>
                        <span className="mx-1"></span>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">{neoforgeVersion}</span>
                    </span>
                );
            }
            return <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-0.5 rounded">{forgeVersion}</span>;
        }
    };

    return (
        <div className="overflow-x-auto">
            {/* Desktop Table View - shown on lg+ screens */}
            <div className="hidden lg:block">
                <table className="min-w-full rounded-box overflow-hidden">
                    <thead>
                    <tr className="rounded-box shadow-md bg-base-300">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-base-content">Build</th>
                        <th className="px-2 py-3 text-left text-sm font-semibold text-base-content">Changelog</th>
                        <th className="px-2 text-left text-sm font-semibold text-base-content">Date</th>
                        <th className="px-2 text-left text-sm font-semibold text-base-content">
                            {getVersionLabel()}
                        </th>
                        <th className="px-2 text-left text-sm font-semibold text-base-content">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentBuilds.map((build, index) => (
                        <tr key={build.id} className="transition-colors hover:bg-base-300">
                            <td className="px-4 py-3">
                                <div className="flex items-center">
                                    <a
                                        href={getGitHubCommitUrl(build.commit.hash)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`text-sm font-medium badge ${index === 0 ? 'badge-success' : 'badge-primary'}`}
                                    >
                                        {build.commit.hash.slice(0, 8)}
                                    </a>
                                </div>
                            </td>
                            <td className="px-2 py-3">
                                <div className="flex items-center w-[300px] min-w-[300px] max-w-[300px]">
                                        <span className="text-sm truncate text-base-content">
                                            {build.commit.changelog}
                                        </span>
                                </div>
                            </td>
                            <td className="px-2 py-3 text-sm text-base-content">
                                {new Date(build.build_date).toLocaleString('en-US')}
                            </td>
                            <td className="px-2 py-3 text-sm text-base-content whitespace-nowrap">
                                {getDesktopVersionInfo(build)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex justify-end space-x-4 items-center">
                                    <a
                                        href={`${API_ENDPOINTS.MOHISTMC_API}/project/${projectName}/${selectedVersion}/builds/${build?.id}/download`}
                                        className="btn btn-primary btn-sm font-bold"
                                    >
                                        Download
                                    </a>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {itemsPerPage - currentBuilds.length > 0 &&
                        Array.from({ length: itemsPerPage - currentBuilds.length }).map((_, index) => (
                            <tr key={`empty-${index}`} aria-hidden="true">
                                <td colSpan={5}>
                                    <div className="h-full opacity-0 select-none"> </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View - shown on lg- screens */}
            <div className="lg:hidden grid grid-cols-1 gap-3">
                {currentBuilds.map((build, index) => (
                    <div key={build.id} className="card bg-base-300 shadow-sm">
                        <div className="card-body p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-sm">
                                        Build:
                                        <a
                                            href={getGitHubCommitUrl(build.commit.hash)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`text-sm font-medium badge ${index === 0 ? 'badge-success' : 'badge-primary'} ml-2`}
                                        >
                                            {build.commit.hash.slice(0, 8)}
                                        </a>
                                    </h3>
                                    <p className="text-xs mt-1">
                                        <span className="font-semibold">Date:</span> {new Date(build.build_date).toLocaleDateString('en-US')}
                                    </p>
                                </div>
                                <a
                                    href={`${API_ENDPOINTS.MOHISTMC_API}/project/${projectName}/${selectedVersion}/builds/${build?.id}/download`}
                                    className="btn btn-primary btn-sm font-bold shadow-lg"
                                >
                                    Download
                                </a>
                            </div>

                            <div className="mt-2">
                                <p className="text-xs">
                                    <span className="font-semibold">Changelog:</span>
                                </p>
                                <p className="text-xs mt-1 line-clamp-2">
                                    {build.commit.changelog}
                                </p>
                            </div>

                            <div className="mt-2">
                                <p className="text-xs">
                                    <span className="font-semibold">{getVersionLabel()}:</span> {getVersionInfo(build)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Fill empty cards for layout consistency */}
                {Array.from({ length: itemsPerPage - currentBuilds.length }).map((_, index) => (
                    <div key={`empty-card-${index}`} className="card bg-base-300 opacity-0 h-1" aria-hidden="true">
                        <div className="card-body p-4"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BuildTable;
