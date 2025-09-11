
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface ThreadInfo {
    id: number;
    cpuTime: number;
    userTime: number;
    name: string;
    state: string;
    blockedTime: number;
    waitedTime: number;
    blockedCount: number;
    waitedCount: number;
    stackTrace: string;
    lockInfo?: string;
    lockOwnerId: number;
}

interface ThreadDumpData {
    timestamp: string;
    totalThreads: number;
    totalCpuTime: number;
    totalUserTime: number;
    threads: ThreadInfo[];
}

const ThreadAnalysisPage: React.FC = () => {
    const [threadData, setThreadData] = useState<ThreadDumpData | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: keyof ThreadInfo; direction: 'asc' | 'desc' } | null>(null);
    const [filter, setFilter] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [expandedThreads, setExpandedThreads] = useState<Set<number>>(new Set());
    const [isDragOver, setIsDragOver] = useState(false);

    // Load data from local storage
    useEffect(() => {
        const savedData = localStorage.getItem('threadDumpData');
        if (savedData) {
            try {
                setThreadData(JSON.parse(savedData));
            } catch (e) {
                console.error('Failed to parse local storage data:', e);
            }
        }
    }, []);

    // Save data to local storage
    useEffect(() => {
        if (threadData) {
            localStorage.setItem('threadDumpData', JSON.stringify(threadData));
        }
    }, [threadData]);

    const handleFile = (file: File) => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const data: ThreadDumpData = JSON.parse(content);
                setThreadData(data);
                setError(null);
            } catch (err) {
                setError('File parsing failed, please ensure you selected a valid JSON file');
                console.error('File parsing error:', err);
            }
        };
        reader.onerror = () => {
            setError('File reading failed');
        };
        reader.readAsText(file);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    // Drag and drop upload functions
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type === 'application/json' || file.name.endsWith('.json')) {
                handleFile(file);
            } else {
                setError('Please upload a JSON format file');
            }
        }
    };

    const handleSort = (key: keyof ThreadInfo) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const clearCache = useCallback(() => {
        localStorage.removeItem('threadDumpData');
        setThreadData(null);
        setError(null);
        setExpandedThreads(new Set());
        // Reset file input
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    }, []);

    const toggleThreadExpansion = (threadId: number) => {
        setExpandedThreads(prev => {
            const newSet = new Set(prev);
            if (newSet.has(threadId)) {
                newSet.delete(threadId);
            } else {
                newSet.add(threadId);
            }
            return newSet;
        });
    };

    const getSortedThreads = () => {
        if (!threadData) return [];

        const sortableThreads = [...threadData.threads];
        if (sortConfig !== null) {
            sortableThreads.sort((a, b) => {
                const key = sortConfig.key;
                const direction = sortConfig.direction;

                const aValue = a[key];
                const bValue = b[key];

                if (aValue == null || bValue == null) return 0;

                if (aValue < bValue) {
                    return direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableThreads;
    };

    const getFilteredThreads = () => {
        const threads = getSortedThreads();
        if (!filter) return threads;

        return threads.filter(thread =>
            thread.name.toLowerCase().includes(filter.toLowerCase()) ||
            thread.state.toLowerCase().includes(filter.toLowerCase())
        );
    };

    // Modify time formatting function to handle millisecond units
    const formatTime = (millis: number): string => {
        if (millis < 1) return `${(millis * 1000).toFixed(0)} μs`;
        if (millis < 1000) return `${millis.toFixed(2)} ms`;
        if (millis < 60000) return `${(millis / 1000).toFixed(2)} s`;
        if (millis < 3600000) return `${(millis / 60000).toFixed(2)} min`;
        return `${(millis / 3600000).toFixed(2)} h`;
    };

    const getThreadStateColor = (state: string): string => {
        switch (state) {
            case 'RUNNABLE': return 'text-green-600';
            case 'WAITING': return 'text-yellow-600';
            case 'TIMED_WAITING': return 'text-orange-600';
            case 'BLOCKED': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const getCpuUsagePercentage = (cpuTime: number): number => {
        if (!threadData || threadData.totalCpuTime === 0) return 0;
        return (cpuTime / threadData.totalCpuTime) * 100;
    };

    // Parse stack trace information
    const parseStackTrace = (stackTrace: string): string[] => {
        if (!stackTrace.trim()) return [];
        return stackTrace.split('\n').filter(line => line.trim() !== '');
    };

    const sortedAndFilteredThreads = getFilteredThreads();

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Thread CPU Consumption Analysis</h1>
                {threadData && (
                    <button
                        onClick={clearCache}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                        Reimport
                    </button>
                )}
            </div>

            {/* File import and operation area - only shown when there's no data */}
            {!threadData && (
                <div
                    className={`bg-white shadow rounded-lg p-5 mb-6 transition-all duration-200 ${
                        isDragOver ? 'border-2 border-dashed border-blue-500 bg-blue-50' : ''
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Import Thread Dump File
                            </label>
                            <input
                                id="file-input"
                                type="file"
                                accept=".json"
                                onChange={handleFileUpload}
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                            />
                        </div>
                    </div>

                    {/* Drag and drop area prompt */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-colors"
                         onClick={() => document.getElementById('file-input')?.click()}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="text-gray-600 mb-1">
                                {isDragOver ? 'Release file to upload' : 'Drag file here or click to select file'}
                            </p>
                            <p className="text-gray-500 text-sm">
                                Supports JSON format files
                            </p>
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 mt-4 p-2 bg-red-50 rounded">
                            {error}
                        </div>
                    )}

                    <div className="text-gray-500 italic mt-4">
                        Please import a thread dump file to start analysis
                    </div>

                    {/* Instructions */}
                    <div className="mt-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 md:p-6 border border-gray-200 shadow-sm">
                        <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Instructions
                        </h2>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <span className="text-blue-500 font-bold mr-2">1.</span>
                                <span>Use the <code className="bg-gray-200 px-2 py-1 rounded-md text-xs font-mono">/youer printthreadcost</code> command in your Minecraft server to generate a thread performance report</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 font-bold mr-2">2.</span>
                                <span>After executing the command, a thread analysis JSON file will be generated in the server log directory</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 font-bold mr-2">3.</span>
                                <span>Upload the generated JSON result file here for visual analysis</span>
                            </li>
                        </ul>
                        <div className="mt-4">
                            <div className="text-xs text-gray-600 mb-2">
                                <p>Supported thread analysis software:</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Link href="/resources/youer" className="badge badge-primary badge-outline hover:badge-primary transition-colors">
                                    Youer
                                </Link>
                                <span className="badge badge-secondary badge-outline">More software support in development</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {threadData && (
                <>
                    <div className="bg-white shadow rounded-lg p-4 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Overview</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="border p-3 rounded">
                                <p className="text-gray-600">Total Threads</p>
                                <p className="text-2xl font-bold">{threadData.totalThreads}</p>
                            </div>
                            <div className="border p-3 rounded">
                                <p className="text-gray-600">Total CPU Time</p>
                                <p className="text-2xl font-bold">{formatTime(threadData.totalCpuTime)}</p>
                            </div>
                            <div className="border p-3 rounded">
                                <p className="text-gray-600">Total User Time</p>
                                <p className="text-2xl font-bold">{formatTime(threadData.totalUserTime)}</p>
                            </div>
                            <div className="border p-3 rounded">
                                <p className="text-gray-600">Data Time</p>
                                <p className="text-2xl font-bold">{new Date(threadData.timestamp).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-4 mb-6">
                        <div className="flex flex-col md:flex-row justify-between mb-4 gap-3">
                            <h2 className="text-xl font-semibold">Thread Details</h2>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Search thread name or state..."
                                    className="px-4 py-2 border rounded-lg w-full md:w-64"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Expand
                                    </th>
                                    <th
                                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('name')}
                                    >
                                        Thread Name
                                    </th>
                                    <th
                                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('state')}
                                    >
                                        State
                                    </th>
                                    <th
                                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('cpuTime')}
                                    >
                                        CPU Time
                                    </th>
                                    <th
                                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden md:table-cell"
                                        onClick={() => handleSort('userTime')}
                                    >
                                        User Time
                                    </th>
                                    <th
                                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden sm:table-cell"
                                        onClick={() => handleSort('blockedCount')}
                                    >
                                        Blocked Count
                                    </th>
                                    <th
                                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden sm:table-cell"
                                        onClick={() => handleSort('waitedCount')}
                                    >
                                        Waited Count
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        CPU Usage
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {sortedAndFilteredThreads.map((thread) => (
                                    <React.Fragment key={thread.id}>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {thread.stackTrace && (
                                                    <button
                                                        onClick={() => toggleThreadExpansion(thread.id)}
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        {expandedThreads.has(thread.id) ? 'Collapse' : 'Expand'}
                                                    </button>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                {thread.name}
                                            </td>
                                            <td className={`px-4 py-3 whitespace-nowrap text-sm ${getThreadStateColor(thread.state)}`}>
                                                {thread.state}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {formatTime(thread.cpuTime)}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                                {formatTime(thread.userTime)}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                                {thread.blockedCount}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                                {thread.waitedCount}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                                        <div
                                                            className="bg-blue-600 h-2 rounded-full"
                                                            style={{ width: `${getCpuUsagePercentage(thread.cpuTime)}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm text-gray-500 hidden md:inline">
                                                        {getCpuUsagePercentage(thread.cpuTime).toFixed(1)}%
                                                    </span>
                                                    <span className="text-sm text-gray-500 md:hidden">
                                                        {Math.round(getCpuUsagePercentage(thread.cpuTime))}%
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        {expandedThreads.has(thread.id) && thread.stackTrace && (
                                            <tr>
                                                <td colSpan={8} className="px-4 py-3 bg-gray-50">
                                                    <div className="font-medium mb-2">Stack Trace:</div>
                                                    <div className="font-mono text-sm bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto max-h-60 overflow-y-auto">
                                                        {parseStackTrace(thread.stackTrace).map((line, index) => (
                                                            <div key={index} className="whitespace-nowrap">
                                                                {line}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-4">Performance Analysis</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-medium mb-3">Top 5 Threads by CPU Time</h3>
                                <div className="space-y-3">
                                    {[...threadData.threads]
                                        .sort((a, b) => b.cpuTime - a.cpuTime)
                                        .slice(0, 5)
                                        .map((thread, index) => (
                                            <div key={thread.id} className="flex items-center">
                                                <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full mr-3">
                                                    <span className="text-sm font-medium text-gray-700">{index + 1}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium truncate">{thread.name}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {formatTime(thread.cpuTime)} ({getCpuUsagePercentage(thread.cpuTime).toFixed(1)}%)
                                                    </div>
                                                </div>
                                                <div className="w-24 bg-gray-200 rounded-full h-2 ml-2">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full"
                                                        style={{ width: `${getCpuUsagePercentage(thread.cpuTime)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium mb-3">Thread State Distribution</h3>
                                <div className="space-y-3">
                                    {Array.from(new Set(threadData.threads.map(t => t.state))).map(state => {
                                        const count = threadData.threads.filter(t => t.state === state).length;
                                        const percentage = (count / threadData.totalThreads) * 100;
                                        return (
                                            <div key={state} className="flex items-center">
                                                <div className="w-32 text-sm font-medium">{state}</div>
                                                <div className="flex-1 ml-2">
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className={`h-2 rounded-full ${
                                                                state === 'RUNNABLE' ? 'bg-green-500' :
                                                                    state === 'WAITING' ? 'bg-yellow-500' :
                                                                        state === 'TIMED_WAITING' ? 'bg-orange-500' :
                                                                            'bg-red-500'
                                                            }`}
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className="w-10 text-right text-sm text-gray-500 ml-2">{count}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ThreadAnalysisPage;