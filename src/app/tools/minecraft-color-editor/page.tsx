
"use client";

import React, {useState} from 'react';
import Head from 'next/head';

export default function MinecraftColorEditor() {
    const [customText, setCustomText] = useState('Custom text example');
    const [copied, setCopied] = useState(false);

    // Minecraft color codes
    const colorCodes = [
        {code: '§0', name: 'Black', color: '#000000', bgColor: '#000000', textColor: '#ffffff'},
        {code: '§1', name: 'Dark Blue', color: '#0000AA', bgColor: '#00002A', textColor: '#ffffff'},
        {code: '§2', name: 'Dark Green', color: '#00AA00', bgColor: '#002A00', textColor: '#ffffff'},
        {code: '§3', name: 'Dark Aqua', color: '#00AAAA', bgColor: '#002A2A', textColor: '#ffffff'},
        {code: '§4', name: 'Dark Red', color: '#AA0000', bgColor: '#2A0000', textColor: '#ffffff'},
        {code: '§5', name: 'Dark Purple', color: '#AA00AA', bgColor: '#2A002A', textColor: '#ffffff'},
        {code: '§6', name: 'Gold', color: '#FFAA00', bgColor: '#402A00', textColor: '#ffffff'},
        {code: '§7', name: 'Gray', color: '#AAAAAA', bgColor: '#2A2A2A', textColor: '#ffffff'},
        {code: '§8', name: 'Dark Gray', color: '#555555', bgColor: '#151515', textColor: '#ffffff'},
        {code: '§9', name: 'Blue', color: '#5555FF', bgColor: '#15153F', textColor: '#ffffff'},
        {code: '§a', name: 'Green', color: '#55FF55', bgColor: '#153F15', textColor: '#ffffff'},
        {code: '§b', name: 'Aqua', color: '#55FFFF', bgColor: '#153F3F', textColor: '#000000'},
        {code: '§c', name: 'Red', color: '#FF5555', bgColor: '#3F1515', textColor: '#ffffff'},
        {code: '§d', name: 'Light Purple', color: '#FF55FF', bgColor: '#3F153F', textColor: '#ffffff'},
        {code: '§e', name: 'Yellow', color: '#FFFF55', bgColor: '#3F3F15', textColor: '#000000'},
        {code: '§f', name: 'White', color: '#FFFFFF', bgColor: '#3F3F3F', textColor: '#000000'},
    ];

    // Minecraft format codes
    const formatCodes = [
        {code: '§l', name: 'Bold', symbol: 'B', style: 'font-bold'},
        {code: '§m', name: 'Strikethrough', symbol: 'S', style: 'line-through'},
        {code: '§n', name: 'Underline', symbol: 'U', style: 'underline'},
        {code: '§o', name: 'Italic', symbol: 'I', style: 'italic'},
        {
            code: '§k',
            name: 'Obfuscated',
            symbol: '█',
            style: 'animate-pulse'
        },
        {code: '§r', name: 'Reset', symbol: 'R', style: 'text-white'},
    ];

    // Copy to clipboard
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Render formatted text
    const renderFormattedText = (text: string | any[]) => {
        const elements = [];
        let currentStyle: React.CSSProperties = {};
        let currentContent = '';

        for (let i = 0; i < text.length; i++) {
            if (text[i] === '§' && i + 1 < text.length) {
                const code = text[i + 1].toLowerCase();
                const color = colorCodes.find(c => c.code[1] === code);
                const format = formatCodes.find(f => f.code[1] === code);

                // Only process if a valid color or format code is found
                if (color || format) {
                    if (currentContent) {
                        // Use span and add styles to support line breaks
                        elements.push(
                            <span
                                key={i}
                                style={{...currentStyle, whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}
                            >
                            {currentContent}
                        </span>
                        );
                        currentContent = '';
                    }

                    if (color) {
                        currentStyle.color = color.color;
                        i++; // Skip color code
                    } else if (format) {
                        if (format.code === '§l') currentStyle.fontWeight = 'bold';
                        else if (format.code === '§m') currentStyle.textDecoration = 'line-through';
                        else if (format.code === '§n') currentStyle.textDecoration = 'underline';
                        else if (format.code === '§o') currentStyle.fontStyle = 'italic';
                        else if (format.code === '§r') currentStyle = {};
                        i++; // Skip format code
                    }
                } else {
                    // If § is not followed by a valid code, treat § as normal text
                    currentContent += text[i];
                }
            } else {
                // Special handling for line breaks
                if (text[i] === '\n') {
                    if (currentContent) {
                        elements.push(
                            <span
                                key={i}
                                style={{...currentStyle, whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}
                            >
                            {currentContent}
                        </span>
                        );
                        currentContent = '';
                    }
                    // Add line break element and reset styles
                    elements.push(<br key={`br-${i}`}/>);
                    currentStyle = {};
                } else {
                    currentContent += text[i];
                }
            }
        }

        if (currentContent) {
            // Also add line break styles
            elements.push(
                <span
                    key="last"
                    style={{...currentStyle, whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}
                >
                {currentContent}
            </span>
            );
        }

        return elements;
    };


    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8">
            <Head>
                <title>Minecraft Color Code Editor</title>
                <meta name="description" content="Minecraft color and formatting code editor and preview tool"/>
            </Head>

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary mt-4">Minecraft Color Code Editor</h1>
                    <p className="text-lg text-base-content mt-2">Preview and generate Minecraft color and formatting codes</p>
                </div>

                {/* Custom preview area */}
                <div className="card bg-base-100 shadow-xl mb-8">
                    <div className="card-body">
                        <h2 className="card-title text-2xl">Custom Preview</h2>
                        <p>Enter text below to see the effect with color and formatting codes</p>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Enter text (use &sect; prefix to add formatting codes)</span>
                            </label>
                            <textarea
                                placeholder="Enter text..."
                                className="textarea textarea-bordered w-full my-1"
                                value={customText}
                                onChange={(e) => setCustomText(e.target.value)}
                                rows={4}
                            />
                        </div>

                        <div className="mt-4">
                            <label className="label">
                                <span className="label-text">Preview</span>
                            </label>
                            <div className="bg-base-300 p-4 rounded-lg min-h-12 whitespace-pre-wrap break-words">
                                {renderFormattedText(customText)}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="label">
                                <span className="label-text">Raw Code (for copying)</span>
                            </label>
                            <div className="relative">
                                <div
                                    className="bg-base-300 p-4 rounded-lg font-mono whitespace-pre-wrap break-words min-h-12">
                                    {customText}
                                </div>
                                <button
                                    className="absolute top-2 right-2 btn btn-primary btn-sm"
                                    onClick={() => copyToClipboard(customText)}
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Color codes section */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl">Color Codes</h2>
                            <p className="text-base-content">16 color codes in Minecraft</p>

                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Preview</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {colorCodes.map((color, index) => (
                                        <tr key={index}>
                                            <td className="font-mono">{color.code}</td>
                                            <td>{color.name}</td>
                                            <td className="align-middle">
                                                <span
                                                    className="rounded inline-block align-middle"
                                                    style={{
                                                        backgroundColor: color.color,
                                                        width: '60px',
                                                        height: '36px',
                                                        border: '1px solid #d1d5db'
                                                    }}
                                                />
                                            </td>
                                            <td className="align-middle">
                                                <button
                                                    className="btn btn-sm btn-outline h-9 flex items-center"
                                                    onClick={() => copyToClipboard(color.code)}
                                                >
                                                    Copy
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Format codes section */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl">Format Codes</h2>
                            <p className="text-base-content">Text formatting codes in Minecraft</p>

                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Preview</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {formatCodes.map((format, index) => (
                                        <tr key={index}>
                                            <td className="font-mono">{format.code}</td>
                                            <td>{format.name}</td>
                                            <td className="align-middle">
                                                <span
                                                    className={`px-2 py-1 rounded inline-flex items-center justify-center ${format.style}`}
                                                    style={{minHeight: '36px'}}
                                                >
                                                    {format.symbol}
                                                </span>
                                            </td>
                                            <td className="align-middle">
                                                <button
                                                    className="btn btn-sm btn-outline h-9 flex items-center"
                                                    onClick={() => copyToClipboard(format.code)}
                                                >
                                                    Copy
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Instructions */}
                <div className="card bg-base-100 shadow-xl mt-8">
                    <div className="card-body">
                        <h2 className="card-title text-2xl">Instructions</h2>
                        <div className="prose max-w-none">
                            <p>In Minecraft, you can use the <code>§</code> symbol followed by a letter or number to set text color and formatting.</p>
                            <ul>
                                <li>Color codes: <code>§0</code> to <code>§f</code> (black to white)</li>
                                <li>Format codes: <code>§l</code> (bold), <code>§m</code> (strikethrough), <code>§n</code> (underline), <code>§o</code> (italic), <code>§k</code> (obfuscated), <code>§r</code> (reset formatting)
                                </li>
                            </ul>
                            <p>Enter text with formatting codes in the "Custom Preview" area above (e.g. <code>§aGreen text §cRed text</code>) to see the effect in real time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}