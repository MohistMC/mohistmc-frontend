"use client"

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ColorGroup, ColorItem } from '@/types/chinese-colors';
import cfsColors from '@/lib/cfs-color';

// 定义数据源类型
type DataSource = 'main' | 'cfs';

interface CfsColorGroup {
    title: string;
    list: {
        name: string;
        hex: string;
    }[];
}

export default function ChineseColorsContent() {
    const [selectedColor, setSelectedColor] = useState<ColorItem | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
    const [chineseColors, setChineseColors] = useState<ColorGroup[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dataSource, setDataSource] = useState<DataSource>('main');
    const [searchQuery, setSearchQuery] = useState(''); // 添加搜索状态
    const [copied, setCopied] = useState(false); // 添加复制状态

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // 根据数据源准备颜色数据
    const [currentColors, totalColors] = useMemo(() => {
        let colors: ColorGroup[] = [];
        let total = 0;

        if (dataSource === 'main' && chineseColors) {
            colors = chineseColors;
            total = chineseColors.reduce((sum, group) => sum + group.colors.length, 0);
        } else if (dataSource === 'cfs') {
            // 转换cfs数据格式
            colors = cfsColors.map((group: CfsColorGroup, index: number) => ({
                id: index,
                name: group.title,
                hex: group.list[0]?.hex || '#000000',
                RGB: [0, 0, 0],
                colors: group.list.map((color, i) => ({
                    id: `${index}-${i}`,
                    name: color.name,
                    hex: color.hex,
                    intro: ''
                }))
            }));
            total = cfsColors.reduce((sum, group) => sum + group.list.length, 0);
        }

        return [colors, total];
    }, [dataSource, chineseColors]);

    // 过滤颜色基于搜索查询和分组
    const filteredColors = useMemo(() => {
        let colors: ColorItem[] = [];

        if (selectedGroup !== null && currentColors[selectedGroup]) {
            colors = currentColors[selectedGroup].colors;
        } else {
            colors = currentColors.flatMap(group => group.colors);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return colors.filter(color =>
                color.name.toLowerCase().includes(query) ||
                color.hex.toLowerCase().includes(query) ||
                (color.intro && color.intro.toLowerCase().includes(query))
            );
        }

        return colors;
    }, [currentColors, selectedGroup, searchQuery]);

    // 从URL参数初始化状态
    useEffect(() => {
        const source = searchParams.get('source') as DataSource || 'main';
        const group = searchParams.get('group');
        const colorId = searchParams.get('color');
        const search = searchParams.get('search') || '';

        if (source === 'main' || source === 'cfs') {
            setDataSource(source);
        }

        if (group !== null) {
            setSelectedGroup(parseInt(group, 10));
        } else {
            setSelectedGroup(null);
        }

        setSearchQuery(search);

        // 查找并设置选中的颜色
        if (colorId && chineseColors) {
            let foundColor = null;

            if (source === 'main') {
                for (const group of chineseColors) {
                    const color = group.colors.find(c => c.id === colorId);
                    if (color) {
                        foundColor = color;
                        break;
                    }
                }
            } else {
                // 处理CFS数据
                for (let groupIndex = 0; groupIndex < cfsColors.length; groupIndex++) {
                    const group = cfsColors[groupIndex];
                    for (let colorIndex = 0; colorIndex < group.list.length; colorIndex++) {
                        const color = group.list[colorIndex];
                        const colorIdToCheck = `${groupIndex}-${colorIndex}`;
                        if (colorIdToCheck === colorId) {
                            foundColor = {
                                id: colorId,
                                name: color.name,
                                hex: color.hex,
                                intro: ''
                            };
                            break;
                        }
                    }
                    if (foundColor) break;
                }
            }

            if (foundColor) {
                setSelectedColor(foundColor);
            }
        }
    }, [searchParams, chineseColors]);

    useEffect(() => {
        const fetchColors = async () => {
            try {
                setLoading(true);
                const response = await fetch('/json/chinese-colors-in.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch color data');
                }
                const data: ColorGroup[] = await response.json();
                setChineseColors(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                console.error('Error fetching color data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchColors();
    }, []);

    const handleColorClick = (color: ColorItem) => {
        setSelectedColor(color);

        // 更新URL参数
        const params = new URLSearchParams(searchParams.toString());
        params.set('color', color.id);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleGroupSelect = (groupId: number | null) => {
        setSelectedGroup(groupId);
        setSelectedColor(null);

        // 更新URL参数
        const params = new URLSearchParams(searchParams.toString());
        if (groupId !== null) {
            params.set('group', groupId.toString());
        } else {
            params.delete('group');
        }
        params.delete('color'); // 切换分组时清除选中的颜色
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // 切换数据源
    const handleDataSourceChange = (source: DataSource) => {
        setDataSource(source);
        setSelectedGroup(null);
        setSelectedColor(null);
        setSearchQuery(''); // 切换数据源时清空搜索

        // 更新URL参数
        const params = new URLSearchParams(searchParams.toString());
        params.set('source', source);
        params.delete('group');
        params.delete('color');
        params.delete('search');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // 处理搜索输入
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        // 更新URL参数
        const params = new URLSearchParams(searchParams.toString());
        if (query) {
            params.set('search', query);
        } else {
            params.delete('search');
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // 清空搜索
    const clearSearch = () => {
        setSearchQuery('');

        // 更新URL参数
        const params = new URLSearchParams(searchParams.toString());
        params.delete('search');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // 复制HEX到剪贴板
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // 2秒后重置复制状态
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-4">加载颜色数据中...</p>
                </div>
            </div>
        );
    }

    if (error || !chineseColors) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-error">加载失败</h2>
                    <p className="mt-2">{error || '无法加载颜色数据'}</p>
                    <button
                        className="btn btn-primary mt-4"
                        onClick={() => window.location.reload()}
                    >
                        重新加载
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">
                        中国传统颜色
                        <span className="text-2xl font-normal ml-2">
                            ({totalColors}种)
                        </span>
                    </h1>
                </header>

                {/* 数据源切换 */ }
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        className={`btn ${dataSource === 'main' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => handleDataSourceChange('main')}
                    >
                        主要颜色库 ({chineseColors.reduce((sum, group) => sum + group.colors.length, 0)}种)
                    </button>
                    <button
                        className={`btn ${dataSource === 'cfs' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => handleDataSourceChange('cfs')}
                    >
                        CFS颜色库 ({cfsColors.reduce((sum, group) => sum + group.list.length, 0)}种)
                    </button>
                </div>

                {/* 搜索框 */ }
                <div className="flex justify-center mb-6">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="搜索颜色名称或HEX值..."
                            className="input input-bordered w-full pr-10"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        {searchQuery && (
                            <button
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 btn btn-sm btn-circle btn-ghost"
                                onClick={clearSearch}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* 颜色分类导航 */ }
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    <button
                        className={`btn ${selectedGroup === null ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => handleGroupSelect(null)}
                    >
                        全部颜色 ({filteredColors.length})
                    </button>
                    {currentColors.map((group) => (
                        <button
                            key={group.id}
                            className={`btn ${selectedGroup === group.id ? 'btn-primary' : 'btn-outline'}`}
                            style={{ borderColor: group.hex }}
                            onClick={() => handleGroupSelect(group.id)}
                        >
                            <span className="mr-2">{group.name}</span>
                            <div
                                className="w-4 h-4 rounded-full border border-gray-300 mr-2"
                                style={{ backgroundColor: group.hex }}
                            ></div>
                            <span>({group.colors.length})</span>
                        </button>
                    ))}
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* 颜色列表 */ }
                    <div className="lg:w-2/3">
                        {filteredColors.length === 0 ? (
                            <div className="text-center py-12">
                                <h3 className="text-xl font-bold mb-2">未找到匹配的颜色</h3>
                                <p>尝试使用不同的关键词搜索</p>
                                <button
                                    className="btn btn-primary mt-4"
                                    onClick={clearSearch}
                                >
                                    清空搜索
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {filteredColors.map((color) => (
                                    <div
                                        key={color.id}
                                        className={`card bg-base-100 shadow-xl cursor-pointer hover:scale-105 transition-transform ${selectedColor?.id === color.id ? 'ring-4 ring-primary' : ''}`}
                                        onClick={() => handleColorClick(color)}
                                    >
                                        <div
                                            className="h-32 rounded-t-xl"
                                            style={{ backgroundColor: color.hex }}
                                        ></div>
                                        <div className="card-body p-4">
                                            <h3 className="card-title text-sm">{color.name}</h3>
                                            {color.intro && (
                                                <p className="text-xs opacity-70 line-clamp-2">{color.intro}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 颜色详情面板 */ }
                    <div className="lg:w-1/3">
                        <div className="sticky top-8">
                            {selectedColor ? (
                                <div className="card bg-base-100 shadow-xl">
                                    <div
                                        className="h-48 rounded-t-xl"
                                        style={{ backgroundColor: selectedColor.hex }}
                                    ></div>
                                    <div className="card-body">
                                        <h2 className="card-title text-2xl">{selectedColor.name}</h2>
                                        {selectedColor.intro ? (
                                            <p className="py-2">{selectedColor.intro}</p>
                                        ) : (
                                            <p className="py-2 text-gray-500">暂无描述</p>
                                        )}
                                        <div className="flex items-center justify-between mt-4">
                                            <span>HEX:</span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono badge badge-lg">{selectedColor.hex}</span>
                                                <button
                                                    className={`btn btn-sm ${copied ? 'btn-success' : 'btn-ghost'}`}
                                                    onClick={() => copyToClipboard(selectedColor.hex)}
                                                >
                                                    {copied ? '✓ 已复制' : '复制'}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>ID:</span>
                                            <span className="font-mono badge badge-lg">{selectedColor.id}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="card bg-base-100 shadow-xl">
                                    <div className="card-body text-center py-12">
                                        <h2 className="text-xl font-bold mb-2">中国传统颜色</h2>
                                        <p>点击任一颜色查看详细信息</p>
                                        <div className="mt-4 text-sm text-gray-500">
                                            当前显示: {filteredColors.length} 种颜色
                                        </div>
                                        <div className="mt-2 text-sm text-gray-500">
                                            数据源: {dataSource === 'main' ? '主要颜色库' : 'CFS颜色库'}
                                        </div>
                                        {searchQuery && (
                                            <div className="mt-2 text-sm text-gray-500">
                                                搜索关键词: "{searchQuery}"
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
