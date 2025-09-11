
// components/MaterialSelector.tsx
import React, { useState, useEffect } from 'react';

interface MaterialSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectMaterial: (material: string) => void;
    materialOptions: string[];
    getItemLocalizedName: (material: string) => string;
    getItemImageUrl: (material: string) => string;
    isLoadingMaterials: boolean;
}

const MaterialSelector: React.FC<MaterialSelectorProps> = ({
                                                               isOpen,
                                                               onClose,
                                                               onSelectMaterial,
                                                               materialOptions,
                                                               getItemLocalizedName,
                                                               getItemImageUrl,
                                                               isLoadingMaterials
                                                           }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter material options based on search term
    const filteredMaterials = materialOptions.filter(material => {
        const localizedName = getItemLocalizedName(material);
        return (
            material.toLowerCase().includes(searchTerm.toLowerCase()) ||
            localizedName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    useEffect(() => {
        if (isOpen) {
            setSearchTerm('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-2 md:p-4 pointer-events-none">
            <div
                className="fixed inset-0 bg-black/50 pointer-events-auto"
                onClick={onClose}
            ></div>
            <div className="card bg-base-200 w-full max-w-full md:max-w-3xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto pointer-events-auto border-2 border-base-300 shadow-xl z-10">
                <div className="card-body p-3 md:p-4">
                    <h2 className="card-title text-lg md:text-xl mb-3 md:mb-4">Select Item Material</h2>

                    {/* Search Box */}
                    <div className="form-control mb-4">
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Search items..."
                                className="input input-bordered w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                            {searchTerm && (
                                <button
                                    className="btn btn-square"
                                    onClick={() => setSearchTerm('')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {isLoadingMaterials ? (
                        <div className="flex justify-center items-center h-32">
                            <span className="loading loading-spinner loading-md"></span>
                        </div>
                    ) : (
                        <>
                            {filteredMaterials.length === 0 ? (
                                <div className="text-center py-8 text-base-content/70">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p>No matching items found</p>
                                    <button
                                        className="btn btn-sm btn-ghost mt-2"
                                        onClick={() => setSearchTerm('')}
                                    >
                                        Clear Search
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-3">
                                    {filteredMaterials.map((material) => {
                                        // Handle material name display
                                        const displayName = getItemLocalizedName(material);
                                        const imagePath = getItemImageUrl(material);

                                        return (
                                            <div
                                                key={material}
                                                className="flex flex-col items-center p-2 bg-base-100 rounded-lg cursor-pointer hover:bg-base-300 transition-colors"
                                                onClick={() => {
                                                    onSelectMaterial(material);
                                                    onClose();
                                                }}
                                            >
                                                <div className="w-8 h-8 flex items-center justify-center mb-1">
                                                    <img
                                                        src={imagePath}
                                                        alt={material}
                                                        className="w-6 h-6 object-contain"
                                                        onError={(e) => {
                                                            // Show default color block when image fails to load
                                                            const imgElement = e.target as HTMLImageElement;
                                                            imgElement.style.display = 'none';
                                                            const parent = imgElement.parentElement;
                                                            if (parent && !parent.querySelector('.fallback-block')) {
                                                                const fallback = document.createElement('div');
                                                                fallback.className = 'w-4 h-4 bg-primary rounded-md fallback-block';
                                                                parent.appendChild(fallback);
                                                            }
                                                        }}
                                                    />
                                                    <div className="w-6 h-6 bg-primary rounded-md fallback-block hidden"></div>
                                                </div>
                                                <span className="text-xs text-center break-words w-full">{displayName}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    )}

                    <div className="card-actions justify-end mt-4 gap-2">
                        <button
                            className="btn btn-sm md:btn-md btn-ghost"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaterialSelector;