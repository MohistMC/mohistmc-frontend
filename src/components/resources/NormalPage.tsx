
// src/app/resources/[project]/page.tsx
"use client";

import { FaArrowRight, FaDownload, FaBook, FaGithub, FaTriangleExclamation, FaTags, FaRegBookmark, FaRegHeart, FaHeart, FaBookmark } from "react-icons/fa6";
import CommentSection from "@/components/CommentSection";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { ProjectData } from '@/types/wukong';
import { loadUser } from '@/lib/users'; // Import user loading function

interface ProjectPageProps {
    params: {
        project: string;
    };
    // Add preview data property
    previewData?: ProjectData;
}

export default function ProjectPage({ params, previewData }: ProjectPageProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('description');
    const [projectData, setProjectData] = useState<ProjectData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [author, setAuthor] = useState<{avatar: string, name: string, role: string} | null>(null); // Add author state

    // Dynamically control page scrolling
    useEffect(() => {
        if (previewImage) {
            document.body.style.overflow = "hidden"; // Disable scrolling
        } else {
            document.body.style.overflow = "auto"; // Enable scrolling
        }

        // Cleanup function to restore scrolling when component unmounts
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [previewImage]);

    // Add useEffect at component top to handle URL routing
    useEffect(() => {
        // If preview data is provided, use it directly
        if (previewData) {
            setProjectData(previewData);
            setLoading(false);
            return;
        }

        // Get tab value from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const tabParam = urlParams.get('tab');

        // If URL has tab parameter and it's a valid tab, set it as current tab
        if (tabParam && ['description', 'gallery', 'changelog', 'versions', 'comments'].includes(tabParam)) {
            setActiveTab(tabParam);
        }
    }, []);

    // Load project data
    useEffect(() => {
        // If preview data is provided, no need to load
        if (previewData) {
            return;
        }

        const loadProjectData = async () => {
            try {
                const response = await fetch(`/json/projects/${params.project}.json`);
                const data: ProjectData = await response.json();
                setProjectData(data);

                // Load author information
                let authorAvatar = "MohistMC";
                let authorName = "MohistMC";
                let authorRole = "Developer";

                if (data.project.author) {
                    const authorData = await loadUser(data.project.author);
                    if (authorData) {
                        authorAvatar = authorData.avatar;
                        authorName = authorData.name;
                        authorRole = "Project Author";
                    }
                }

                setAuthor({avatar: authorAvatar, name: authorName, role: authorRole });

                // Read like state from local cache
                const likedState = localStorage.getItem(`${params.project}-liked`);
                if (likedState !== null) {
                    setIsLiked(JSON.parse(likedState));
                }

                // Read bookmark state from local cache
                const bookmarkedState = localStorage.getItem(`${params.project}-bookmarked`);
                if (bookmarkedState !== null) {
                    setIsBookmarked(JSON.parse(bookmarkedState));
                }
            } catch (error) {
                console.error('Failed to load project data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProjectData();
    }, [params.project, previewData]);

    // Modify setActiveTab call to also update URL
    const handleTabChange = (tabName: string) => {
        setActiveTab(tabName);

        // Update URL parameters (only in non-preview mode)
        if (!previewData) {
            const url = new URL(window.location.href);
            url.searchParams.set('tab', tabName);
            window.history.replaceState({}, '', url);
        }
    };

    if (loading) {
        return (
            <div className="pt-8 min-h-screen flex items-center justify-center">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    if (!projectData) {
        return (
            <div className="pt-8 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
                    <p className="text-base-content/70">Unable to load project data</p>
                </div>
            </div>
        );
    }

    const { project, features, gallery, changelog, versions } = projectData;

    return (
        <div className="pt-8 min-h-screen">
            {/* Title Area */}
            <section className="py-4 px-4">
                <div className="max-w-screen-xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-start bg-base-100 rounded-xl shadow-sm p-4">
                        <div className="mb-3 sm:mb-0 sm:mr-4">
                            <div className="bg-base-200 rounded-lg p-2 shadow">
                                <Image
                                    src={project.logo}
                                    alt={`${project.name} Logo`}
                                    width={65}
                                    height={65}
                                    className="w-16 h-16 object-contain"
                                />
                            </div>
                        </div>
                        <div className="flex-1 w-full">
                            <h1 className="text-xl md:text-2xl font-bold mb-2">
                                {project.name}
                            </h1>
                            <div className="flex flex-wrap gap-2 mb-2 items-center">
                                <FaTags className="h-4 w-4 text-base-content/60" />
                                {project.tags.map((tag, index) => (
                                    <span key={index} className="badge badge-primary badge-sm">{tag}</span>
                                ))}
                                <span className={`badge ${project.status === '开发中' ? 'badge-accent' : 'badge-success'} badge-sm`}>
                                  {project.status === '开发中' ? 'In Development' : project.status}
                                </span>
                                <span className="badge badge-info badge-sm">{project.license} License</span>
                            </div>
                            <p className="mb-2 text-base-content/80 text-sm">
                                {project.description}
                            </p>
                            <p className="mb-3 text-green-600 italic text-sm">
                                {project.slogan}
                            </p>
                        </div>
                        <div className="ml-0 sm:ml-auto flex flex-col sm:flex-row items-start sm:items-center justify-center mt-3 sm:mt-0 w-full sm:w-auto">
                            <div className="flex gap-3 w-full sm:w-auto">
                                <Link
                                    href="?tab=versions"
                                    className="btn btn-primary flex-1 sm:flex-none flex items-center justify-center"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleTabChange('versions');
                                    }}
                                >
                                    <FaDownload className="mr-2" />
                                    <span className="whitespace-nowrap">Download</span>
                                </Link>
                                {/* Show like and bookmark buttons only in non-preview mode */}
                                {!previewData && (
                                    <div className="flex gap-1 items-center">
                                        <button
                                            className={`btn btn-ghost btn-circle btn-sm ${isLiked ? 'text-red-500' : ''}`}
                                            onClick={() => {
                                                const newState = !isLiked;
                                                setIsLiked(newState);
                                                // Save to local cache
                                                localStorage.setItem(`${params.project}-liked`, JSON.stringify(newState));
                                            }}
                                        >
                                            {isLiked ? <FaHeart className="h-4 w-4" /> : <FaRegHeart className="h-4 w-4" />}
                                        </button>
                                        <button
                                            className={`btn btn-ghost btn-circle btn-sm ${isBookmarked ? 'text-blue-500' : ''}`}
                                            onClick={() => {
                                                const newState = !isBookmarked;
                                                setIsBookmarked(newState);
                                                // Save to local cache
                                                localStorage.setItem(`${params.project}-bookmarked`, JSON.stringify(newState));
                                            }}
                                        >
                                            {isBookmarked ? <FaBookmark className="h-4 w-4" /> : <FaRegBookmark className="h-4 w-4" />}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Warning Information */}
            {project.warning && (
                <section className="px-4 pb-8">
                    <div className="max-w-screen-xl mx-auto">
                        <div className="alert alert-warning shadow-sm">
                            <div className="flex items-center">
                                <FaTriangleExclamation className="text-lg mr-2 flex-shrink-0" />
                                <span>
                                  <strong>Notice:</strong> {project.warning}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Tab Navigation and Content */}
            <section className="px-4 pb-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="w-full lg:w-3/4">
                            <div className="tabs tabs-boxed bg-base-200 overflow-x-auto">
                                <button
                                    className={`tab border-b-2 ${activeTab === 'description' ? 'tab-active border-primary text-primary font-semibold shadow-inner' : 'border-transparent'}`}
                                    onClick={() => handleTabChange('description')}
                                >
                                    Description
                                </button>
                                <button
                                    className={`tab border-b-2 ${activeTab === 'gallery' ? 'tab-active border-primary text-primary font-semibold shadow-inner' : 'border-transparent'}`}
                                    onClick={() => handleTabChange('gallery')}
                                >
                                    Gallery
                                </button>
                                <button
                                    className={`tab border-b-2 ${activeTab === 'changelog' ? 'tab-active border-primary text-primary font-semibold shadow-inner' : 'border-transparent'}`}
                                    onClick={() => handleTabChange('changelog')}
                                >
                                    Changelog
                                </button>
                                <button
                                    className={`tab border-b-2 ${activeTab === 'versions' ? 'tab-active border-primary text-primary font-semibold shadow-inner' : 'border-transparent'}`}
                                    onClick={() => handleTabChange('versions')}
                                >
                                    Versions
                                </button>
                                <button
                                    className={`tab border-b-2 ${activeTab === 'comments' ? 'tab-active border-primary text-primary font-semibold shadow-inner' : 'border-transparent'}`}
                                    onClick={() => handleTabChange('comments')}
                                >
                                    Comments
                                </button>
                            </div>

                            {/* Tab Content Area */}
                            <div className="mt-6">
                                {activeTab === 'description' && (
                                    <div className="tab-content block">
                                        <div className="bg-base-100 rounded-xl shadow-sm p-6">
                                            <h2 className="text-2xl font-bold mb-4">{project.name} Client Engine</h2>
                                            <p className="mb-4 text-base-content/80">
                                                {project.description}
                                            </p>
                                            <p className="mb-6 text-base-content/80">
                                                It provides rich features and high customizability, enabling you to create unique Minecraft gaming experiences.
                                            </p>

                                            <h3 className="text-xl font-semibold mb-3">Key Advantages</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {features.map((feature, index) => (
                                                    <div key={index} className="flex items-start p-4 bg-base-200 rounded-lg">
                                                        <div className="text-primary mr-3 mt-1">
                                                            {feature.icon === 'FaDownload' && <FaDownload />}
                                                            {feature.icon === 'FaArrowRight' && <FaArrowRight />}
                                                            {feature.icon === 'FaBook' && <FaBook />}
                                                            {feature.icon === 'FaGithub' && <FaGithub />}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold">{feature.title}</h4>
                                                            <p className="text-sm text-base-content/70">{feature.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'gallery' && (
                                    <div className="tab-content block">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {gallery.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className="card card-compact bg-base-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                                    onClick={() => setPreviewImage(image.src)}
                                                >
                                                    <figure className="aspect-video">
                                                        <Image
                                                            src={image.src}
                                                            alt={image.alt}
                                                            width={300}
                                                            height={200}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </figure>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'changelog' && (
                                    <div className="tab-content block">
                                        <div className="bg-base-100 rounded-xl shadow-sm p-4 sm:p-6">
                                            <div className="space-y-8">
                                                {changelog.map((entry, index) => (
                                                    <div key={index}>
                                                        <div className="flex items-center mb-3">
                                                            <div className={`w-6 h-6 rounded-full ${entry.type === 'completed' ? 'bg-primary' : 'bg-secondary'} flex items-center justify-center mr-3`}>
                                                                {entry.type === 'completed' ? (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                                                    </svg>
                                                                )}
                                                            </div>
                                                            <div className={`text-lg font-bold ${entry.type === 'completed' ? 'text-primary' : 'text-secondary'}`}>
                                                                {entry.version}
                                                            </div>
                                                            <div className="text-sm text-base-content/60 ml-3">{entry.date}</div>
                                                        </div>
                                                        <ul className="list-disc list-inside text-base-content/80 space-y-1 ml-9">
                                                            {entry.changes.map((change, changeIndex) => (
                                                                <li key={changeIndex}>{change}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'versions' && (
                                    <div className="tab-content block" id="versions">
                                        <div className="overflow-x-auto">
                                            <table className="table table-zebra whitespace-nowrap">
                                                <thead>
                                                <tr className="bg-base-200">
                                                    <th>Version</th>
                                                    <th>Status</th>
                                                    <th>Compatibility</th>
                                                    <th>Release Date</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {versions.map((version, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="font-medium">{version.version}</div>
                                                        </td>
                                                        <td>
                                                        <span className={`badge ${version.status === 'Alpha' ? 'badge-warning' : 'badge-success'}`}>
                                                          {version.status}
                                                        </span>
                                                        </td>
                                                        <td className="max-w-xs truncate">{version.compatibility}</td>
                                                        <td>{version.releaseDate}</td>
                                                        <td>
                                                            {version.downloadLink ? (
                                                                <a href={version.downloadLink} className="btn btn-sm btn-outline">
                                                                    {version.buttonText}
                                                                </a>
                                                            ) : (
                                                                <button className="btn btn-sm btn-outline" disabled>
                                                                    {version.buttonText}
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="mt-6 bg-base-100 rounded-xl shadow-sm p-6">
                                            <h3 className="text-lg font-semibold mb-3">Version Notes</h3>
                                            <div className="text-base-content/80">
                                                <p className="mb-2">• Alpha versions may have instability and missing features</p>
                                                <p className="mb-2">• Recommended for use in testing environments</p>
                                                <p>• Complete migration guide will be provided when the official version is released</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'comments' && (
                                    <div className="tab-content block">
                                        <div className="bg-base-100 rounded-xl shadow-sm p-6">
                                            {/* Show comment section only in non-preview mode */}
                                            {!previewData ? (
                                                <CommentSection jsonPath={`/json/comments/${params.project}.json`} />
                                            ) : (
                                                <div className="text-center py-8">
                                                    <p className="text-base-content/70">Comment section not displayed in preview mode</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Info Area */}
                        <div className="w-full lg:w-1/5">
                            <div className="bg-base-100 rounded-xl shadow-sm p-4 sticky top-4">
                                <h3 className="font-bold text-lg mb-3">Basic Information</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-base-content/70">Status</span>
                                        <span className={`badge ${project.status === '开发中' ? 'badge-accent' : 'badge-success'} badge-sm`}>
                                          {project.status === '开发中' ? 'In Development' : project.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-base-content/70">License</span>
                                        <span className="badge badge-info badge-sm">{project.license}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-base-content/70">Open Source</span>
                                        <span className={`badge ${project.openSource ? 'badge-success' : 'badge-error'} badge-sm`}>
                                          {project.openSource ? 'Yes' : 'No'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-base-content/70">Current Version</span>
                                        <span className="text-sm font-medium">{project.currentVersion}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Author Info Area */}
                            <div className="bg-base-100 rounded-xl shadow-sm p-4 mt-6">
                                <h3 className="font-bold text-lg mb-3">Creator</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <div className="avatar mr-3">
                                            <div className="bg-base-200 text-base-content rounded-full w-10 h-10">
                                                {author?.avatar ? (
                                                    <Image
                                                        src={author.avatar}
                                                        alt={`${author?.name || 'Author'}'s Avatar`}
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-sm">Author</span>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-medium">{author?.name || "Unknown Author"}</div>
                                            <div className="text-xs text-base-content/70">{author?.role || "Developer"}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Half-screen Image Preview */}
            {previewImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
                    onClick={() => setPreviewImage(null)}
                >
                    <div
                        className="relative w-full h-full max-w-4xl max-h-[80vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={previewImage}
                            alt="Preview Image"
                            fill
                            className="object-contain"
                        />
                        <button
                            className="absolute top-2 right-2 btn btn-circle btn-sm btn-ghost text-white"
                            onClick={() => setPreviewImage(null)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}