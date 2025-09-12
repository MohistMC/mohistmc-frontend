
"use client";

import {CSSProperties, useEffect, useState, useRef} from 'react';
import Link from "next/link";
import {FaTachometerAlt} from "react-icons/fa";

interface CountryData {
    name: string;
    y: number;
}

// Animation counter component
const AnimatedCounter = ({ value, duration = 1000 }: { value: number; duration?: number }) => {
    const [currentValue, setCurrentValue] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const startTime = useRef<number | null>(null);

    useEffect(() => {
        if (value === 0) {
            setCurrentValue(0);
            return;
        }

        const animate = (timestamp: number) => {
            if (!startTime.current) startTime.current = timestamp;
            const elapsed = timestamp - startTime.current;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const newValue = Math.floor(easeOutQuart * value);

            setCurrentValue(newValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        startTime.current = null;
        requestAnimationFrame(animate);
    }, [value, duration]);

    return <span ref={ref}>{currentValue}</span>;
};

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
                Global Statistics
            </h1>
            {/* 参考代码样式添加的统计部分 */}
            <section className="pb-20 pt-10 flex flex-col justify-center items-center">
                <dl className="bg-base-200 mr-5 ml-5 py-10 md:mr-0 md:ml-0 grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-base-content sm:grid-cols-3 xl:grid-cols-6 rounded-xl sm:p-8">
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">
                            {isLoading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <AnimatedCounter value={completedTasks} />
                            )}
                        </dt>
                        <dd className="text-base-content/70 text-center">
                            Bugs resolved
                        </dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">
                            {isLoading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <AnimatedCounter value={pendingTasks} />
                            )}
                        </dt>
                        <dd className="text-base-content/70 text-center">
                            Issues opened
                        </dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">
                            {isLoading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <AnimatedCounter value={downloadCount} />
                            )}
                        </dt>
                        <dd className="text-base-content/70 text-center">
                            Downloads
                        </dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">
                            {isLoading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <AnimatedCounter value={playerCount} />
                            )}
                            +
                        </dt>
                        <dd className="text-base-content/70 text-center">
                            Players
                        </dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">
                            {isLoading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <AnimatedCounter value={serverCount} />
                            )}
                            +
                        </dt>
                        <dd className="text-base-content/70 text-center">
                            Servers
                        </dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">
                            {isLoading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <AnimatedCounter value={totalCountries} />
                            )}
                            +
                        </dt>
                        <dd className="text-base-content/70 text-center">
                            Countries
                        </dd>
                    </div>
                </dl>
            </section>
        </div>
    );
};

export default CuteDashboard;