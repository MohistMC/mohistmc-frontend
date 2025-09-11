
// components/ItemDetails.tsx
import React from 'react';

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

interface ItemDetailsProps {
    menuConfig: Record<string, any>;
    onEditItem: (key: string, item: MenuItem) => void;
    onDeleteItem: (key: string) => void;
    parseColorCodes: (text: string) => React.ReactNode;
    ITEMFLAG_OPTIONS: { value: string; label: string }[];
}

const ItemDetails: React.FC<ItemDetailsProps> = ({
                                                     menuConfig,
                                                     onEditItem,
                                                     onDeleteItem,
                                                     parseColorCodes,
                                                     ITEMFLAG_OPTIONS
                                                 }) => {
    return Object.entries(menuConfig).map(([key, item]) => {
        if (key === 'menu-settings') return null;

        if (!('NAME' in item)) return null;
        const typedItem = item as MenuItem;

        return (
            <div key={key} className="card bg-base-100 shadow-xl mb-3 md:mb-4">
                <div className="card-body p-3 md:p-6">
                    <h3 className="card-title text-lg md:text-xl">
                        {parseColorCodes(typedItem.NAME)}
                        <div className="badge badge-secondary ml-2 text-xs md:text-sm">{typedItem.MATERIAL}</div>
                        <div className="card-actions absolute top-3 md:top-4 right-3 md:right-4">
                            <button
                                className="btn btn-xs md:btn-sm btn-primary"
                                onClick={() => onEditItem(key, typedItem)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-xs md:btn-sm btn-error"
                                onClick={() => onDeleteItem(key)}
                            >
                                Delete
                            </button>
                        </div>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-3">
                        <div>
                            <h4 className="font-bold mb-2 text-sm md:text-base">Basic Information</h4>
                            <ul className="list-disc list-inside text-xs md:text-sm">
                                <li>Position: ({typedItem['POSITION-X']}, {typedItem['POSITION-Y']})</li>
                                <li>Material: {typedItem.MATERIAL}</li>
                                <li>Name: {parseColorCodes(typedItem.NAME)}</li>
                                {typedItem.AMOUNT && typedItem.AMOUNT > 1 && <li>Amount: {typedItem.AMOUNT}</li>}
                                {typedItem.DURABILITY && <li>Durability: {typedItem.DURABILITY}</li>}
                                {typedItem.CUSTOMMODELDATA && <li>Custom Model Data: {typedItem.CUSTOMMODELDATA}</li>}
                                {typedItem.BASE64 && (
                                    <li className="break-all">
                                        Base64: {typedItem.BASE64.substring(0, 30)}...
                                        {typedItem.BASE64.length > 30 && (
                                            <span className="tooltip tooltip-right" data-tip={typedItem.BASE64}>
                        (Hover to see full value)
                      </span>
                                        )}
                                    </li>
                                )}
                                {typedItem['KEEP-OPEN'] && <li>Keep Open: Yes</li>}
                                {typedItem['HIDE-TOOLTIP'] && <li>Hide Tooltip: Yes</li>}
                            </ul>
                        </div>

                        {typedItem.LORE && (
                            <div>
                                <h4 className="font-bold mb-2 text-sm md:text-base">Lore</h4>
                                <ul className="list-disc list-inside text-xs md:text-sm">
                                    {typedItem.LORE.map((line: string, index: number) => (
                                        <li key={index}>{parseColorCodes(line)}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {typedItem.ACTIONS && (
                            <div>
                                <h4 className="font-bold mb-2 text-sm md:text-base">Actions</h4>
                                <ul className="list-disc list-inside text-xs md:text-sm">
                                    {typedItem.ACTIONS.map((action: string, index: number) => (
                                        <li key={index} className="font-mono">{action}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {typedItem.ENCHANTMENTS && (
                            <div>
                                <h4 className="font-bold mb-2 text-sm md:text-base">Enchantments</h4>
                                <ul className="list-disc list-inside text-xs md:text-sm">
                                    {typedItem.ENCHANTMENTS.map((enchant: string, index: number) => (
                                        <li key={index}>{enchant}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {typedItem.ITEMFLAG && (
                            <div>
                                <h4 className="font-bold mb-2 text-sm md:text-base">Item Flags</h4>
                                <ul className="list-disc list-inside text-xs md:text-sm">
                                    {typedItem.ITEMFLAG.map((flag: string, index: number) => {
                                        const flagLabel = ITEMFLAG_OPTIONS.find(option => option.value === flag)?.label || flag;
                                        return <li key={index}>{flagLabel}</li>;
                                    })}
                                </ul>
                            </div>
                        )}

                        {(typedItem.PERMISSION || typedItem['PERMISSION-MESSAGE']) && (
                            <div>
                                <h4 className="font-bold mb-2 text-sm md:text-base">Permissions</h4>
                                {typedItem.PERMISSION && <div className="text-xs md:text-sm">Permission Node: {typedItem.PERMISSION}</div>}
                                {typedItem['PERMISSION-MESSAGE'] && (
                                    <div className="text-xs md:text-sm">No Permission Message: {typedItem['PERMISSION-MESSAGE']}</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    });
};

export default ItemDetails;