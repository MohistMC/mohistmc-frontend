
import React, {useEffect, useState} from 'react'
import {LuClock, LuFilter, LuX, LuList, LuLayoutGrid, LuShield, LuUsers} from 'react-icons/lu';
import Image from 'next/image'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {API_ENDPOINTS} from "@/lib/api";
import { Resources } from '@/types/resource'
import { loadProducts } from '@/lib/products'
import { loadProject } from '@/lib/projects'
import {loadUser} from "@/lib/users";

// Extend Resources type to include product and project properties
interface ResourceWithDetails extends Resources {
    name?: string;
    author?: string;
    description?: string;
    icon?: string;
    banner?: string;
    link?: string;
    tags?: string[];
    developers?: string[];
}

interface ModListingProps {
    initialMods: Resources[]
}

// Define available versions for specific projects
const projectVersions: Record<string, string> = {
    'mohist': '1.20.1',
    'youer': '1.21.1'
}

// Create Chinese to English mapping
const categoryTranslationMap: Record<string, string> = {
    'All': 'all',
    'Core': 'core',
    'Mod': 'mod',
    'Plugin': 'plugin',
    'Tool': 'tool'
}

// Create English to Chinese mapping
const reverseCategoryTranslationMap: Record<string, string> = {
    'all': 'All',
    'core': 'Core',
    'mod': 'Mod',
    'plugin': 'Plugin',
    'tool': 'Tool'
}

export default function ResourceCard({ initialMods }: ModListingProps) {
    const [mods, setMods] = useState<ResourceWithDetails[]>([])
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['All'])
    const [latestBuilds, setLatestBuilds] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState<'list' | 'card'>('list') // Add view mode state
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    // Define default categories to display
    const defaultCategories = ['All', 'Core', 'Mod', 'Plugin', 'Tool']

    // Get all unique tags as categories
    const getAllCategories = () => {
        const categories = new Set<string>();
        // Use mods instead of initialMods to get all tags
        mods.forEach(mod => {
            mod.tags?.forEach((tag: string) => categories.add(tag));
        });
        return ['All', ...Array.from(categories)];
    };

    const categories = getAllCategories()

    // Define tag color mapping
    const getTagColor = (tagName: string) => {
        const tagColors: Record<string, string> = {
            'Core': 'badge-primary',
            'Mod': 'badge-secondary',
            'Plugin': 'badge-info',
            'Tool': 'badge-success'
        }

        return tagColors[tagName.toLowerCase()] || 'badge-outline text-base-content'
    }

    // Parse categories from URL parameters
    useEffect(() => {
        const categoryParams = searchParams.getAll('cat');
        if (categoryParams.length > 0) {
            const categories = categoryParams.map(cat => {
                return reverseCategoryTranslationMap[cat] || cat;
            });
            const validCategories = categories.filter(cat =>
                defaultCategories.includes(cat) || cat === 'All' ||
                (getAllCategories().includes(cat) && cat !== 'All')
            );
            if (validCategories.length > 0) {
                setSelectedCategories(validCategories);
            }
        }

        // Parse view mode from URL parameters
        const viewParam = searchParams.get('view');
        if (viewParam === 'card') {
            setViewMode('card');
        } else {
            setViewMode('list');
        }
    }, [searchParams]);

    // Get latest build times for core projects
    useEffect(() => {
        const fetchLatestBuilds = async () => {
            setLoading(true)
            const coreMods = mods.filter(mod => mod.tags?.includes('Core'))
            const builds: Record<string, string> = {}

            for (const mod of coreMods) {
                try {
                    const projectName = mod.name?.toLowerCase() || mod.id
                    const version = projectVersions[projectName]

                    if (!version) {
                        continue
                    }

                    const url = `${API_ENDPOINTS.MOHISTMC_API}/project/${projectName}/${version}/builds/latest`

                    const response = await fetch(url)

                    if (!response.ok) {
                        continue
                    }

                    const latestBuild = await response.json()

                    if (latestBuild.build_date) {
                        builds[projectName] = latestBuild.build_date
                    }
                } catch (error) {

                }
            }

            setLatestBuilds(builds)
            setLoading(false)
        }

        fetchLatestBuilds()
    }, [mods])

    // Get resource details
    useEffect(() => {
        const fetchResourceDetails = async () => {
            const updatedMods = await Promise.all(initialMods.map(async (resource) => {
                // For external links and placeholders, return resource data directly
                if (resource.type === 'external' || resource.type === 'placeholder') {
                    return resource as ResourceWithDetails;
                }

                // For product type, get details from products.json
                if (resource.type === 'product') {
                    try {
                        const products = await loadProducts();
                        const product = products[resource.id];
                        if (product) {
                            const author = await loadUser(product.author);
                            const authorName = author ? author.name : "MohistMC";
                            return {
                                ...resource,
                                name: product.name,
                                author: authorName,
                                description: product.introduction,
                                icon: product.icon,
                                banner: product.banner,
                                link: `/resources/${resource.id}`,
                                tags: product.tags,
                                developers: product.developers
                            } as ResourceWithDetails;
                        }
                    } catch (error) {
                        console.error(`Failed to load product data for ${resource.id}:`, error);
                    }
                }

                // For project type, get details from projects folder
                if (resource.type === 'project') {
                    try {
                        const projectData = await loadProject(resource.id);
                        if (projectData) {
                            let authorName = "MohistMC";
                            if (projectData.project.author) {
                                const author = await loadUser(projectData.project.author);
                                if (author) {
                                    authorName = author.name;
                                }
                            } else if (projectData.author) {
                                authorName = projectData.author.name || "MohistMC";
                            }
                            return {
                                ...resource,
                                name: projectData.project.name,
                                author: authorName,
                                description: projectData.project.description,
                                icon: projectData.project.logo,
                                banner: projectData.project.banner,
                                link: `/resources/${resource.id}`,
                                tags: projectData.project.tags,
                                developers: projectData.project.developers
                            } as ResourceWithDetails;
                        }
                    } catch (error) {
                        console.error(`Failed to load project data for ${resource.id}:`, error);
                    }
                }

                // By default, return base resource data
                return {
                    ...resource,
                    name: resource.id,
                    author: "Unknown",
                    description: "No description available",
                    icon: "/img/docs.webp",
                    link: "#",
                    tags: [],
                    developers: []
                } as ResourceWithDetails;
            }));

            setMods(updatedMods);
        };

        fetchResourceDetails();
    }, [initialMods]);

    // Update URL parameters
    const updateUrlParams = (categories: string[], view?: 'list' | 'card') => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('cat')

        if (categories.length === 0 || (categories.length === 1 && categories[0] === 'All')) {
            // Don't add any category parameters
        } else {
            const englishCategories = categories.map(cat =>
                categoryTranslationMap[cat] || cat
            )
            englishCategories.forEach(cat => {
                params.append('cat', cat)
            })
        }

        // Update view mode parameter
        if (view) {
            if (view === 'card') {
                params.set('view', 'card')
            } else {
                params.delete('view')
            }
        } else if (viewMode === 'card') {
            params.set('view', 'card')
        }

        const queryString = params.toString()
        router.push(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false })
    }

    // Handle category selection
    const toggleCategory = (category: string) => {
        let newCategories: string[];

        if (category === 'All') {
            // When clicking "All", only keep "All"
            newCategories = ['All'];
        } else {
            // Handle other category clicks
            if (selectedCategories.includes('All')) {
                // If only "All" was previously selected, now select current category
                newCategories = [category];
            } else if (selectedCategories.includes(category)) {
                // If current category was already selected, remove it
                const filtered = selectedCategories.filter(c => c !== category);
                // If no categories are selected anymore, fallback to "All"
                newCategories = filtered.length > 0 ? filtered : ['All'];
            } else {
                // If current category was not selected, add it
                newCategories = [...selectedCategories, category];
            }
        }

        setSelectedCategories(newCategories);
        updateUrlParams(newCategories);
    };

    // Remove specific category
    const removeCategory = (category: string) => {
        let newCategories: string[]

        if (category === 'All') {
            const otherCategories = selectedCategories.filter(c => c !== 'All')
            newCategories = otherCategories.length > 0 ? otherCategories : ['All']
        } else {
            newCategories = selectedCategories.filter(c => c !== category)
            if (newCategories.length === 0) {
                newCategories = ['All']
            }
        }

        setSelectedCategories(newCategories)
        updateUrlParams(newCategories)
    }

    // Toggle view mode
    const toggleViewMode = (mode: 'list' | 'card') => {
        setViewMode(mode)
        updateUrlParams(selectedCategories, mode)
    }

    // Filter mods based on selected categories
    const filteredMods = selectedCategories.includes('All')
        ? mods
        : mods.filter(mod =>
            mod.tags?.some((tag: string) => selectedCategories.includes(tag))
        );

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Handle card click event
    const handleCardClick = (mod: ResourceWithDetails) => {
        if (mod.link && mod.link !== '#') {
            router.push(mod.link);
        } else {
            router.push(`/resources/${mod.id}`);
        }
    };

    // Prevent copy events
    const handleCopy = (e: React.ClipboardEvent) => {
        e.preventDefault();
    };

    // Prevent selection events
    const handleSelect = (e: React.MouseEvent) => {
        if (window.getSelection) {
            window.getSelection()?.removeAllRanges();
        }
    };

    return (
        <div className="flex flex-col bg-base-100">
            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-3">Resource Center</h1>
                <p className="text-base-content/80 max-w-2xl mx-auto mb-6">
                    Explore our rich Minecraft resource library, including cores, mods, plugins, and more to power your server.
                </p>

                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
                    <div className="bg-base-200 rounded-box p-3">
                        <div className="text-xl font-bold text-primary">{mods.length}</div>
                        <div className="text-xs text-base-content/70">Total Resources</div>
                    </div>
                    <div className="bg-base-200 rounded-box p-3">
                        <div className="text-xl font-bold text-secondary">
                            {mods.filter(mod => mod.tags?.includes('Core')).length}
                        </div>
                        <div className="text-xs text-base-content/70">Cores</div>
                    </div>
                    <div className="bg-base-200 rounded-box p-3">
                        <div className="text-xl font-bold text-accent">
                            {mods.filter(mod => mod.tags?.includes('Mod')).length}
                        </div>
                        <div className="text-xs text-base-content/70">Mods</div>
                    </div>
                    <div className="bg-base-200 rounded-box p-3">
                        <div className="text-xl font-bold text-info">
                            {mods.filter(mod => mod.tags?.includes('Plugin')).length}
                        </div>
                        <div className="text-xs text-base-content/70">Plugins</div>
                    </div>
                </div>
            </div>
            {/* Category filtering area */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-2">
                        <LuFilter className="text-base-content/70" />
                        <span className="text-base-content/80 font-medium">Category Filter:</span>
                    </div>

                    {/* Main category buttons */}
                    <div className="flex flex-wrap gap-2 py-2 px-1">
                        {defaultCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => toggleCategory(category)}
                                className={`btn btn-sm whitespace-nowrap ${
                                    selectedCategories.includes(category)
                                        ? 'btn-primary'
                                        : 'btn-outline'
                                }`}
                            >
                                {category === 'All' ? 'All' : category}
                            </button>
                        ))}

                        {/* More categories dropdown */}
                        {categories.filter(cat => !defaultCategories.includes(cat)).length > 0 && (
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="select select-bordered select-sm flex items-center justify-between gap-2 focus:outline-none focus:ring-2 focus:ring-primary/50 min-w-[100px]"
                                >
                                    <span>More Categories</span>
                                </button>

                                {isDropdownOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setIsDropdownOpen(false)}
                                        />
                                        <div className="absolute z-50 mt-1 w-full min-w-[150px] max-h-60 overflow-auto rounded-box shadow-lg bg-base-100 border border-base-300">
                                            <div className="py-1">
                                                {categories
                                                    .filter(cat => !defaultCategories.includes(cat))
                                                    .map((category) => (
                                                        <button
                                                            key={category}
                                                            onClick={() => {
                                                                toggleCategory(category);
                                                                setIsDropdownOpen(false);
                                                            }}
                                                            className={`flex items-center justify-between w-full text-left px-4 py-2 text-sm ${
                                                                selectedCategories.includes(category)
                                                                    ? "text-primary font-medium"
                                                                    : "text-base-content hover:bg-base-200"
                                                            }`}
                                                        >
                                                            <span>{category}</span>
                                                            {selectedCategories.includes(category) && (
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* View mode toggle buttons */}
                    <div className="flex items-center gap-2 ml-auto">
                        <div className="tooltip tooltip-top" data-tip="List View">
                            <button
                                onClick={() => toggleViewMode('list')}
                                className={`btn btn-sm btn-circle ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
                            >
                                <LuList className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="tooltip tooltip-top" data-tip="Card View">
                            <button
                                onClick={() => toggleViewMode('card')}
                                className={`btn btn-sm btn-circle ${viewMode === 'card' ? 'btn-primary' : 'btn-ghost'}`}
                            >
                                <LuLayoutGrid className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Currently selected categories display */}
                <div className="mt-3 sm:mt-2 flex flex-wrap gap-2">
                    <span className="text-sm text-base-content/70">Current Categories:</span>
                    <div className="flex flex-wrap gap-1.5">
                        {selectedCategories.map(category => (
                            <div
                                key={category}
                                className="badge badge-primary badge-outline flex items-center gap-1 pl-2 pr-1 py-1"
                            >
                                <span>{category === 'All' ? 'All' : category}</span>
                                <button
                                    onClick={() => removeCategory(category)}
                                    className="btn btn-circle btn-xs btn-ghost hover:bg-transparent"
                                >
                                    <LuX className="h-3 w-3 hover:bg-base-100/50 rounded-full p-0.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                <div className="space-y-4">
                    {/* Mod Grid */}
                    <div
                        className={viewMode === 'list'
                            ? "grid grid-cols-1 gap-4"
                            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                        }
                        onCopy={handleCopy}
                    >
                        {filteredMods.map((mod) => (
                            viewMode === 'list' ? (
                                // List view (original style)
                                <div
                                    key={mod.id}
                                    className="card border border-base-300 rounded-box shadow-md p-4 bg-base-200 hover:bg-base-300 transition-colors duration-300 cursor-pointer select-none"
                                    onClick={() => handleCardClick(mod)}
                                    onCopy={handleCopy}
                                    onMouseDown={handleSelect}
                                >
                                    <div className="flex items-center gap-4 mb-4 group">
                                        {/* Icon container */}
                                        <div className="relative h-16 w-16 rounded-box shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex-shrink-0">
                                            <div className="block w-full h-full relative">
                                                <Image
                                                    src={mod.icon || '/img/docs.webp'}
                                                    alt={`${mod.name || mod.id} logo`}
                                                    fill
                                                    sizes="(max-width: 768px) 64px, 64px"
                                                    className="rounded-box transition-transform duration-300 group-hover:scale-105 p-1 select-none"
                                                    draggable={false}
                                                />
                                            </div>
                                        </div>

                                        {/* Text information */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-bold tracking-tight mb-1 text-base-content">
                                                {(mod.name || mod.id)}
                                            </h3>
                                            <div className="text-sm text-base-content/70 leading-snug flex flex-wrap items-center gap-x-3 gap-y-1 min-h-[2rem]">
                                                <div className="flex items-center">
                                                    <LuShield className="h-4 w-4 mr-1 text-primary flex-shrink-0" />
                                                    <span className="transition-colors text-info">
                                                        {mod.id === 'mohist' && mod.author === 'Mgazul' ? 'TT' : (mod.author || 'Unknown')}
                                                    </span>
                                                </div>

                                                {mod.developers && mod.developers.length > 0 && (
                                                    <div className="flex items-center">
                                                        <LuUsers className="h-4 w-4 mr-1 text-secondary flex-shrink-0" />
                                                        <span className="truncate">
                                                            {mod.developers.join(', ')}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm mb-4 text-base-content/80">
                                            {mod.description || 'No description available'}
                                        </p>
                                        {/* Optimized layout code */}
                                        <div className="flex flex-col sm:flex-row sm:flex-nowrap justify-between items-start sm:items-center gap-3">
                                            {/* Tag container */}
                                            <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                                                {mod.tags?.map((tag: string, index) => (
                                                    <div
                                                        key={tag}
                                                        className={`
                                                          badge ${getTagColor(tag)} badge-outline
                                                          px-2 py-0.5
                                                          text-xs
                                                          font-medium
                                                          rounded-lg
                                                          whitespace-nowrap
                                                        `}
                                                        style={{
                                                            animationDelay: `${index * 50}ms`,
                                                        }}
                                                    >
                                                        #{tag}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Update time - Add link functionality */}
                                            <div className="flex-shrink-0 w-full sm:w-auto">
                                                <div className="flex items-center text-xs px-2.5 py-1 rounded-full border border-base-300 bg-base-100 w-full sm:w-auto justify-center hover:bg-base-200 transition-colors duration-200">
                                                    <LuClock
                                                        size={14}
                                                        className="mr-1.5 text-primary flex-shrink-0"
                                                    />
                                                    <span className="ml-1 font-mono text-base-content text-sm font-medium whitespace-nowrap">
                                                        {loading
                                                            ? <span className="loading loading-spinner loading-xs"></span>
                                                            : latestBuilds.hasOwnProperty(mod.name?.toLowerCase() || mod.id)
                                                                ? latestBuilds[mod.name?.toLowerCase() || mod.id]
                                                                    ? new Date(latestBuilds[mod.name?.toLowerCase() || mod.id]).toLocaleDateString('en-US')
                                                                    : <span className="text-warning text-xs">Coming Soon</span>
                                                                : <span className="text-warning text-xs">Coming Soon</span>}
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Card view (new style)
                                <div
                                    key={mod.id}
                                    className="card card-compact bg-base-200 border border-base-300 rounded-box shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer select-none h-full relative"
                                    onClick={() => handleCardClick(mod)}
                                    onCopy={handleCopy}
                                    onMouseDown={handleSelect}
                                >
                                    <figure className="px-4 pt-4">
                                        <div className="relative h-32 w-full rounded-box overflow-hidden">
                                            <div className="relative w-full h-full"> {/* 1:1 aspect ratio container */}
                                                <Image
                                                    src={mod.banner || '/img/docs.webp'}
                                                    alt={`${mod.name || mod.id} logo`}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-cover rounded-box"
                                                    draggable={false}
                                                />
                                            </div>
                                        </div>
                                    </figure>
                                    <div className="card-body pt-2">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="relative w-16 h-16 rounded-box bg-base-200 border-2 border-base-300 shadow-md overflow-hidden -mt-8 flex-shrink-0">
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={mod.icon || '/img/docs.webp'}
                                                        alt={`${mod.name || mod.id} icon`}
                                                        fill
                                                        sizes="48px"
                                                        className="object-contain p-1"
                                                        draggable={false}
                                                    />
                                                </div>
                                            </div>
                                            <h2 className="text-xl font-bold text-base-content truncate">
                                                {mod.name || mod.id}
                                            </h2>
                                            <div className="text-xs text-base-content/70 leading-snug flex flex-wrap items-center gap-x-3 gap-y-1 min-h-[2rem]">
                                                <div className="flex items-center">
                                                    <LuShield className="h-4 w-4 mr-1 text-primary flex-shrink-0" />
                                                    <span className="transition-colors text-info">
                                                        {mod.id === 'mohist' && mod.author === 'Mgazul' ? 'TT' : (mod.author || 'Unknown')}
                                                    </span>
                                                </div>

                                                {mod.developers && mod.developers.length > 0 && (
                                                    <div className="flex items-center">
                                                        <LuUsers className="h-4 w-4 mr-1 text-secondary flex-shrink-0" />
                                                        <span className="truncate">
                                                            {mod.developers.join(', ')}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm text-base-content/70 line-clamp-2">
                                            {mod.description || 'No description available'}
                                        </p>
                                        <div className="card-actions justify-between items-center mt-2">
                                            <div className="flex flex-wrap gap-1">
                                                {mod.tags?.slice(0, 2).map((tag: string) => (
                                                    <div
                                                        key={tag}
                                                        className={`
                                                          badge ${getTagColor(tag)} badge-outline
                                                          px-2 py-0.5
                                                          text-xs
                                                          font-medium
                                                          rounded-lg
                                                          whitespace-nowrap
                                                        `}
                                                    >
                                                        #{tag}
                                                    </div>
                                                ))}
                                                {mod.tags && mod.tags.length > 2 && (
                                                    <div className="badge badge-outline text-xs">
                                                        +{mod.tags.length - 2}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-xs text-base-content/50 whitespace-nowrap">
                                                {loading ? (
                                                    <span className="loading loading-spinner loading-xs"></span>
                                                ) : latestBuilds.hasOwnProperty(mod.name?.toLowerCase() || mod.id) ? (
                                                    latestBuilds[mod.name?.toLowerCase() || mod.id] ? (
                                                        new Date(latestBuilds[mod.name?.toLowerCase() || mod.id]).toLocaleDateString('en-US')
                                                    ) : (
                                                        <span className="text-warning">Coming Soon</span>
                                                    )
                                                ) : (
                                                    <span className="text-warning">Coming Soon</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}

                        {/* No results prompt */}
                        {filteredMods.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-base-content/50 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-base-content/70 mb-2">No Resources Found</h3>
                                <p className="text-base-content/50">Try selecting different categories or view all resources</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategories(['All'])
                                        updateUrlParams(['All'])
                                    }}
                                    className="btn btn-primary btn-sm mt-4"
                                >
                                    View All Resources
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}