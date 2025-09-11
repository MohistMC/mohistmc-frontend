// src/components/docs/CodeBlock.tsx
'use client';

import {ReactNode} from 'react';

export default function CodeBlock({
                                      children,
                                      language = 'bash'
                                  }: {
    children: ReactNode;
    language?: string;
}) {
    return (
        <div className="mockup-code bg-base-200 dark:bg-base-800 rounded-lg my-4 overflow-x-auto">
            <div className="flex items-center px-4 py-2 border-b border-base-300 dark:border-base-700">
                <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
            </div>
            <pre className="whitespace-pre-wrap text-xs md:text-sm font-mono text-base-content p-4 overflow-x-auto">
        {children}
      </pre>
        </div>
    );
}
