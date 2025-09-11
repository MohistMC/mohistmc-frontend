
// components/MenuSettingsEditForm.tsx
import React from 'react';

interface MenuSetting {
    name: string;
    rows: number;
    "open-actions"?: string[];
    filename?: string;
}

interface MenuSettingsEditFormProps {
    isOpen: boolean;
    settings: MenuSetting;
    onClose: () => void;
    onSave: () => void;
    onUpdateSetting: (field: keyof MenuSetting, value: any) => void;
}

const MenuSettingsEditForm: React.FC<MenuSettingsEditFormProps> = ({
                                                                       isOpen,
                                                                       settings,
                                                                       onClose,
                                                                       onSave,
                                                                       onUpdateSetting
                                                                   }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-2 md:p-4 pointer-events-none">
            <div className="card bg-base-200 w-full max-w-full md:max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto pointer-events-auto border-2 border-base-300 shadow-xl">
                <div className="card-body p-3 md:p-4">
                    <h2 className="card-title text-lg md:text-xl mb-3 md:mb-4">Edit Menu Settings</h2>

                    <div className="space-y-4">
                        {/* Basic Settings Section */}
                        <div className="border border-base-300 rounded-lg p-3 md:p-4">
                            <h3 className="font-bold text-base md:text-lg mb-3 pb-2 border-b border-base-300">Basic Settings</h3>

                            <div className="space-y-4">
                                <div className="form-control">
                                    <label className="label p-1">
                                        <span className="label-text text-sm md:text-base">Menu Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered input-sm md:input-md"
                                        value={settings.name || ''}
                                        onChange={(e) => onUpdateSetting('name', e.target.value)}
                                        placeholder="Enter menu name"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label p-1">
                                            <span className="label-text text-sm md:text-base">Rows</span>
                                        </label>
                                        <select
                                            className="select select-bordered select-sm md:select-md"
                                            value={settings.rows || 3}
                                            onChange={(e) => onUpdateSetting('rows', parseInt(e.target.value))}
                                        >
                                            {[1, 2, 3, 4, 5, 6].map(num => (
                                                <option key={num} value={num}>{num} Row{num > 1 ? 's' : ''}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-control">
                                        <label className="label p-1">
                                            <span className="label-text text-sm md:text-base">Export Filename</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="input input-bordered input-sm md:input-md"
                                            value={settings.filename || ''}
                                            onChange={(e) => onUpdateSetting('filename', e.target.value)}
                                            placeholder="menu-config"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions Settings Section */}
                        <div className="border border-base-300 rounded-lg p-3 md:p-4">
                            <h3 className="font-bold text-base md:text-lg mb-3 pb-2 border-b border-base-300">Actions Settings</h3>

                            <div className="form-control">
                                <label className="label p-1">
                                    <span className="label-text text-sm md:text-base">Open Actions (One per line)</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered textarea-sm md:textarea-md"
                                    value={settings['open-actions']?.join('\n') || ''}
                                    onChange={(e) => onUpdateSetting('open-actions', e.target.value.split('\n').filter(action => action.trim() !== ''))}
                                    rows={4}
                                    placeholder="Example:&#10;[console] say Welcome to the shop&#10;[sound] entity.experience_orb.pickup"
                                />
                                <div className="text-xs text-base-content/70 mt-1">
                                    Tip: Enter one action per line, color codes supported
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-actions justify-end mt-4 gap-2">
                        <button className="btn btn-sm md:btn-md btn-ghost" onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            className="btn btn-sm md:btn-md btn-primary"
                            onClick={onSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuSettingsEditForm;