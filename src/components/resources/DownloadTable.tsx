
// components/DownloadTable.tsx
"use client";

import React, {useEffect, useState} from 'react';
import TitleContainer from "@/components/TitleContainer";
import {BuildDto, ProjectBuilds} from "@/interfaces/Build";
import Link from "next/link";
import BuildTable from "@/components/resources/BuildTable"; // Import new component
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {API_ENDPOINTS} from "@/lib/api";

interface DownloadTableProps {
    projectName: string;
    availableVersions: string[];
    titleKey: string;
    subtitleKey: string;
    initialVersion?: string;
    itemsPerPage?: number;
}

const DownloadTable = ({
                           projectName,
                           availableVersions,
                           titleKey,
                           subtitleKey,
                           initialVersion = "1.20.1",
                           itemsPerPage = 8
                       }: DownloadTableProps) => {
    const [data, setData] = useState<ProjectBuilds>({
        projectName,
        projectVersion: initialVersion,
        builds: []
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Initialize version from URL on mount
    useEffect(() => {
        const versionFromUrl = searchParams.get('v');
        if (versionFromUrl && availableVersions.includes(versionFromUrl)) {
            setSelectedVersion(versionFromUrl);
        } else {
            // If no version in URL or invalid, use default version
            setSelectedVersion(initialVersion);
        }
    }, [searchParams, availableVersions, initialVersion]);

    // Fetch build data
    useEffect(() => {
        // Only fetch data when selectedVersion is determined
        if (selectedVersion === null) return;

        const fetchData = async () => {
            setLoading(true); // Start loading
            try {
                const res = await fetch(
                    `${API_ENDPOINTS.MOHISTMC_API}/project/${projectName}/${selectedVersion}/builds`
                );
                const jsonData = await res.json();
                const sortedBuilds = jsonData.sort((a: BuildDto, b: BuildDto) =>
                    new Date(b.build_date).getTime() - new Date(a.build_date).getTime()
                );
                setData({ ...jsonData, builds: sortedBuilds });
            } catch (error) {
                console.error('Error fetching builds:', error);
                setData({
                    projectName,
                    projectVersion: selectedVersion,
                    builds: []
                });
            } finally {
                setLoading(false); // Finish loading
            }
        };
        fetchData();
    }, [selectedVersion, projectName]); // Dependencies include selectedVersion and projectName

    // Update URL version parameter without triggering data refetch
    useEffect(() => {
        if (selectedVersion === null) return;

        const params = new URLSearchParams(window.location.search);
        params.set('v', selectedVersion);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [selectedVersion, router, pathname]);

    const handleVersionChange = (version: string) => {
        setSelectedVersion(version);
        setCurrentPage(1); // Reset page when switching versions
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBuilds = data.builds.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(data.builds.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const getGitHubCommitUrl = (gitSha: string) => {
        return `https://github.com/MohistMC/${projectName}/commit/${gitSha}`;
    };

    // Don't render BuildTable until selectedVersion is determined
    if (selectedVersion === null) {
        return (
            <section className="flex flex-col min-h-screen bg-base-100 text-base-content pt-20">
                <TitleContainer
                    titleKey={titleKey}
                    subtitleKey={subtitleKey}
                />
                <div className="container mx-auto px-4 py-4 max-w-5xl shadow-md rounded-box bg-base-200">
                    <div className="flex justify-center items-center h-64">
                        <span className="loading loading-spinner loading-md"></span>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="flex flex-col min-h-screen bg-base-100 text-base-content pt-10">
            <TitleContainer
                titleKey={titleKey}
                subtitleKey={subtitleKey}
            />
            <div role="alert" className="alert alert-warning mx-auto max-w-3xl my-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="ml-3 text-sm font-normal">
                    <span className={'font-bold'}>
                        Do NOT ask for help in Spigot, PaperMC, Forge or NeoForge
                        forums.
                    </span>{' '}
                    They are not related to Mohist and will not help you. If
                    you have any issue, please use our{' '}
                    <a
                        href="https://discord.gg/mohistmc"
                        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                    >
                        Discord server
                    </a>
                    .
                </div>
            </div>
            <div role="alert" className="alert alert-warning mx-auto max-w-3xl my-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>JOlder builds are available at</span>
                {' '}
                <a
                    href="https://mohistmc.com/builds-raw"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                >
                    https://mohistmc.com/builds-raw
                </a>
            </div>
            {projectName.toLowerCase() === 'youer' && (
                <div role="alert" className="alert alert-error mx-auto max-w-xl my-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Join Beta Group - Get Early Access to New Features! </span>
                    <Link
                        href="https://www.patreon.com/c/mohistmc"
                        target="_blank"
                        className="btn btn-sm btn-primary"
                        role="button"
                    >
                        Go to Patreon
                    </Link>
                </div>
            )}
            {projectName.toLowerCase() === 'silkard' && (
                <div role="alert" className="alert alert-error mx-auto max-w-xl my-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Download Service Not Available </span>
                    <Link
                        href=""
                        className="btn btn-sm btn-error"
                        role="button"
                    >
                        Waiting for 1.22+ Versions
                    </Link>
                </div>
            )}
            <div className="container mx-auto px-4 py-4 max-w-5xl shadow-md rounded-box bg-base-200">
                {/* Version selector and nightly builds button - same row */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        {projectName.toLowerCase() === 'youer' && (
                            <Link
                                href="https://github.com/MohistMC/Youer/actions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-secondary flex items-center"
                            >
                                Nightly Builds
                            </Link>
                        )}
                    </div>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-sm bg-base-100 border border-base-300 hover:border-base-400 shadow-sm px-4 py-2"
                        >
                            {selectedVersion}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] p-2 shadow bg-base-200 rounded-box mt-2 max-h-60 overflow-y-auto min-w-max whitespace-nowrap"
                        >
                            {availableVersions.map(version => (
                                <li key={version} className="py-1">
                                    <a
                                        className={`block px-4 py-2 text-sm text-base-content hover:bg-base-300 rounded-btn ${
                                            selectedVersion === version ? 'font-bold bg-base-300' : ''
                                        }`}
                                        onClick={() => handleVersionChange(version)}
                                    >
                                        {version}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Use new component, pass loading state */}
                <BuildTable
                    projectName={projectName}
                    selectedVersion={selectedVersion}
                    currentBuilds={currentBuilds}
                    itemsPerPage={itemsPerPage}
                    getGitHubCommitUrl={getGitHubCommitUrl}
                    loading={loading} // Pass loading state
                />

                <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
                    <span className="text-sm text-base-content">
                        Page {currentPage} of {Math.ceil(data.builds.length / itemsPerPage)}
                    </span>
                    <div className="flex justify-end space-x-2 items-center">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="btn btn-sm btn-outline"
                            title="Previous Page"
                        >
                            &lt;
                        </button>

                        {Array.from({
                            length: Math.min(3, Math.ceil(data.builds.length / itemsPerPage))
                        }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`btn btn-sm ${currentPage === page ? "btn-primary" : "btn-outline"}`}
                            >
                                {page}
                            </button>
                        ))}

                        {Math.ceil(data.builds.length / itemsPerPage) > 3 && (
                            <>
                                <span className="px-2 py-1 text-base-content/50">...</span>
                                <button
                                    onClick={() => setCurrentPage(Math.ceil(data.builds.length / itemsPerPage))}
                                    className={`btn btn-sm ${currentPage === Math.ceil(data.builds.length / itemsPerPage) ? "btn-primary" : "btn-outline"}`}
                                >
                                    {Math.ceil(data.builds.length / itemsPerPage)}
                                </button>
                            </>
                        )}

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === Math.ceil(data.builds.length / itemsPerPage)}
                            className="btn btn-sm btn-outline"
                            title="Next Page"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DownloadTable;