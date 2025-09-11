
// src/app/tools/menu-edit/page.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import * as yaml from 'js-yaml';
import MaterialSelector from '@/components/menu-edit/MaterialSelector';
import MenuSettingsEditForm from '@/components/menu-edit/MenuSettingsEditForm';
import ItemEditForm from '@/components/menu-edit/ItemEditForm';
import ColorCodeReference from '@/components/menu-edit/ColorCodeReference';
import MenuGrid from '@/components/menu-edit/MenuGrid';
import ItemDetails from '@/components/menu-edit/ItemDetails';

// Define TypeScript types
type MenuSetting = {
    name: string;
    rows: number;
    "open-actions"?: string[];
    filename?: string;
};

type MenuItem = {
    MATERIAL: string;
    "POSITION-X": number;
    "POSITION-Y": number;
    NAME: string;
    LORE?: string[];
    ACTIONS?: string[];
    DURABILITY?: number;
    ENCHANTMENTS?: string[];
    ITEMFLAG?: string[];
    AMOUNT?: number;
    "KEEP-OPEN"?: boolean;
    PERMISSION?: string;
    "PERMISSION-MESSAGE"?: string;
    CUSTOMMODELDATA?: number;
    "HIDE-TOOLTIP"?: boolean;
    "BASE64"?: string;
};

export type MenuConfig = Record<string, MenuItem | MenuSetting> & {
    'menu-settings': MenuSetting;
};

const MenuExamplePage: React.FC = () => {
    // State management
    const [menuConfig, setMenuConfig] = useState<MenuConfig | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [editingItem, setEditingItem] = useState<{key: string, item: MenuItem} | null>(null);
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [editingMenuSettings, setEditingMenuSettings] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Add state at component top
    const [isMaterialSelectorOpen, setIsMaterialSelectorOpen] = useState(false);
    const [materialOptions, setMaterialOptions] = useState<string[]>([]);
    const [isLoadingMaterials, setIsLoadingMaterials] = useState(false);

    // Add language file state at component top
    const [languageData, setLanguageData] = useState<Record<string, string>>({});

    useEffect(() => {
        const loadLanguageData = async () => {
            try {
                const response = await fetch('/json/en_us.json');
                if (response.ok) {
                    const data = await response.json();
                    setLanguageData(data);
                }
            } catch (err) {
                console.error('Failed to load language data:', err);
            }
        };

        loadLanguageData();
    }, []);

    // Add function to get item localized name
    const getItemLocalizedName = (material: string): string => {
        // Process material name, convert to key in language file
        let key = '';
        let fallbackKey = ''; // Fallback key (for trying block. prefix)

        if (material.startsWith('minecraft:')) {
            // minecraft:diamond_sword -> item.minecraft.diamond_sword
            const baseKey = material.replace(':', '.');
            key = `item.${baseKey}`;
            fallbackKey = `block.${baseKey}`; // Fallback key uses block. prefix
        } else {
            // DIAMOND_SWORD -> item.minecraft.diamond_sword
            const normalizedMaterial = material.toLowerCase();
            key = `item.minecraft.${normalizedMaterial}`;
            fallbackKey = `block.minecraft.${normalizedMaterial}`; // Fallback key uses block. prefix
        }

        // First try item. prefix, if not found try block. prefix
        if (languageData[key]) {
            return languageData[key];
        } else if (languageData[fallbackKey]) {
            return languageData[fallbackKey];
        } else {
            // If neither found, return original name
            return material;
        }
    };

    // Modify fetchMaterialOptions function to load language file after getting material list
    const fetchMaterialOptions = async () => {
        setIsLoadingMaterials(true);
        try {
            // Get item list from JSON file in public directory
            const response = await fetch('/data/materials.json');
            if (response.ok) {
                const data = await response.json();
                setMaterialOptions(data.materials || []);
            } else {
                throw new Error('Failed to fetch materials');
            }
        } catch (err) {
            console.error('Failed to fetch material options:', err);
            // Use empty list on error
            setMaterialOptions([]);
        } finally {
            setIsLoadingMaterials(false);
        }
    };

    // Form field state
    const [formData, setFormData] = useState<MenuItem>({
        MATERIAL: '',
        'POSITION-X': 1,
        'POSITION-Y': 1,
        NAME: '',
        LORE: [],
        ACTIONS: [],
        AMOUNT: 1
    });

    // Modal state management
    const [activeModal, setActiveModal] = useState<'item' | 'menu' | null>(null);

    // ITEMFLAG options
    const ITEMFLAG_OPTIONS = [
        { value: 'HIDE_ENCHANTS', label: 'Hide Enchantment Info' },
        { value: 'HIDE_ATTRIBUTES', label: 'Hide Attribute Info' },
        { value: 'HIDE_UNBREAKABLE', label: 'Hide Unbreakable Status' },
        { value: 'HIDE_DESTROYS', label: 'Hide Destroyable Blocks Info' },
        { value: 'HIDE_PLACED_ON', label: 'Hide Placeable Blocks Info' },
        { value: 'HIDE_ADDITIONAL_TOOLTIP', label: 'Hide Additional Tooltip' },
        { value: 'HIDE_DYE', label: 'Hide Leather Armor Dye' },
        { value: 'HIDE_ARMOR_TRIM', label: 'Hide Armor Trim' },
        { value: 'HIDE_STORED_ENCHANTS', label: 'Hide Stored Enchantments' }
    ];

    // When page loads, try to restore data from localStorage and load example YAML
    useEffect(() => {
        const loadExampleYaml = async () => {
            try {
                const response = await fetch('/yaml/menu-example.yml');
                if (response.ok) {
                    const content = await response.text();

                    const savedConfig = localStorage.getItem('menuConfig');
                    const savedYaml = localStorage.getItem('menuYamlContent');

                    if (savedConfig) {
                        const parsedConfig = JSON.parse(savedConfig);
                        setMenuConfig(parsedConfig);
                    } else if (!savedYaml) {
                        try {
                            const parsedConfig = yaml.load(content) as MenuConfig;
                            setMenuConfig(parsedConfig);
                        } catch (err) {
                            console.error('Failed to parse example YAML:', err);
                        }
                    }
                }
            } catch (err) {
                console.error('Failed to load example YAML:', err);
            }
        };

        loadExampleYaml();
    }, []);

    // When menuConfig updates, save to localStorage
    useEffect(() => {
        if (menuConfig) {
            try {
                localStorage.setItem('menuConfig', JSON.stringify(menuConfig));
            } catch (err) {
                console.error('Failed to save menu config:', err);
            }
        }
    }, [menuConfig]);

    // When editingItem updates, initialize form field state
    useEffect(() => {
        if (editingItem) {
            const { item } = editingItem;
            setFormData({
                MATERIAL: item.MATERIAL || '',
                'POSITION-X': item['POSITION-X'] || 1,
                'POSITION-Y': item['POSITION-Y'] || 1,
                NAME: item.NAME || '',
                LORE: item.LORE || [],
                ACTIONS: item.ACTIONS || [],
                DURABILITY: item.DURABILITY,
                ENCHANTMENTS: item.ENCHANTMENTS || [],
                ITEMFLAG: item.ITEMFLAG || [],
                AMOUNT: item.AMOUNT || 1,
                'KEEP-OPEN': item['KEEP-OPEN'],
                'HIDE-TOOLTIP': item['HIDE-TOOLTIP'],
                PERMISSION: item.PERMISSION,
                'PERMISSION-MESSAGE': item['PERMISSION-MESSAGE'],
                CUSTOMMODELDATA: item.CUSTOMMODELDATA
            });
        } else {
            // Reset form field state
            setFormData({
                MATERIAL: '',
                'POSITION-X': 1,
                'POSITION-Y': 1,
                NAME: '',
                LORE: [],
                ACTIONS: [],
                AMOUNT: 1
            });
        }
    }, [editingItem]);

    // Color code mapping
    const colorMap: Record<string, string> = {
        '0': 'text-black',
        '1': 'text-blue-900',
        '2': 'text-green-900',
        '3': 'text-cyan-900',
        '4': 'text-red-900',
        '5': 'text-purple-900',
        '6': 'text-yellow-700',
        '7': 'text-gray-300',
        '8': 'text-gray-700',
        '9': 'text-blue-500',
        'a': 'text-green-500',
        'b': 'text-cyan-400',
        'c': 'text-red-500',
        'd': 'text-pink-400',
        'e': 'text-yellow-400',
        'f': 'text-white',
        'k': 'animate-pulse',
        'l': 'font-bold',
        'm': 'line-through',
        'n': 'underline',
        'o': 'italic',
        'r': 'text-inherit'
    };

    const getItemImageUrl = (material: string): string => {
        // Process item ID with namespace, e.g. minecraft:ender_pearl -> minecraft_ender_pearl
        // Or regular item ID, e.g. DIAMOND_SWORD -> minecraft_diamond_sword
        let formattedMaterial: string;

        if (material.includes(':')) {
            // If contains colon, replace with underscore
            formattedMaterial = material.replace(':', '_');
        } else {
            // If doesn't contain colon, prepend "minecraft_"
            formattedMaterial = `minecraft_${material.toLowerCase()}`;
        }

        return `/img/items_1.21/${formattedMaterial}.png`;
    };


    // Parse color codes
    const parseColorCodes = (text: string) => {
        const parts: React.ReactNode[] = [];
        let currentText = '';
        let i = 0;

        while (i < text.length) {
            if (text[i] === '&' && i + 1 < text.length) {
                if (currentText) {
                    parts.push(currentText);
                    currentText = '';
                }

                const colorCode = text[i + 1];
                i += 2;

                if (colorMap[colorCode]) {
                    let content = '';
                    while (i < text.length && !(text[i] === '&' && i + 1 < text.length && colorMap[text[i + 1]])) {
                        content += text[i];
                        i++;
                    }

                    parts.push(
                        <span key={i} className={colorMap[colorCode]}>
                            {content}
                        </span>
                    );
                }
            } else {
                currentText += text[i];
                i++;
            }
        }

        if (currentText) {
            parts.push(currentText);
        }

        return parts;
    };

    // Handle file import
    const handleFileImport = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const parsedConfig = yaml.load(content) as MenuConfig;

                if (!parsedConfig['menu-settings']) {
                    throw new Error('Invalid menu configuration: missing menu-settings');
                }

                setMenuConfig(parsedConfig);
                setError(null);
            } catch (err) {
                setError(`Failed to parse YAML file: ${err instanceof Error ? err.message : 'Unknown error'}`);
                setMenuConfig(null);
            }
        };
        reader.onerror = () => {
            setError('Failed to read file');
            setMenuConfig(null);
        };
        reader.readAsText(file);
    };

    // File selection handling
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            handleFileImport(files[0]);
        }
    };

    // Drag handling
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

        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            handleFileImport(files[0]);
        }
    };

    // Trigger file selection
    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    // Clear saved data
    const clearSavedData = () => {
        localStorage.removeItem('menuConfig');
        setMenuConfig(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Start editing item
    const startEditing = (key: string, item: MenuItem) => {
        // Close menu settings edit modal
        if (editingMenuSettings) {
            setEditingMenuSettings(false);
        }
        setEditingItem({key, item});
        setActiveModal('item');
    };

    // Start adding new item
    const startAdding = (x: number, y: number) => {
        // Close menu settings edit modal
        if (editingMenuSettings) {
            setEditingMenuSettings(false);
        }
        setIsAddingItem(true);
        setEditingItem({
            key: 'new-item',
            item: {
                MATERIAL: '',
                'POSITION-X': x,
                'POSITION-Y': y,
                NAME: '',
                LORE: [],
                ACTIONS: [],
                AMOUNT: 1
            }
        });
        setActiveModal('item');
    };

    // Save edited/added item
    const saveEditedItem = () => {
        if (!menuConfig || !editingItem) return;

        const newConfig = { ...menuConfig };

        // Ensure AMOUNT value is within valid range
        const clampedAmount = formData.AMOUNT ? Math.min(Math.max(parseInt(formData.AMOUNT.toString()), 1), 64) : 1;

        const itemToSave = {
            NAME: formData.NAME,
            MATERIAL: formData.MATERIAL,
            AMOUNT: clampedAmount,
            DURABILITY: formData.DURABILITY,
            'CUSTOMMODELDATA': formData.CUSTOMMODELDATA,
            'POSITION-X': formData['POSITION-X'],
            'POSITION-Y': formData['POSITION-Y'],
            'KEEP-OPEN': formData['KEEP-OPEN'],
            'HIDE-TOOLTIP': formData['HIDE-TOOLTIP'],
            ITEMFLAG: formData.ITEMFLAG && formData.ITEMFLAG.length > 0 ? formData.ITEMFLAG : undefined,
            ENCHANTMENTS: formData.ENCHANTMENTS && formData.ENCHANTMENTS.length > 0 ? formData.ENCHANTMENTS : undefined,
            LORE: formData.LORE && formData.LORE.length > 0 ? formData.LORE : undefined,
            ACTIONS: formData.ACTIONS && formData.ACTIONS.length > 0 ? formData.ACTIONS : undefined,
            PERMISSION: formData.PERMISSION,
            'PERMISSION-MESSAGE': formData['PERMISSION-MESSAGE'],
            BASE64: formData.MATERIAL === 'PLAYER_HEAD' && formData.BASE64 ? formData.BASE64 : undefined
        };

        if (isAddingItem) {
            // Generate unique key name
            const key = `item-${Date.now()}`;
            newConfig[key] = itemToSave;
        } else {
            // Update existing item
            newConfig[editingItem.key] = itemToSave;
        }

        setMenuConfig(newConfig);
        setEditingItem(null);
        setIsAddingItem(false);
        setActiveModal(null);
    };

    // Cancel editing
    const cancelEditing = () => {
        setEditingItem(null);
        setIsAddingItem(false);
        setActiveModal(null);
    };

    // Delete item
    const deleteItem = (key: string) => {
        if (!menuConfig) return;

        const newConfig = {...menuConfig};
        delete newConfig[key];
        setMenuConfig(newConfig);
    };

    // Update menu settings
    const updateMenuSettings = (field: keyof MenuSetting, value: any) => {
        if (!menuConfig) return;

        const newConfig = {
            ...menuConfig,
            'menu-settings': {
                ...menuConfig['menu-settings'],
                [field]: value
            }
        };

        setMenuConfig(newConfig);
    };

    // Add drag state
    const [draggedItem, setDraggedItem] = useState<{key: string, item: MenuItem} | null>(null);

    // Start dragging
    const startDragging = (key: string, item: MenuItem) => {
        setDraggedItem({key, item});
    };

    // End dragging
    const endDragging = () => {
        setDraggedItem(null);
    };

    // Drag to target position
    const handleDropOnCell = (x: number, y: number) => {
        if (!menuConfig || !draggedItem) return;

        const newConfig = {...menuConfig};
        const newItem = {...draggedItem.item};

        // Update position
        newItem['POSITION-X'] = x;
        newItem['POSITION-Y'] = y;

        // Update configuration
        newConfig[draggedItem.key] = newItem;
        setMenuConfig(newConfig);

        // Clear drag state
        setDraggedItem(null);
    };

    // Start editing menu settings
    const startEditingMenuSettings = () => {
        // Close item edit modal
        if (editingItem) {
            setEditingItem(null);
            setIsAddingItem(false);
        }
        setEditingMenuSettings(true);
        setActiveModal('menu');
    };

    // Save menu settings
    const saveMenuSettings = () => {
        setEditingMenuSettings(false);
        setActiveModal(null);
    };

    // Cancel editing menu settings
    const cancelEditingMenuSettings = () => {
        setEditingMenuSettings(false);
        setActiveModal(null);
    };

    // Update menu setting item
    const updateMenuSettingItem = (field: keyof MenuSetting, value: any) => {
        if (!menuConfig) return;

        const newConfig = {
            ...menuConfig,
            'menu-settings': {
                ...menuConfig['menu-settings'],
                [field]: value
            }
        };

        setMenuConfig(newConfig);
    };

    // Load example YAML file
    const loadExampleYaml = async () => {
        try {
            const response = await fetch('/yaml/menu-example.yml');
            if (response.ok) {
                const content = await response.text();

                try {
                    const parsedConfig = yaml.load(content) as MenuConfig;
                    setMenuConfig(parsedConfig);
                    setError(null);
                } catch (err) {
                    console.error('Failed to parse example YAML:', err);
                    setError(`Failed to parse example YAML: ${err instanceof Error ? err.message : 'Unknown error'}`);
                }
            } else {
                setError('Failed to load example YAML file');
            }
        } catch (err) {
            console.error('Failed to load example YAML:', err);
            setError(`Failed to load example YAML: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    };

    // Use default template
    const useDefaultTemplate = () => {
        loadExampleYaml();
    };

    // Export YAML file
    const exportYamlFile = () => {
        if (!menuConfig) return;

        try {
            const filename = menuConfig['menu-settings'].filename || 'menu-config';
            const fileExtension = filename.endsWith('.yml') || filename.endsWith('.yaml') ? '' : '.yml';

            const yamlContent = yaml.dump(menuConfig, {
                indent: 2,
                lineWidth: -1,
                noRefs: true,
                quotingType: '"'
            });

            const blob = new Blob([yamlContent], { type: 'application/yaml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename}${fileExtension}`;

            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Failed to export YAML file:', err);
            setError(`Failed to export YAML file: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    };

    // Update form field
    const updateFormField = (field: keyof MenuItem, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="container min-h-screen mx-auto px-2 md:px-4 py-4 md:py-8">
            <Head>
                <title>Menu Configuration Example - Youer</title>
                <meta name="description" content="Youer Menu Configuration File Parsing Example" />
            </Head>

            <div className="text-center mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Youer Built-in Menu Editor</h1>
                <p className="text-base md:text-lg">Import YAML format menu configuration files for parsing and visualization</p>
            </div>

            {/* File import area - only shown when no configuration exists */}
            {!menuConfig && (
                <div className="mb-6 md:mb-8">
                    <div
                        className={`border-2 border-dashed rounded-lg p-4 md:p-8 text-center cursor-pointer transition-colors ${
                            isDragging ? 'border-primary bg-primary/10' : 'border-base-300'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={triggerFileSelect}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".yml,.yaml"
                            onChange={handleFileSelect}
                        />
                        <div className="flex flex-col items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-12 md:w-12 mb-3 md:mb-4 text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-base md:text-lg font-medium mb-2">Drag and drop YAML file here or click to select file</p>
                            <p className="text-sm md:text-base-content/70 mb-3 md:mb-4">Only .yml format supported</p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <button className="btn btn-sm md:btn-md btn-primary">
                                    Select Menu Configuration File
                                </button>
                                <button
                                    className="btn btn-sm md:btn-md btn-secondary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        useDefaultTemplate();
                                    }}
                                >
                                    Use Default Template
                                </button>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="alert alert-error mt-3 md:mt-4 py-2 px-3 md:py-4 md:px-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs md:text-sm">{error}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Menu preview and configuration details */}
            {menuConfig && (
                <>
                    <div className="flex justify-end mb-3 md:mb-4 gap-2">
                        <button
                            className="btn btn-xs md:btn-sm btn-outline"
                            onClick={clearSavedData}
                        >
                            Clear Saved Data
                        </button>
                        <button
                            className="btn btn-xs md:btn-sm btn-primary"
                            onClick={exportYamlFile}
                            disabled={!menuConfig}
                        >
                            Export YAML File
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
                        <div className="lg:col-span-2">
                            <div className="card bg-base-100 shadow-xl mb-4 md:mb-6">
                                <div className="card-body p-3 md:p-6">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-3">
                                        <h2 className="card-title text-lg md:text-xl">Menu Preview</h2>
                                        <div className="form-control w-full md:w-32">
                                            <label className="label p-1">
                                                <span className="label-text text-xs md:text-sm">Rows</span>
                                            </label>
                                            <select
                                                className="select select-bordered select-sm md:select-md"
                                                value={menuConfig['menu-settings'].rows || 3}
                                                onChange={(e) => updateMenuSettings('rows', parseInt(e.target.value))}
                                            >
                                                {[1, 2, 3, 4, 5, 6].map(num => (
                                                    <option key={num} value={num}>{num}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="text-xs md:text-sm text-info mb-2 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                        </svg>
                                        Drag icons to change position
                                    </div>
                                    <div className="text-xs md:text-sm text-info mb-2 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        Click icons to edit
                                    </div>
                                    <div className="overflow-x-auto">
                                        <MenuGrid
                                            menuConfig={menuConfig}
                                            draggedItem={draggedItem}
                                            onDragStart={startDragging}
                                            onDragEnd={endDragging}
                                            onDropOnCell={handleDropOnCell}
                                            onEditItem={startEditing}
                                            onDeleteItem={deleteItem}
                                            onAddItem={startAdding}
                                            getItemImageUrl={getItemImageUrl}
                                        />
                                    </div>
                                    <div className="text-xs md:text-sm opacity-70 mt-2">
                                        Rows: {menuConfig['menu-settings'].rows}
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body p-3 md:p-6">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-3">
                                        <h2 className="card-title text-lg md:text-xl">Menu Settings</h2>
                                        <button
                                            className="btn btn-sm md:btn-md btn-primary"
                                            onClick={startEditingMenuSettings}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                        <div>
                                            <h3 className="font-bold text-sm md:text-base">Basic Settings</h3>
                                            <ul className="list-disc list-inside text-xs md:text-sm">
                                                <li>Menu Name: {parseColorCodes(menuConfig['menu-settings'].name)}</li>
                                                <li>Rows: {menuConfig['menu-settings'].rows}</li>
                                                <li>Export Filename: {menuConfig['menu-settings'].filename || 'menu-config'}.yml</li>
                                            </ul>
                                        </div>

                                        {menuConfig['menu-settings']['open-actions'] && (
                                            <div>
                                                <h3 className="font-bold text-sm md:text-base">Open Actions</h3>
                                                <ul className="list-disc list-inside text-xs md:text-sm">
                                                    {menuConfig['menu-settings']['open-actions'].map((action: string, index: number) => (
                                                        <li key={index} className="font-mono">{action}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <ColorCodeReference colorMap={colorMap} />
                        </div>
                    </div>

                    <div className="mt-6 md:mt-8">
                        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Icon Detailed Configuration</h2>
                        <ItemDetails
                            menuConfig={menuConfig}
                            onEditItem={startEditing}
                            onDeleteItem={deleteItem}
                            parseColorCodes={parseColorCodes}
                            ITEMFLAG_OPTIONS={ITEMFLAG_OPTIONS}
                        />
                    </div>
                </>
            )}

            {/* Instructions */}
            {!menuConfig && !error && (
                <div className="text-center py-8 md:py-12">
                    <div className="text-base-content/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-3 md:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-sm md:text-base">Please import a YAML format menu configuration file to view parsing results</p>
                    </div>
                </div>
            )}

            {/* Edit form */}
            <ItemEditForm
                isOpen={activeModal === 'item'}
                isAdding={isAddingItem}
                formData={formData}
                menuRows={menuConfig?.['menu-settings']?.rows || 3}
                onClose={cancelEditing}
                onSave={saveEditedItem}
                onUpdateField={updateFormField}
                onFetchMaterials={fetchMaterialOptions}
                isMaterialSelectorOpen={isMaterialSelectorOpen}
                setIsMaterialSelectorOpen={setIsMaterialSelectorOpen}
            />

            {/* Menu settings edit form */}
            <MenuSettingsEditForm
                isOpen={activeModal === 'menu' && editingMenuSettings}
                settings={menuConfig?.['menu-settings'] || { name: '', rows: 3 }}
                onClose={cancelEditingMenuSettings}
                onSave={saveMenuSettings}
                onUpdateSetting={updateMenuSettingItem}
            />

            {/* Material selector modal */}
            <MaterialSelector
                isOpen={isMaterialSelectorOpen}
                onClose={() => setIsMaterialSelectorOpen(false)}
                onSelectMaterial={(material) => updateFormField('MATERIAL', material)}
                materialOptions={materialOptions}
                getItemLocalizedName={getItemLocalizedName}
                getItemImageUrl={getItemImageUrl}
                isLoadingMaterials={isLoadingMaterials}
            />
        </div>
    );
};

export default MenuExamplePage;