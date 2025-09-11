// src/app/tools/project-submit/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import NormalPage from '@/components/resources/NormalPage';

export default function ProjectSubmitPage() {
    const initialProjectData = {
        project: {
            name: '',
            logo: '',
            description: '',
            slogan: '',
            tags: [''],
            status: '开发中',
            license: 'MIT',
            openSource: true,
            currentVersion: 'v0.1.0 Alpha',
            warning: ''
        },
        features: [
            {
                icon: 'FaDownload',
                title: '',
                description: ''
            }
        ],
        gallery: [
            {
                src: '',
                alt: ''
            }
        ],
        changelog: [
            {
                version: 'v0.1.0 Alpha',
                date: new Date().toISOString().split('T')[0],
                status: 'completed',
                changes: [''],
                type: 'completed'
            }
        ],
        versions: [
            {
                version: 'v0.1.0 Alpha',
                status: 'Alpha',
                compatibility: '',
                releaseDate: new Date().toISOString().split('T')[0],
                buttonText: '即将推出'
            }
        ],
        author: {
            name: '',
            role: '开发团队'
        }
    };

    const [projectData, setProjectData] = useState<any>(initialProjectData);
    const [previewMode, setPreviewMode] = useState(false);

    // 从 localStorage 加载保存的数据
    useEffect(() => {
        const savedData = localStorage.getItem('projectSubmitData');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                // 合并初始数据结构和保存的数据，确保所有字段都存在
                setProjectData({
                    ...initialProjectData,
                    ...parsedData,
                    project: {
                        ...initialProjectData.project,
                        ...parsedData.project
                    },
                    features: parsedData.features || initialProjectData.features,
                    gallery: parsedData.gallery || initialProjectData.gallery,
                    changelog: parsedData.changelog || initialProjectData.changelog,
                    versions: parsedData.versions || initialProjectData.versions,
                    author: {
                        ...initialProjectData.author,
                        ...parsedData.author
                    }
                });
            } catch (error) {
                console.error('解析保存的数据时出错:', error);
            }
        }
    }, []);

    // 保存数据到 localStorage
    useEffect(() => {
        // 不保存初始空状态
        if (projectData !== initialProjectData) {
            localStorage.setItem('projectSubmitData', JSON.stringify(projectData));
        }
    }, [projectData]);

    const handleProjectChange = (field: string, value: any) => {
        setProjectData({
            ...projectData,
            project: {
                ...projectData.project,
                [field]: value
            }
        });
    };

    const handleFeatureChange = (index: number, field: string, value: any) => {
        const newFeatures = [...projectData.features];
        newFeatures[index] = {
            ...newFeatures[index],
            [field]: value
        };
        setProjectData({
            ...projectData,
            features: newFeatures
        });
    };

    const handleGalleryChange = (index: number, field: string, value: any) => {
        const newGallery = [...projectData.gallery];
        newGallery[index] = {
            ...newGallery[index],
            [field]: value
        };
        setProjectData({
            ...projectData,
            gallery: newGallery
        });
    };

    const handleChangelogChange = (index: number, field: string, value: any) => {
        const newChangelog = [...projectData.changelog];
        newChangelog[index] = {
            ...newChangelog[index],
            [field]: value
        };
        setProjectData({
            ...projectData,
            changelog: newChangelog
        });
    };

    const handleVersionChange = (index: number, field: string, value: any) => {
        const newVersions = [...projectData.versions];
        newVersions[index] = {
            ...newVersions[index],
            [field]: value
        };
        setProjectData({
            ...projectData,
            versions: newVersions
        });
    };

    const handleAuthorChange = (field: string, value: any) => {
        setProjectData({
            ...projectData,
            author: {
                ...projectData.author,
                [field]: value
            }
        });
    };

    const addFeature = () => {
        setProjectData({
            ...projectData,
            features: [
                ...projectData.features,
                {
                    icon: 'FaDownload',
                    title: '',
                    description: ''
                }
            ]
        });
    };

    const removeFeature = (index: number) => {
        if (projectData.features.length > 1) {
            const newFeatures = [...projectData.features];
            newFeatures.splice(index, 1);
            setProjectData({
                ...projectData,
                features: newFeatures
            });
        }
    };

    const addGalleryItem = () => {
        setProjectData({
            ...projectData,
            gallery: [
                ...projectData.gallery,
                {
                    src: '',
                    alt: ''
                }
            ]
        });
    };

    const removeGalleryItem = (index: number) => {
        if (projectData.gallery.length > 1) {
            const newGallery = [...projectData.gallery];
            newGallery.splice(index, 1);
            setProjectData({
                ...projectData,
                gallery: newGallery
            });
        }
    };

    const addChangelogItem = () => {
        setProjectData({
            ...projectData,
            changelog: [
                ...projectData.changelog,
                {
                    version: '',
                    date: new Date().toISOString().split('T')[0],
                    status: 'completed',
                    changes: [''],
                    type: 'completed'
                }
            ]
        });
    };

    const removeChangelogItem = (index: number) => {
        if (projectData.changelog.length > 1) {
            const newChangelog = [...projectData.changelog];
            newChangelog.splice(index, 1);
            setProjectData({
                ...projectData,
                changelog: newChangelog
            });
        }
    };

    const addVersionItem = () => {
        setProjectData({
            ...projectData,
            versions: [
                ...projectData.versions,
                {
                    version: '',
                    status: 'Alpha',
                    compatibility: '',
                    releaseDate: new Date().toISOString().split('T')[0],
                    buttonText: '下载'
                }
            ]
        });
    };

    const removeVersionItem = (index: number) => {
        if (projectData.versions.length > 1) {
            const newVersions = [...projectData.versions];
            newVersions.splice(index, 1);
            setProjectData({
                ...projectData,
                versions: newVersions
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 在实际应用中，这里会提交数据到服务器
        console.log('提交的项目数据:', projectData);
        // 清除保存的数据
        localStorage.removeItem('projectSubmitData');
        alert('项目数据已提交！在实际应用中，这些数据将被发送到服务器。');
    };

    // 添加清除数据的功能
    const clearSavedData = () => {
        if (confirm('确定要清除所有已保存的数据吗？')) {
            localStorage.removeItem('projectSubmitData');
            setProjectData(initialProjectData);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        项目提交
                    </h1>
                    <p className="text-base-content/70 mt-2">
                        创建并预览您的项目信息
                    </p>
                    <div className="mt-4">
                        <button
                            onClick={clearSavedData}
                            className="btn btn-sm btn-ghost text-warning"
                        >
                            清除保存的数据
                        </button>
                    </div>
                </div>

                <div className="tabs tabs-boxed bg-base-100/80 backdrop-blur-sm mx-auto max-w-md mb-8">
                    <button
                        className={`tab tab-lg ${!previewMode ? 'tab-active text-primary font-bold' : ''}`}
                        onClick={() => setPreviewMode(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        编辑模式
                    </button>
                    <button
                        className={`tab tab-lg ${previewMode ? 'tab-active text-primary font-bold' : ''}`}
                        onClick={() => setPreviewMode(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        预览模式
                    </button>
                </div>

                {!previewMode ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-base-100/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                            <div className="flex items-center mb-6">
                                <div className="bg-primary w-1 h-6 rounded-full mr-3"></div>
                                <h2 className="text-2xl font-bold">项目基本信息</h2>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-5">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">项目名称 *</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="输入项目名称"
                                            className="input input-bordered input-primary w-full mt-1"
                                            value={projectData.project.name}
                                            onChange={(e) => handleProjectChange('name', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Logo URL</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="https://example.com/logo.png"
                                            className="input input-bordered input-primary w-full mt-1"
                                            value={projectData.project.logo}
                                            onChange={(e) => handleProjectChange('logo', e.target.value)}
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">项目描述 *</span>
                                        </label>
                                        <textarea
                                            placeholder="详细描述您的项目"
                                            className="textarea textarea-bordered textarea-primary w-full h-24 mt-1"
                                            value={projectData.project.description}
                                            onChange={(e) => handleProjectChange('description', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">标语</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="一句简洁有力的标语"
                                            className="input input-bordered input-primary w-full mt-1"
                                            value={projectData.project.slogan}
                                            onChange={(e) => handleProjectChange('slogan', e.target.value)}
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">标签</span>
                                        </label>
                                        <div className="flex flex-wrap gap-2 mb-2 mt-1">
                                            {projectData.project.tags.map((tag: string, index: number) => (
                                                <div key={index} className="flex items-center bg-base-200 rounded-full px-3 py-1">
                                                    <input
                                                        type="text"
                                                        placeholder="标签"
                                                        className="input input-ghost input-sm w-24"
                                                        value={tag}
                                                        onChange={(e) => {
                                                            const newTags = [...projectData.project.tags];
                                                            newTags[index] = e.target.value;
                                                            handleProjectChange('tags', newTags);
                                                        }}
                                                    />
                                                    {projectData.project.tags.length > 1 && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-circle btn-ghost ml-1"
                                                            onClick={() => {
                                                                const newTags = [...projectData.project.tags];
                                                                newTags.splice(index, 1);
                                                                handleProjectChange('tags', newTags);
                                                            }}
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-ghost"
                                            onClick={() => handleProjectChange('tags', [...projectData.project.tags, ''])}
                                        >
                                            + 添加标签
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">状态</span>
                                            </label>
                                            <select
                                                className="select select-bordered select-primary w-full mt-1"
                                                value={projectData.project.status}
                                                onChange={(e) => handleProjectChange('status', e.target.value)}
                                            >
                                                <option value="开发中">开发中</option>
                                                <option value="稳定版">稳定版</option>
                                                <option value="测试版">测试版</option>
                                            </select>
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">许可证</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="MIT, Apache 等"
                                                className="input input-bordered input-primary w-full mt-1"
                                                value={projectData.project.license}
                                                onChange={(e) => handleProjectChange('license', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">当前版本</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="v1.0.0"
                                                className="input input-bordered input-primary w-full mt-1"
                                                value={projectData.project.currentVersion}
                                                onChange={(e) => handleProjectChange('currentVersion', e.target.value)}
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">开源</span>
                                            </label>
                                            <input
                                                type="checkbox"
                                                className="toggle toggle-primary mt-3"
                                                checked={projectData.project.openSource}
                                                onChange={(e) => handleProjectChange('openSource', e.target.checked)}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">警告信息</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="如有重要提醒请填写"
                                            className="input input-bordered input-primary w-full mt-1"
                                            value={projectData.project.warning}
                                            onChange={(e) => handleProjectChange('warning', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flex items-center mb-6">
                                        <div className="bg-primary w-1 h-6 rounded-full mr-3"></div>
                                        <h3 className="text-xl font-bold">功能特性</h3>
                                    </div>

                                    <div className="space-y-4">
                                        {projectData.features.map((feature: any, index: number) => (
                                            <div key={index} className="bg-base-200/50 rounded-xl p-4 relative">
                                                <div className="flex justify-between items-center mb-3">
                                                    <h4 className="font-bold">功能 {index + 1}</h4>
                                                    {projectData.features.length > 1 && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-circle btn-ghost"
                                                            onClick={() => removeFeature(index)}
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-xs">图标</span>
                                                        </label>
                                                        <select
                                                            className="select select-bordered select-sm select-primary mt-1"
                                                            value={feature.icon}
                                                            onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                                                        >
                                                            <option value="FaDownload">下载</option>
                                                            <option value="FaArrowRight">箭头</option>
                                                            <option value="FaBook">书籍</option>
                                                            <option value="FaGithub">GitHub</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-control md:col-span-2">
                                                        <label className="label">
                                                            <span className="label-text text-xs">标题</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="功能标题"
                                                            className="input input-bordered input-sm input-primary mt-1"
                                                            value={feature.title}
                                                            onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text text-xs">描述</span>
                                                    </label>
                                                    <textarea
                                                        placeholder="功能详细描述"
                                                        className="textarea textarea-bordered textarea-primary textarea-sm mt-1"
                                                        value={feature.description}
                                                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-ghost btn-sm"
                                            onClick={addFeature}
                                        >
                                            + 添加功能
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flex items-center mb-6">
                                        <div className="bg-primary w-1 h-6 rounded-full mr-3"></div>
                                        <h3 className="text-xl font-bold">作者信息</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">作者名称</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="作者或团队名称"
                                                className="input input-bordered input-primary w-full mt-1"
                                                value={projectData.author.name}
                                                onChange={(e) => handleAuthorChange('name', e.target.value)}
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">作者角色</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="开发团队、个人开发者等"
                                                className="input input-bordered input-primary w-full mt-1"
                                                value={projectData.author.role}
                                                onChange={(e) => handleAuthorChange('role', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 pt-6 border-t border-base-300">
                                    <button type="submit" className="btn btn-primary w-full py-3 text-lg font-bold">
                                        提交项目
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="bg-base-100/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                            <div className="flex items-center mb-6">
                                <div className="bg-primary w-1 h-6 rounded-full mr-3"></div>
                                <h2 className="text-2xl font-bold">项目详细信息</h2>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <div className="flex items-center mb-4">
                                        <div className="bg-secondary w-1 h-5 rounded-full mr-2"></div>
                                        <h3 className="text-lg font-bold">画廊</h3>
                                    </div>

                                    <div className="space-y-4">
                                        {projectData.gallery.map((item: any, index: number) => (
                                            <div key={index} className="bg-base-200/50 rounded-xl p-4">
                                                <div className="flex justify-between items-center mb-3">
                                                    <h4 className="font-bold">图片 {index + 1}</h4>
                                                    {projectData.gallery.length > 1 && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-circle btn-ghost"
                                                            onClick={() => removeGalleryItem(index)}
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-xs">图片URL</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="https://example.com/image.png"
                                                            className="input input-bordered input-sm input-primary mt-1"
                                                            value={item.src}
                                                            onChange={(e) => handleGalleryChange(index, 'src', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-xs">替代文本</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="图片描述"
                                                            className="input input-bordered input-sm input-primary mt-1"
                                                            value={item.alt}
                                                            onChange={(e) => handleGalleryChange(index, 'alt', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-ghost btn-sm"
                                            onClick={addGalleryItem}
                                        >
                                            + 添加图片
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center mb-4">
                                        <div className="bg-secondary w-1 h-5 rounded-full mr-2"></div>
                                        <h3 className="text-lg font-bold">更新日志</h3>
                                    </div>

                                    <div className="space-y-4">
                                        {projectData.changelog.map((entry: any, index: number) => (
                                            <div key={index} className="bg-base-200/50 rounded-xl p-4">
                                                <div className="flex justify-between items-center mb-3">
                                                    <h4 className="font-bold">版本 {index + 1}</h4>
                                                    {projectData.changelog.length > 1 && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-circle btn-ghost"
                                                            onClick={() => removeChangelogItem(index)}
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-xs">版本号</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="v1.0.0"
                                                            className="input input-bordered input-sm input-primary mt-1"
                                                            value={entry.version}
                                                            onChange={(e) => handleChangelogChange(index, 'version', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-xs">日期</span>
                                                        </label>
                                                        <input
                                                            type="date"
                                                            className="input input-bordered input-sm input-primary mt-1"
                                                            value={entry.date}
                                                            onChange={(e) => handleChangelogChange(index, 'date', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-control mb-3">
                                                    <label className="label">
                                                        <span className="label-text text-xs">类型</span>
                                                    </label>
                                                    <select
                                                        className="select select-bordered select-sm select-primary mt-1"
                                                        value={entry.type}
                                                        onChange={(e) => handleChangelogChange(index, 'type', e.target.value)}
                                                    >
                                                        <option value="completed">已完成</option>
                                                        <option value="in-progress">进行中</option>
                                                    </select>
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text text-xs">变更内容</span>
                                                    </label>
                                                    <div className="space-y-2">
                                                        {entry.changes.map((change: string, changeIndex: number) => (
                                                            <div key={changeIndex} className="flex items-center">
                                                                <input
                                                                    type="text"
                                                                    placeholder="变更内容"
                                                                    className="input input-bordered input-sm input-primary flex-1 mt-1"
                                                                    value={change}
                                                                    onChange={(e) => {
                                                                        const newChanges = [...entry.changes];
                                                                        newChanges[changeIndex] = e.target.value;
                                                                        handleChangelogChange(index, 'changes', newChanges);
                                                                    }}
                                                                />
                                                                {entry.changes.length > 1 && (
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-circle btn-ghost ml-2"
                                                                        onClick={() => {
                                                                            const newChanges = [...entry.changes];
                                                                            newChanges.splice(changeIndex, 1);
                                                                            handleChangelogChange(index, 'changes', newChanges);
                                                                        }}
                                                                    >
                                                                        ✕
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
                                                        <button
                                                            type="button"
                                                            className="btn btn-ghost btn-sm"
                                                            onClick={() => {
                                                                const newChanges = [...entry.changes, ''];
                                                                handleChangelogChange(index, 'changes', newChanges);
                                                            }}
                                                        >
                                                            + 添加变更
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-ghost btn-sm"
                                            onClick={addChangelogItem}
                                        >
                                            + 添加版本
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center mb-4">
                                        <div className="bg-secondary w-1 h-5 rounded-full mr-2"></div>
                                        <h3 className="text-lg font-bold">版本信息</h3>
                                    </div>

                                    <div className="space-y-4">
                                        {projectData.versions.map((version: any, index: number) => (
                                            <div key={index} className="bg-base-200/50 rounded-xl p-4">
                                                <div className="flex justify-between items-center mb-3">
                                                    <h4 className="font-bold">版本 {index + 1}</h4>
                                                    {projectData.versions.length > 1 && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-circle btn-ghost"
                                                            onClick={() => removeVersionItem(index)}
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-xs">版本号</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="v1.0.0"
                                                            className="input input-bordered input-sm input-primary mt-1"
                                                            value={version.version}
                                                            onChange={(e) => handleVersionChange(index, 'version', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-xs">状态</span>
                                                        </label>
                                                        <select
                                                            className="select select-bordered select-sm select-primary mt-1"
                                                            value={version.status}
                                                            onChange={(e) => handleVersionChange(index, 'status', e.target.value)}
                                                        >
                                                            <option value="Alpha">Alpha</option>
                                                            <option value="Beta">Beta</option>
                                                            <option value="Stable">稳定版</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-xs">兼容性</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Minecraft 1.12.2 等"
                                                            className="input input-bordered input-sm input-primary mt-1"
                                                            value={version.compatibility}
                                                            onChange={(e) => handleVersionChange(index, 'compatibility', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-xs">发布日期</span>
                                                        </label>
                                                        <input
                                                            type="date"
                                                            className="input input-bordered input-sm input-primary mt-1"
                                                            value={version.releaseDate}
                                                            onChange={(e) => handleVersionChange(index, 'releaseDate', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text text-xs">按钮文本</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="下载、即将推出等"
                                                        className="input input-bordered input-sm input-primary mt-1"
                                                        value={version.buttonText}
                                                        onChange={(e) => handleVersionChange(index, 'buttonText', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-ghost btn-sm"
                                            onClick={addVersionItem}
                                        >
                                            + 添加版本
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-base-100/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">项目预览</h2>
                            <button
                                className="btn btn-primary"
                                onClick={() => setPreviewMode(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                                </svg>
                                返回编辑
                            </button>
                        </div>

                        <div className="border-2 border-dashed border-base-300 rounded-xl overflow-hidden">
                            <div className="bg-white">
                                <NormalPage params={{ project: 'preview' }} previewData={projectData} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
