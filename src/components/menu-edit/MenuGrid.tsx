// components/MenuGrid.tsx
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

interface MenuGridProps {
    menuConfig: Record<string, any>;
    draggedItem: { key: string; item: MenuItem } | null;
    onDragStart: (key: string, item: MenuItem) => void;
    onDragEnd: () => void;
    onDropOnCell: (x: number, y: number) => void;
    onEditItem: (key: string, item: MenuItem) => void;
    onDeleteItem: (key: string) => void;
    onAddItem: (x: number, y: number) => void;
    getItemImageUrl: (material: string) => string;
}

const MenuGrid: React.FC<MenuGridProps> = ({
                                               menuConfig,
                                               draggedItem,
                                               onDragStart,
                                               onDragEnd,
                                               onDropOnCell,
                                               onEditItem,
                                               onDeleteItem,
                                               onAddItem,
                                               getItemImageUrl
                                           }) => {
    const rows = menuConfig['menu-settings'].rows || 3;
    const gridItems = Array(rows).fill(null).map(() => Array(9).fill(null));

    Object.entries(menuConfig).forEach(([key, item]) => {
        if (key === 'menu-settings') return;

        if (!('POSITION-X' in item) || !('POSITION-Y' in item)) return;

        const typedItem = item as MenuItem;
        const x = typedItem['POSITION-X'] - 1;
        const y = typedItem['POSITION-Y'] - 1;

        if (y >= 0 && y < rows && x >= 0 && x < 9) {
            gridItems[y][x] = { key, item: typedItem };
        }
    });

    return (
        <div className="overflow-x-auto overflow-y-hidden">
            <div className="min-w-full inline-block p-2 md:p-4">
                {/* 列号 */}
                <div className="flex gap-0 mb-1 md:mb-2 justify-center">
                    <div className="w-6 md:w-8"></div>
                    {Array(9).fill(null).map((_, i) => (
                        <div key={`header-${i}`} className="text-center font-bold text-xs md:text-sm w-8 md:w-12 h-6 md:h-8 flex items-center justify-center">
                            {i + 1}
                        </div>
                    ))}
                </div>

                {gridItems.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-0 mb-0 relative justify-center">
                        {/* 行号 */}
                        <span className="text-xs md:text-sm font-bold h-8 md:h-12 flex items-center justify-center w-6 md:w-8">
              {rowIndex + 1}
            </span>

                        {row.map((cell, cellIndex) => (
                            <div
                                key={`${rowIndex}-${cellIndex}`}
                                className="flex items-center justify-center"
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    e.dataTransfer.dropEffect = 'move';
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    if (draggedItem && !cell) {
                                        onDropOnCell(cellIndex + 1, rowIndex + 1);
                                    }
                                }}
                            >
                                {cell ? (
                                    <div
                                        className={`w-8 h-8 md:w-12 md:h-12 flex items-center justify-center border-2 rounded-lg bg-base-200 relative group cursor-pointer transition-all duration-200 ${
                                            draggedItem?.key === cell.key ? 'opacity-50' : ''
                                        } hover:shadow-md`}
                                        draggable
                                        onDragStart={() => onDragStart(cell.key, cell.item)}
                                        onDragEnd={onDragEnd}
                                        onClick={() => onEditItem(cell.key, cell.item)}
                                        onTouchStart={(e) => {
                                            e.currentTarget.classList.add('scale-95');
                                        }}
                                        onTouchEnd={(e) => {
                                            e.currentTarget.classList.remove('scale-95');
                                        }}
                                    >
                                        <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                                            <img
                                                src={getItemImageUrl(cell.item.MATERIAL)}
                                                alt={cell.item.MATERIAL}
                                                className="w-full h-full object-contain hidden"
                                                onError={(e) => {
                                                    // 图片加载失败时隐藏图片并显示颜色块
                                                    const imgElement = e.target as HTMLImageElement;
                                                    imgElement.classList.add('hidden');
                                                    // 创建并显示颜色块
                                                    const parent = imgElement.parentElement;
                                                    if (parent && !parent.querySelector('.color-block-fallback')) {
                                                        const colorBlock = document.createElement('div');
                                                        colorBlock.className = 'w-4 h-4 md:w-6 md:h-6 bg-primary rounded-md color-block-fallback';
                                                        parent.appendChild(colorBlock);
                                                    }
                                                }}
                                                onLoad={(e) => {
                                                    // 图片加载成功时显示图片并隐藏颜色块
                                                    const imgElement = e.target as HTMLImageElement;
                                                    imgElement.classList.remove('hidden');
                                                    const parent = imgElement.parentElement;
                                                    const colorBlock = parent?.querySelector('.color-block-fallback');
                                                    if (colorBlock) {
                                                        colorBlock.remove();
                                                    }
                                                }}
                                            />
                                            {/* 默认颜色块，会在图片加载成功时被移除，加载失败时保留 */}
                                            <div className="w-4 h-4 md:w-6 md:h-6 bg-primary rounded-md color-block-fallback"></div>
                                        </div>
                                        {cell.item.AMOUNT && cell.item.AMOUNT > 1 && (
                                            <div className="absolute -bottom-1 -right-1 md:bottom-0 md:right-0 transform md:translate-x-1/4 md:translate-y-1/4 z-10">
                        <span className="text-[0.5rem] md:text-xs font-bold bg-black/70 text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                          {Math.min(cell.item.AMOUNT, 99)}
                        </span>
                                            </div>
                                        )}
                                        <div className="absolute -top-1 -right-1 md:top-0 md:right-0 transform md:translate-x-1/4 md:-translate-y-1/4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                className="btn btn-xs btn-circle btn-error"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDeleteItem(cell.key);
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={`w-8 h-8 md:w-12 md:h-12 flex items-center justify-center border-2 rounded-lg opacity-20 cursor-pointer hover:opacity-40 transition-all duration-200 ${
                                            draggedItem && !cell ? 'border-dashed border-primary' : ''
                                        }`}
                                        onClick={() => onAddItem(cellIndex + 1, rowIndex + 1)}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            if (draggedItem) {
                                                e.dataTransfer.dropEffect = 'move';
                                            }
                                        }}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            if (draggedItem) {
                                                onDropOnCell(cellIndex + 1, rowIndex + 1);
                                            }
                                        }}
                                    >
                                        <span className="text-lg md:text-2xl">+</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuGrid;
