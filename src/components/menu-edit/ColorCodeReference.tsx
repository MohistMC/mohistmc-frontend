
// components/ColorCodeReference.tsx
import React from 'react';

interface ColorCodeReferenceProps {
    colorMap: Record<string, string>;
}

const ColorCodeReference: React.FC<ColorCodeReferenceProps> = ({ colorMap }) => {
    return (
        <div className="card bg-base-300 shadow-xl sticky top-4">
            <div className="card-body p-3 md:p-6">
                <h2 className="card-title text-lg md:text-xl">Color Code Reference</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-2 gap-1 md:gap-2 mt-3">
                    {Object.entries(colorMap).map(([code, className]) => (
                        <div key={code} className="flex items-center p-1 md:p-2 rounded-lg bg-base-200">
                            <span className="w-6 md:w-8 font-mono text-xs md:text-sm">&{code}</span>
                            <span className={`ml-1 md:ml-2 text-xs md:text-sm ${className}`}>Example</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColorCodeReference;