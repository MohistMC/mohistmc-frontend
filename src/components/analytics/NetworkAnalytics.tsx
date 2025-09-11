
// src/components/analytics/NetworkAnalytics.tsx
'use client';

import React, {useEffect, useRef, useState} from 'react';
import * as echarts from 'echarts';
import {FiActivity, FiDatabase, FiPackage, FiRefreshCw, FiUpload} from 'react-icons/fi';
import Link from 'next/link';

// Define data types
interface PacketTypeData {
    bytes: number;
    packets: number;
    bytesPerSecond: number;
    packetsPerSecond: number;
}

interface NetworkData {
    totalBytes: number;
    totalPackets: number;
    bytesPerSecond: number;
    packetsPerSecond: number;
    timestamp: string;
    packetTypes: {
        [key: string]: PacketTypeData;
    };
}

// Function to convert bytes to readable format
const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

interface NetworkAnalyticsProps {
    initialData?: NetworkData | null;
    onDataLoad?: (data: NetworkData) => void;
    onReset?: () => void;
}

const NetworkAnalytics: React.FC<NetworkAnalyticsProps> = ({
                                                               initialData = null,
                                                               onDataLoad,
                                                               onReset
                                                           }) => {
    const bytesChartRef = useRef<HTMLDivElement>(null);
    const packetsChartRef = useRef<HTMLDivElement>(null);
    const bytesPerSecondChartRef = useRef<HTMLDivElement>(null);
    const packetsPerSecondChartRef = useRef<HTMLDivElement>(null);

    // State management - initial value is null
    const [networkData, setNetworkData] = useState<NetworkData | null>(initialData);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Handle file selection
    const handleFileSelect = (file: File) => {
        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target?.result as string);
                // Validate data structure
                if (typeof jsonData === 'object' &&
                    'totalBytes' in jsonData &&
                    'totalPackets' in jsonData &&
                    'bytesPerSecond' in jsonData &&
                    'packetsPerSecond' in jsonData &&
                    'packetTypes' in jsonData) {
                    setNetworkData(jsonData);
                    setError(null);
                    onDataLoad?.(jsonData);
                } else {
                    setError('Invalid JSON file format. Please ensure it contains the necessary data fields');
                }
            } catch (err) {
                setError('Invalid JSON file format');
                console.error('JSON parsing error:', err);
                setNetworkData(null); // Ensure return to upload page
            } finally {
                setIsLoading(false);
            }
        };
        reader.onerror = () => {
            setError('File reading failed');
            setIsLoading(false);
            setNetworkData(null); // Ensure return to upload page
        };
        reader.readAsText(file);
    };

    // File upload handling
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    // Drag and drop handling
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    // Initialize charts
    useEffect(() => {
        if (!networkData || !bytesChartRef.current || !packetsChartRef.current ||
            !bytesPerSecondChartRef.current || !packetsPerSecondChartRef.current) {
            return;
        }

        // Sort by bytes and take top 10
        const sortedByBytes = Object.entries(networkData.packetTypes)
            .sort((a, b) => b[1].bytes - a[1].bytes)
            .slice(0, 10);

        // Sort by packet count and take top 10
        const sortedByPackets = Object.entries(networkData.packetTypes)
            .sort((a, b) => b[1].packets - a[1].packets)
            .slice(0, 10);

        // Sort by bytes per second and take top 10
        const sortedByBytesPerSecond = Object.entries(networkData.packetTypes)
            .sort((a, b) => b[1].bytesPerSecond - a[1].bytesPerSecond)
            .slice(0, 10);

        // Sort by packets per second and take top 10
        const sortedByPacketsPerSecond = Object.entries(networkData.packetTypes)
            .sort((a, b) => b[1].packetsPerSecond - a[1].packetsPerSecond)
            .slice(0, 10);

        // Bytes distribution pie chart
        const bytesChart = echarts.init(bytesChartRef.current);
        bytesChart.setOption({
            title: {
                text: 'Packet Type Bytes Distribution',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} bytes ({d}%)'
            },
            series: [
                {
                    name: 'Bytes Distribution',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    data: sortedByBytes.map(([name, data]) => ({
                        name,
                        value: data.bytes
                    })),
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {
                        show: true,
                        color: '#64748b',
                        fontSize: 12
                    },
                    labelLine: {
                        show: true,
                        lineStyle: {
                            color: '#94a3b8'
                        }
                    }
                }
            ]
        });

        // Packet count distribution pie chart
        const packetsChart = echarts.init(packetsChartRef.current);
        packetsChart.setOption({
            title: {
                text: 'Packet Type Count Distribution',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} packets ({d}%)'
            },
            series: [
                {
                    name: 'Packet Count',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    data: sortedByPackets.map(([name, data]) => ({
                        name,
                        value: data.packets
                    })),
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {
                        show: true,
                        color: '#64748b',
                        fontSize: 12
                    },
                    labelLine: {
                        show: true,
                        lineStyle: {
                            color: '#94a3b8'
                        }
                    }
                }
            ]
        });

        // Bytes per second bar chart
        const bytesPerSecondChart = echarts.init(bytesPerSecondChartRef.current);
        bytesPerSecondChart.setOption({
            title: {
                text: 'Bytes Per Second',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: sortedByBytesPerSecond.map(([name]) => name),
                axisLabel: {
                    rotate: 45,
                    fontSize: 10
                }
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Bytes/Second',
                    type: 'bar',
                    data: sortedByBytesPerSecond.map(([, data]) => data.bytesPerSecond),
                    barWidth: '60%'
                }
            ]
        });

        // Packets per second bar chart
        const packetsPerSecondChart = echarts.init(packetsPerSecondChartRef.current);
        packetsPerSecondChart.setOption({
            title: {
                text: 'Packets Per Second',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: sortedByPacketsPerSecond.map(([name]) => name),
                axisLabel: {
                    rotate: 45,
                    fontSize: 10
                }
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Packets/Second',
                    type: 'bar',
                    data: sortedByPacketsPerSecond.map(([, data]) => data.packetsPerSecond),
                    barWidth: '60%'
                }
            ]
        });

        // Respond to window size changes
        const handleResize = () => {
            bytesChart.resize();
            packetsChart.resize();
            bytesPerSecondChart.resize();
            packetsPerSecondChart.resize();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            bytesChart.dispose();
            packetsChart.dispose();
            bytesPerSecondChart.dispose();
            packetsPerSecondChart.dispose();
        };
    }, [networkData]);

    // If there's no data, show the file upload interface
    if (!networkData) {
        return (
            <div className="bg-base-100 rounded-xl shadow-lg p-4 md:p-6 mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">Network Packet Analysis</h1>
                <p className="text-center text-base-content/70 mb-6">Upload a JSON file to analyze network packets</p>

                <div
                    className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center cursor-pointer transition-all duration-300
                        ${isDragging ? 'border-primary bg-primary/10' : 'border-base-300'}
                        hover:border-primary hover:bg-base-200`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload')?.click()}
                >
                    <div className="flex flex-col items-center justify-center">
                        {isLoading ? (
                            <>
                                <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
                                <p className="text-lg mb-2">Processing file...</p>
                            </>
                        ) : (
                            <>
                                <FiUpload className="text-3xl md:text-4xl mb-4 text-base-content/30" />
                                <p className="text-lg mb-2">Drag and drop a JSON file here or click to select a file</p>
                                <p className="text-base-content/70 mb-4">Supports drag and drop upload or click to select file</p>
                                <button className="btn btn-primary gap-2 btn-sm md:btn-md">
                                    <FiUpload />
                                    Select JSON File
                                </button>
                            </>
                        )}
                        <input
                            id="file-upload"
                            type="file"
                            accept=".json"
                            className="hidden"
                            onChange={handleFileUpload}
                            disabled={isLoading}
                        />
                    </div>
                </div>

                {error && (
                    <div className="alert alert-error mt-4 shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                <div className="mt-8 bg-gradient-to-br from-base-200 to-base-300 rounded-xl p-4 md:p-6 border border-base-300 shadow-sm">
                    <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2 text-base-content">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Instructions
                    </h2>
                    <ul className="space-y-3 text-base-content/90">
                        <li className="flex items-start">
                            <span className="text-primary font-bold mr-2">1.</span>
                            <span>Use the <code className="bg-base-300 px-2 py-1 rounded-md text-xs font-mono">/youer packetstats start</code> command in your Minecraft server to start network packet analysis</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary font-bold mr-2">2.</span>
                            <span>During analysis, you can use <code className="bg-base-300 px-2 py-1 rounded-md text-xs font-mono">/youer packetstats status</code> to check the analysis status</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary font-bold mr-2">3.</span>
                            <span>Use the <code className="bg-base-300 px-2 py-1 rounded-md text-xs font-mono">/youer packetstats stop</code> command to stop analysis and generate result file</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary font-bold mr-2">4.</span>
                            <span>Upload the generated JSON result file here for visual analysis</span>
                        </li>
                    </ul>
                    <div className="mt-4">
                        <div className="text-xs text-base-content/70 mb-2">
                            <p>Supported packet analysis software:</p>
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
        );
    }

    return (
        <div className="bg-base-100 rounded-xl shadow-lg p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Network Packet Analysis</h1>
                    <p className="text-base-content/70">Detailed analysis of network packet distribution and traffic</p>
                </div>
                <button
                    className="btn btn-secondary flex items-center gap-2 btn-sm md:btn-md"
                    onClick={() => {
                        setNetworkData(null);
                        setError(null);
                        onReset?.();
                    }}
                >
                    <FiRefreshCw />
                    Reupload
                </button>
            </div>

            {/* Summary statistic cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-base-100 rounded-xl shadow p-4 md:p-6 flex items-center border border-base-200">
                    <div className="mr-3 md:mr-4 p-2 md:p-3 rounded-full text-blue-500">
                        <FiDatabase size={20} />
                    </div>
                    <div>
                        <h3 className="text-xs md:text-sm text-base-content/70">Total Bytes</h3>
                        <p className="text-lg md:text-2xl font-bold text-base-content">{formatBytes(networkData.totalBytes)}</p>
                    </div>
                </div>

                <div className="bg-base-100 rounded-xl shadow p-4 md:p-6 flex items-center border border-base-200">
                    <div className="mr-3 md:mr-4 p-2 md:p-3 rounded-full text-green-500">
                        <FiPackage size={20} />
                    </div>
                    <div>
                        <h3 className="text-xs md:text-sm text-base-content/70">Total Packets</h3>
                        <p className="text-lg md:text-2xl font-bold text-base-content">{networkData.totalPackets.toLocaleString()}</p>
                    </div>
                </div>

                <div className="bg-base-100 rounded-xl shadow p-4 md:p-6 flex items-center border border-base-200">
                    <div className="mr-3 md:mr-4 p-2 md:p-3 rounded-full text-purple-500">
                        <FiActivity size={20} />
                    </div>
                    <div>
                        <h3 className="text-xs md:text-sm text-base-content/70">Bytes/Second</h3>
                        <p className="text-lg md:text-2xl font-bold text-base-content">{formatBytes(networkData.bytesPerSecond)}/s</p>
                    </div>
                </div>

                <div className="bg-base-100 rounded-xl shadow p-4 md:p-6 flex items-center border border-base-200">
                    <div className="mr-3 md:mr-4 p-2 md:p-3 rounded-full text-orange-500">
                        <FiActivity size={20} />
                    </div>
                    <div>
                        <h3 className="text-xs md:text-sm text-base-content/70">Packets/Second</h3>
                        <p className="text-lg md:text-2xl font-bold text-base-content">{networkData.packetsPerSecond.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Chart area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                <div className="bg-base-100 rounded-xl shadow p-3 md:p-4 border border-base-200">
                    <div ref={bytesChartRef} style={{ height: '300px' }} className="bg-base-100 rounded-lg"></div>
                </div>
                <div className="bg-base-100 rounded-xl shadow p-3 md:p-4 border border-base-200">
                    <div ref={packetsChartRef} style={{ height: '300px' }} className="bg-base-100 rounded-lg"></div>
                </div>
                <div className="bg-base-100 rounded-xl shadow p-3 md:p-4 border border-base-200">
                    <div ref={bytesPerSecondChartRef} style={{ height: '300px' }} className="bg-base-100 rounded-lg"></div>
                </div>
                <div className="bg-base-100 rounded-xl shadow p-3 md:p-4 border border-base-200">
                    <div ref={packetsPerSecondChartRef} style={{ height: '300px' }} className="bg-base-100 rounded-lg"></div>
                </div>
            </div>

            {/* Data table */}
            <div className="bg-base-100 rounded-xl shadow overflow-hidden border border-base-200">
                <div className="hidden md:block overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-base-200">
                        <tr>
                            <th className="text-left text-xs p-2">Packet Type</th>
                            <th className="text-right text-xs p-2">Bytes</th>
                            <th className="text-right text-xs p-2">Packets</th>
                            <th className="text-right text-xs p-2">Bytes/Second</th>
                            <th className="text-right text-xs p-2">Packets/Second</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.entries(networkData.packetTypes)
                            .sort((a, b) => b[1].bytes - a[1].bytes)
                            .map(([name, data]) => (
                                <tr key={name} className="hover">
                                    <td className="font-mono text-xs p-2">{name}</td>
                                    <td className="text-right text-xs p-2">{formatBytes(data.bytes)}</td>
                                    <td className="text-right text-xs p-2">{data.packets.toLocaleString()}</td>
                                    <td className="text-right text-xs p-2">{formatBytes(data.bytesPerSecond)}/s</td>
                                    <td className="text-right text-xs p-2">{data.packetsPerSecond.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile card layout - more compact */}
                <div className="md:hidden">
                    <div className="space-y-2 p-3">
                        {Object.entries(networkData.packetTypes)
                            .sort((a, b) => b[1].bytes - a[1].bytes)
                            .map(([name, data]) => (
                                <div key={name} className="bg-base-100 border border-base-200 rounded-lg p-3 shadow-sm">
                                    <div className="font-mono text-sm font-bold mb-2 text-primary truncate">{name}</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-base-content/70">Bytes</span>
                                            <span className="text-xs font-medium truncate">{formatBytes(data.bytes)}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-base-content/70">Packets</span>
                                            <span className="text-xs font-medium truncate">{data.packets.toLocaleString()}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-base-content/70">Bytes/Sec</span>
                                            <span className="text-xs font-medium truncate">{formatBytes(data.bytesPerSecond)}/s</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-base-content/70">Packets/Sec</span>
                                            <span className="text-xs font-medium truncate">{data.packetsPerSecond.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkAnalytics;