"use client";

import {CSSProperties, useEffect, useState} from 'react';
import Link from "next/link";
import {FaTachometerAlt} from "react-icons/fa";

interface CountryData {
    name: string;
    y: number;
}

const CuteDashboard = () => {
    const [serverCount, setServerCount] = useState<number>(0);
    const [playerCount, setPlayerCount] = useState<number>(0);
    const [countryData, setCountryData] = useState<CountryData[]>([]);
    const [downloadCount, setDownloadCount] = useState<number>(0);
    const [pendingTasks, setPendingTasks] = useState<number>(0);
    const [completedTasks, setCompletedTasks] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // 获取服务器数量数据
    const fetchServerCount = async (): Promise<void> => {
        try {
            const cacheKey = 'dashboard_server_data';
            const cachedData = localStorage.getItem(cacheKey);
            const now = Date.now();

            // 检查缓存是否存在且未过期（10分钟内）
            if (cachedData) {
                const { timestamp, data } = JSON.parse(cachedData);
                if (now - timestamp < 600000) { // 10分钟 = 600000毫秒
                    setServerCount(data);
                    return;
                }
            }

            const response = await fetch('https://bstats.org/api/v1/plugins/6762/charts/servers/data?maxElements=1');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // 假设数据格式为 [[timestamp, count], ...]
            // 取最后一个数据点的count值
            const lastDataPoint = data[data.length - 1];
            const serverCount = lastDataPoint[1];

            // 保存到缓存
            localStorage.setItem(cacheKey, JSON.stringify({
                timestamp: now,
                data: serverCount
            }));

            setServerCount(serverCount);
        } catch (err) {
            console.error("获取服务器数量失败:", err);
        }
    };

    // 模拟玩家数量获取
    const fetchPlayerCount = async (): Promise<void> => {
        try {
            const cacheKey = 'dashboard_player_data';
            const cachedData = localStorage.getItem(cacheKey);
            const now = Date.now();

            // 检查缓存是否存在且未过期（10分钟内）
            if (cachedData) {
                const { timestamp, data } = JSON.parse(cachedData);
                if (now - timestamp < 600000) { // 10分钟 = 600000毫秒
                    setPlayerCount(data);
                    return;
                }
            }

            const response = await fetch('https://bstats.org/api/v1/plugins/6762/charts/players/data?maxElements=1');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // 假设数据格式为 [[timestamp, count], ...]
            // 取最后一个数据点的count值
            const lastDataPoint = data[data.length - 1];
            const playerCount = lastDataPoint[1];

            // 保存到缓存
            localStorage.setItem(cacheKey, JSON.stringify({
                timestamp: now,
                data: playerCount
            }));

            setPlayerCount(playerCount);
        } catch (err) {
            console.error("获取玩家数量失败:", err);
        }
    };

    // 获取国家数据
    const fetchCountryData = async (): Promise<boolean> => {
        try {
            const cacheKey = 'dashboard_country_data';
            const cachedData = localStorage.getItem(cacheKey);
            const now = Date.now();

            // 检查缓存是否存在且未过期（10分钟内）
            if (cachedData) {
                const { timestamp, data } = JSON.parse(cachedData);
                if (now - timestamp < 600000) { // 10分钟 = 600000毫秒
                    setCountryData(data);
                    return true;
                }
            }

            const response = await fetch('https://bstats.org/api/v1/plugins/6762/charts/location/data');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();

            // 找到中国数据，如果不存在则初始化
            let chinaData = data.find((country: CountryData) => country.name === "China") || { name: "China", y: 0 };

            // 过滤掉台湾数据，并将其 y 值累加到中国
            const processedData = data.filter((country: CountryData) => {
                if (country.name === "Taiwan") {
                    chinaData.y += country.y; // 将台湾的 y 值累加到中国
                    return false; // 过滤掉台湾数据
                }
                return true; // 保留其他数据
            });

            // 确保中国数据在 processedData 中
            const chinaIndex = processedData.findIndex((country: CountryData) => country.name === "China");
            if (chinaIndex !== -1) {
                processedData[chinaIndex] = chinaData; // 更新中国数据
            } else {
                processedData.push(chinaData); // 如果中国不存在，则添加
            }

            // 保存到缓存
            localStorage.setItem(cacheKey, JSON.stringify({
                timestamp: now,
                data: processedData
            }));

            setCountryData(processedData);
            return true;
        } catch (err) {
            console.error("获取国家数据失败:", err);
            return false;
        }
    };

    const fetchDownloadCount = async (): Promise<void> => {
        try {
            const cacheKey = 'dashboard_download_data';
            const cachedData = localStorage.getItem(cacheKey);
            const now = Date.now();

            // 检查缓存是否存在且未过期（10分钟内）
            if (cachedData) {
                const { timestamp, data } = JSON.parse(cachedData);
                if (now - timestamp < 600000) { // 10分钟 = 600000毫秒
                    setDownloadCount(data);
                    return;
                }
            }

            // 缓存过期或不存在，重新获取数据
            const [response1, response2] = await Promise.all([
                fetch('https://api.mohistmc.cn/stats/all'),
                fetch('https://api.mohistmc.com/stats/all')
            ]);

            if (!response1.ok) {
                throw new Error(`HTTP error! status: ${response1.status}`);
            }

            if (!response2.ok) {
                throw new Error(`HTTP error! status: ${response2.status}`);
            }

            const data1 = await response1.json();
            const data2 = await response2.json();

            // 相加两个API的下载数
            const totalDownloads = 582886 + data1.downloads + data2.downloads;

            // 保存到缓存
            localStorage.setItem(cacheKey, JSON.stringify({
                timestamp: now,
                data: totalDownloads
            }));

            setDownloadCount(totalDownloads);
        } catch (err) {
            console.error("获取下载数量失败:", err);
        }
    };

    // 获取任务数据
    const fetchTaskData = async (): Promise<void> => {
        try {
            const cacheKey = 'dashboard_task_data';
            const cachedData = localStorage.getItem(cacheKey);
            const now = Date.now();

            // 检查缓存是否存在且未过期（10分钟内）
            if (cachedData) {
                const { timestamp, data } = JSON.parse(cachedData);
                if (now - timestamp < 600000) { // 10分钟 = 600000毫秒
                    setPendingTasks(data.pendingTasks);
                    setCompletedTasks(data.completedTasks);
                    return;
                }
            }

            // 缓存过期或不存在，重新获取数据
            const response = await fetch('https://api.mohistmc.com/stats/all');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            const pending = data.github.open_issues_count;
            const completed = data.github.closed_issues_count;

            // 保存到缓存
            localStorage.setItem(cacheKey, JSON.stringify({
                timestamp: now,
                data: {
                    pendingTasks: pending,
                    completedTasks: completed
                }
            }));

            setPendingTasks(pending);
            setCompletedTasks(completed);
        } catch (err) {
            console.error("获取任务数据失败:", err);
        }
    };

    // 数据获取函数
    const fetchData = async (): Promise<void> => {
        setIsLoading(true);
        try {
            await Promise.all([
                fetchServerCount(),
                fetchPlayerCount(),
                fetchCountryData(),
                fetchDownloadCount(),
                fetchTaskData()
            ]);
        } catch (err) {
            console.error("数据获取失败:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 600000); // 每10分钟刷新一次

        return () => clearInterval(interval);
    }, []);

    // 计算国家统计数据
    const totalCountries = countryData.length;
    const topCountries = [...countryData]
        .sort((a, b) => b.y - a.y)
        .slice(0, 5)
        .map(country => `${country.name} (${country.y})`);

    // 国家分布可视化 - 简单的点状图
    const renderCountryDots = () => {
        const sortedCountryData = [...countryData].sort((a, b) => b.y - a.y); // 从大到小排序

        return (
            <div className="flex flex-wrap justify-start gap-1 items-center pt-4"> {/* 左对齐排列 */}
                {sortedCountryData.slice(5).map((country, index) => ( // 从第 6 个数据开始取，最多取到第 15 个
                    <div
                        key={index}
                        className="tooltip tooltip-bottom"
                        data-tip={`${country.name}: ${country.y}`}
                    >
                        <div
                            className="rounded-full bg-accent/40 opacity-80 hover:opacity-100 hover:scale-125 transition-all"
                            style={{
                                width: '8px',
                                height: '8px'
                            }}
                        ></div>
                    </div>
                ))}
            </div>
        );
    };


    const progressStyle: CSSProperties = {
        // @ts-ignore
        '--value': (serverCount / 10000) * 100,
        '--size': '3.5rem',
    };

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto mb-28 bg-base-100 text-base-content">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 flex items-center justify-center">
                <Link
                    href="https://bstats.org/plugin/server-implementation/Mohist/6762"
                    target="_blank"
                    className="group relative"
                    title="View real-time detailed data"
                    aria-label="Server monitoring data details"
                >
                    <FaTachometerAlt className="h-6 w-6 md:h-8 md:w-8 mr-2 text-primary group-hover:text-secondary transition-colors cursor-pointer transform group-hover:rotate-12 duration-300" />
                </Link>
                Global server monitoring board
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 select-none">
                {/* 服务器数量卡片 */}
                <div
                    className="card bg-base-200 border-2 border-base-300 shadow-lg flex flex-col h-full">
                    <div className="card-body flex flex-col flex-grow p-4 md:p-6">
                        <div className="flex items-center">
                            <div className="bg-primary/20 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-primary"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
                                </svg>
                            </div>
                            <div>
                                <h2 className="card-title text-base-content text-lg md:text-xl">Servers</h2>
                            </div>
                        </div>
                        <div className="mt-3 md:mt-4">
                            {isLoading ? (
                                <div className="flex justify-center">
                                    <span className="loading loading-spinner loading-md md:loading-lg text-primary"></span>
                                </div>
                            ) : (
                                <p className="text-4xl md:text-5xl font-bold text-primary text-center">
                                    {serverCount}
                                </p>
                            )}
                        </div>
                        {/* 新增服务器装饰元素 */}
                        <div className="flex justify-center my-3 md:my-4">
                            <div className="relative h-12 md:h-16 w-full max-w-[120px] md:max-w-xs">
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 md:w-24 h-6 md:h-8 bg-primary/20 rounded-box opacity-30"></div>
                                <div className="absolute bottom-1 md:bottom-2 left-1/2 transform -translate-x-1/2 w-14 md:w-20 h-8 md:h-10 bg-primary/30 rounded-box opacity-40"></div>
                                <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 w-12 md:w-16 h-10 md:h-12 bg-primary/40 rounded-box opacity-50 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 md:h-6 w-4 md:w-6 text-primary/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                    </svg>
                                </div>
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl md:text-4xl opacity-20">
                                    🖥️
                                </div>
                            </div>
                        </div>
                        {/* 将这部分移到卡片底部 */}
                        <div className="mt-auto pt-3 md:pt-4">
                            <div className="radial-progress text-primary mx-auto" style={progressStyle}>
                                {Math.round((serverCount / 10000) * 100)}%
                            </div>
                            <p className="text-xs text-base-content/60 mt-1 md:mt-2 text-center">Server capacity utilization</p>
                        </div>
                    </div>
                </div>

                {/* 玩家数量卡片 - 修改布局使进度条靠底 */}
                <div
                    className="card bg-base-200 border-2 border-base-300 shadow-lg flex flex-col h-full">
                    <div className="card-body flex flex-col flex-grow p-4 md:p-6">
                        <div className="flex items-center">
                            <div className="bg-secondary/20 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-secondary" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                                </svg>
                            </div>
                            <div>
                                <h2 className="card-title text-base-content text-lg md:text-xl">Players</h2>
                            </div>
                        </div>
                        <div className="mt-3 md:mt-4">
                            {isLoading ? (
                                <div className="flex justify-center">
                                    <span className="loading loading-spinner loading-md md:loading-lg text-secondary"></span>
                                </div>
                            ) : (
                                <p className="text-4xl md:text-5xl font-bold text-secondary text-center">
                                    {playerCount}
                                </p>
                            )}
                        </div>

                        {/* 玩家装饰元素 */}
                        <div className="flex justify-center my-3 md:my-4 select-none">
                            <div className="relative w-full max-w-[120px] md:max-w-xs">
                                {/* 几个人在游玩的图标 */}
                                <div className="flex items-center justify-center space-x-1 md:space-x-2">
                                    <div className="text-2xl md:text-4xl animate-bounce">👨‍💻</div>
                                    <div className="text-2xl md:text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>👩‍🎤</div>
                                    <div className="text-2xl md:text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>👩‍💻</div>
                                </div>
                            </div>
                        </div>
                        {/* 将这部分移到卡片底部 */}
                        <div className="mt-auto pt-3 md:pt-4">
                            <div className="flex items-center justify-center">
                                <span className={`text-xl md:text-2xl mr-1 md:mr-2`}>
                                  {playerCount > 8000 ? '🔥' : '🌟'}
                                </span>
                                <span className="text-xs md:text-sm text-base-content/70">
                                  {playerCount > 800 ? 'Busy servers！' : 'Status: OK'}
                                </span>
                            </div>
                            <progress
                                className="progress progress-secondary w-full mt-1 md:mt-2"
                                value={playerCount}
                                max="8000"
                            ></progress>
                            <p className="text-xs text-base-content/60 mt-1 text-center">System Load: {Math.round((playerCount / 8000) * 100)}%</p>
                        </div>
                    </div>
                </div>

                {/* 新增统计卡片 - 显示下载数和问题解决情况 */}
                <div className="card bg-base-200 border-2 border-base-300 shadow-lg flex flex-col h-full">
                    <div className="card-body flex flex-col flex-grow p-4 md:p-6">
                        <div className="flex items-center">
                            <div className="bg-info/20 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-info" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                            </div>
                            <div>
                                <h2 className="card-title text-base-content text-lg md:text-xl">Statistics</h2>
                            </div>
                        </div>

                        <div className="mt-3 md:mt-4 grid grid-cols-1 gap-3 md:gap-4">
                            {isLoading ? (
                                <div className="flex justify-center">
                                    <span className="loading loading-spinner loading-md md:loading-lg text-info"></span>
                                </div>
                            ) : (
                                <>
                                    <div className="text-center p-2 md:p-3 bg-info/10 rounded-box">
                                        <p className="text-2xl md:text-3xl font-bold text-info">
                                            {downloadCount.toLocaleString()}
                                        </p>
                                        <p className="text-xs md:text-sm text-base-content/70">TotalDownloads</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="text-center p-2 md:p-3 bg-warning/10 rounded-box">
                                            <p className="text-xl md:text-2xl font-bold text-warning">
                                                {pendingTasks}
                                            </p>
                                            <p className="text-[0.6rem] md:text-xs text-base-content/70">Issues opened</p>
                                        </div>

                                        <div className="text-center p-2 md:p-3 bg-success/10 rounded-box">
                                            <p className="text-xl md:text-2xl font-bold text-success">
                                                {completedTasks}
                                            </p>
                                            <p className="text-[0.6rem] md:text-xs text-base-content/70">Bugs resolved</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="mt-auto pt-3 md:pt-4">
                            <div className="flex justify-center space-x-4 md:space-x-6">
                                <div className="flex flex-col items-center">
                                    <div className="p-1.5 md:p-2 bg-info/20 rounded-full mb-0.5 md:mb-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </div>
                                    <span className="text-[0.6rem] md:text-xs text-base-content/60">Download</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="p-1.5 md:p-2 bg-warning/20 rounded-full mb-0.5 md:mb-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-[0.6rem] md:text-xs text-base-content/60">Opened</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="p-1.5 md:p-2 bg-success/20 rounded-full mb-0.5 md:mb-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-[0.6rem] md:text-xs text-base-content/60">Resolved</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* 国家分布卡片 */}
                <div className="card bg-base-200 border-2 border-base-300 shadow-lg">
                    <div className="card-body p-4 md:p-6">
                        <div className="flex items-center">
                            <div className="bg-accent/20 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-accent" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <div>
                                <h2 className="card-title text-base-content text-lg md:text-xl">Countries</h2>
                            </div>
                        </div>
                        <div className="mt-3 md:mt-4">
                            {isLoading ? (
                                <div className="flex justify-center">
                                    <span className="loading loading-spinner loading-md md:loading-lg text-accent"></span>
                                </div>
                            ) : (
                                <p className="text-4xl md:text-5xl font-bold text-accent text-center">
                                    {totalCountries}
                                </p>
                            )}
                        </div>
                        <div className="mt-3 md:mt-4">
                            <div className="text-xs md:text-sm text-base-content/80">
                                <p className="font-semibold">Top Server by Country:</p>
                                <ul className="list-disc list-inside text-xs md:text-sm">
                                    {topCountries.map((nameWithY, i) => {
                                        // 提取国家名（去掉 "(y)" 部分）
                                        const countryName = nameWithY.split(" (")[0];
                                        // 翻译国家名
                                        // 返回翻译后的完整字符串
                                        return <li key={i} className="truncate">{nameWithY.replace(countryName, countryName)}</li>;
                                    })}
                                </ul>
                            </div>
                            {renderCountryDots()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CuteDashboard;
