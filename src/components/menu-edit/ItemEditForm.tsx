
// components/ItemEditForm.tsx
import React, { useEffect, useRef } from 'react';

interface MenuItem {
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
}

interface ItemEditFormProps {
    isOpen: boolean;
    isAdding: boolean;
    formData: MenuItem;
    menuRows: number;
    onClose: () => void;
    onSave: () => void;
    onUpdateField: (field: keyof MenuItem, value: any) => void;
    onFetchMaterials: () => void;
    isMaterialSelectorOpen: boolean;
    setIsMaterialSelectorOpen: (isOpen: boolean) => void;
}

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

const ItemEditForm: React.FC<ItemEditFormProps> = ({
                                                       isOpen,
                                                       isAdding,
                                                       formData,
                                                       menuRows,
                                                       onClose,
                                                       onSave,
                                                       onUpdateField,
                                                       onFetchMaterials,
                                                       isMaterialSelectorOpen,
                                                       setIsMaterialSelectorOpen
                                                   }) => {
    const editFormRef = useRef<HTMLDivElement>(null);

    // Update ITEMFLAG state
    const updateItemFlags = (flag: string, checked: boolean) => {
        if (checked) {
            onUpdateField('ITEMFLAG', [...(formData.ITEMFLAG || []), flag]);
        } else {
            onUpdateField('ITEMFLAG', (formData.ITEMFLAG || []).filter(f => f !== flag));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-2 md:p-4 pointer-events-none">
            <div
                ref={editFormRef}
                className="card bg-base-200 w-full max-w-full md:max-w-3xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto pointer-events-auto border-2 border-base-300 shadow-xl"
                onKeyDown={(e) => {
                    if (e.key === ' ' && e.target instanceof HTMLElement &&
                        !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                        e.preventDefault();
                    }
                }}
            >
                <div className="card-body p-3 md:p-4">
                    <h2 className="card-title text-lg md:text-xl mb-3 md:mb-4">
                        {isAdding ? 'Add New Item' : 'Edit Item'}
                    </h2>

                    <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2">
                        {/* Basic Information */}
                        <div className="border border-base-300 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                            <h3 className="font-bold text-base md:text-lg mb-2 md:mb-3">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="form-control">
                                    <label className="label p-1">
                                        <span className="label-text text-sm md:text-base">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered input-sm md:input-md"
                                        value={formData.NAME}
                                        onChange={(e) => onUpdateField('NAME', e.target.value)}
                                        placeholder="Name displayed on the item"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label p-1">
                                        <span className="label-text text-sm md:text-base">Material</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            className="input input-bordered input-sm md:input-md flex-1"
                                            value={formData.MATERIAL}
                                            onChange={(e) => onUpdateField('MATERIAL', e.target.value)}
                                            placeholder="e.g.: DIAMOND_SWORD or minecraft:diamond_sword"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-sm md:btn-md btn-primary"
                                            onClick={async () => {
                                                await onFetchMaterials();
                                                setIsMaterialSelectorOpen(true);
                                            }}
                                        >
                                            Select
                                        </button>
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label p-1">
                                        <span className="label-text text-sm md:text-base">Amount</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="64"
                                        className="input input-bordered input-sm md:input-md"
                                        value={formData.AMOUNT}
                                        onChange={(e) => onUpdateField('AMOUNT', e.target.value ? parseInt(e.target.value) : '')}
                                        placeholder="1-64"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label p-1">
                                        <span className="label-text text-sm md:text-base">Durability</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="input input-bordered input-sm md:input-md"
                                        value={formData.DURABILITY || ''}
                                        onChange={(e) => onUpdateField('DURABILITY', e.target.value ? parseInt(e.target.value) : '')}
                                        placeholder="Optional"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label p-1">
                                        <span className="label-text text-sm md:text-base">Custom Model Data</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="input input-bordered input-sm md:input-md"
                                        value={formData.CUSTOMMODELDATA || ''}
                                        onChange={(e) => onUpdateField('CUSTOMMODELDATA', e.target.value ? parseInt(e.target.value) : '')}
                                        placeholder="Optional"
                                    />
                                </div>

                                {formData.MATERIAL === 'PLAYER_HEAD' && (
                                    <div className="form-control">
                                        <label className="label p-1">
                                            <span className="label-text text-sm md:text-base">Base64</span>
                                        </label>
                                        <textarea
                                            className="textarea textarea-bordered textarea-sm md:textarea-md"
                                            value={formData.BASE64 || ''}
                                            onChange={(e) => onUpdateField('BASE64', e.target.value)}
                                            placeholder="Enter Base64 value for the head"
                                            rows={3}
                                        />
                                        <div className="text-xs text-base-content/70 mt-1">
                                            Editable when material is PLAYER_HEAD
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Position Settings */}
                        <div className="border border-base-300 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                            <h3 className="font-bold text-base md:text-lg mb-2 md:mb-3">Position Settings</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="form-control">
                                    <label className="label p-1">
                                        <span className="label-text text-sm md:text-base">X Coordinate (1-9)</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="9"
                                        className="input input-bordered input-sm md:input-md"
                                        value={formData['POSITION-X']}
                                        onChange={(e) => onUpdateField('POSITION-X', parseInt(e.target.value) || 1)}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label p-1">
                                        <span className="label-text text-sm md:text-base">Y Coordinate (1-{menuRows})</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={menuRows}
                                        className="input input-bordered input-sm md:input-md"
                                        value={formData['POSITION-Y']}
                                        onChange={(e) => onUpdateField('POSITION-Y', parseInt(e.target.value) || 1)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Advanced Settings */}
                        <div className="border border-base-300 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                            <h3 className="font-bold text-base md:text-lg mb-2 md:mb-3">Advanced Settings</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="form-control">
                                    <label className="label p-1">
                                        <span className="label-text text-sm md:text-base">Keep Open</span>
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-primary"
                                            checked={!!formData['KEEP-OPEN']}
                                            onChange={(e) => onUpdateField('KEEP-OPEN', e.target.checked)}
                                        />
                                        <span className="ml-2 text-sm md:text-base">Keep menu open after click</span>
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label p-1">
                                        <span className="label-text text-sm md:text-base">Hide Tooltip</span>
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-primary"
                                            checked={!!formData['HIDE-TOOLTIP']}
                                            onChange={(e) => onUpdateField('HIDE-TOOLTIP', e.target.checked)}
                                        />
                                        <span className="ml-2 text-sm md:text-base">Hide item tooltip</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Item Flags (ITEMFLAG) */}
                        <div className="border border-base-300 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                            <h3 className="font-bold text-base md:text-lg mb-2 md:mb-3">Item Flags (ITEMFLAG)</h3>
                            <div className="form-control">
                                <label className="label p-1">
                                    <span className="label-text text-sm md:text-base">Select item information to hide</span>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {ITEMFLAG_OPTIONS.map((option) => (
                                        <div key={option.value} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-primary"
                                                checked={(formData.ITEMFLAG || []).includes(option.value)}
                                                onChange={(e) => updateItemFlags(option.value, e.target.checked)}
                                            />
                                            <span className="ml-2 text-sm md:text-base">{option.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Enchantments (ENCHANTMENTS) */}
                        <div className="border border-base-300 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                            <h3 className="font-bold text-base md:text-lg mb-2 md:mb-3">Enchantments (ENCHANTMENTS)</h3>
                            <div className="form-control">
                                <label className="label p-1">
                                    <span className="label-text text-sm md:text-base">One enchantment per line</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered textarea-sm md:textarea-md"
                                    value={(formData.ENCHANTMENTS || []).join('\n')}
                                    onChange={(e) => onUpdateField('ENCHANTMENTS', e.target.value.split('\n'))}
                                    rows={4}
                                    placeholder="e.g.: DAMAGE_ALL:1"
                                />
                            </div>
                        </div>

                        {/* Lore (LORE) */}
                        <div className="border border-base-300 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                            <h3 className="font-bold text-base md:text-lg mb-2 md:mb-3">Lore (LORE)</h3>
                            <div className="form-control">
                                <label className="label p-1">
                                    <span className="label-text text-sm md:text-base">One lore line per line</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered textarea-sm md:textarea-md"
                                    value={(formData.LORE || []).join('\n')}
                                    onChange={(e) => onUpdateField('LORE', e.target.value.split('\n'))}
                                    rows={4}
                                    placeholder="Supports color codes, e.g.: &cRed Text"
                                />
                            </div>
                        </div>

                        {/* Actions (ACTIONS) */}
                        <div className="border border-base-300 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                            <h3 className="font-bold text-base md:text-lg mb-2 md:mb-3">Actions (ACTIONS)</h3>
                            <div className="form-control">
                                <label className="label p-1">
                                    <span className="label-text text-sm md:text-base">One action per line</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered textarea-sm md:textarea-md"
                                    value={(formData.ACTIONS || []).join('\n')}
                                    onChange={(e) => onUpdateField('ACTIONS', e.target.value.split('\n'))}
                                    rows={4}
                                    placeholder="e.g.: console: say Hello World"
                                />
                            </div>
                        </div>

                        {/* Permission Settings */}
                        <div className="border border-base-300 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                            <h3 className="font-bold text-base md:text-lg mb-2 md:mb-3">Permission Settings</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="form-control">
                                    <label className="label p-1">
                                        <span className="label-text text-sm md:text-base">Permission Node</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered input-sm md:input-md"
                                        value={formData.PERMISSION || ''}
                                        onChange={(e) => onUpdateField('PERMISSION', e.target.value)}
                                        placeholder="e.g.: myplugin.use"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label p-1">
                                        <span className="label-text text-sm md:text-base">No Permission Message</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered input-sm md:input-md"
                                        value={formData['PERMISSION-MESSAGE'] || ''}
                                        onChange={(e) => onUpdateField('PERMISSION-MESSAGE', e.target.value)}
                                        placeholder="e.g.: &cYou don't have permission to use this item"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-actions justify-end mt-3 md:mt-4 gap-2">
                        <button className="btn btn-sm md:btn-md btn-ghost" onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            className="btn btn-sm md:btn-md btn-primary"
                            onClick={onSave}
                            disabled={!formData.NAME || !formData.MATERIAL}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemEditForm;