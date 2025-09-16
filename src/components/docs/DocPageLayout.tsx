'use client';

import Sidebar from '@/components/docs/Sidebar';
import React, { useEffect, useState } from "react";

// Table of contents component
function TableOfContents() {
    const [headings, setHeadings] = useState<{id: string; text: string; level: number}[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        // Define function to get headings
        const getHeadings = () => {
            // Only find heading elements in the document content area
            const contentArea = document.querySelector('.prose');
            if (!contentArea) return;

            let elements = Array.from(contentArea.querySelectorAll('h1, h2, h3, h4'))
                .filter(element => element.textContent)
                .map((element, index) => {
                    // Generate an ID for elements without one
                    const id = element.id || `heading-${index}-${encodeURIComponent(element.textContent || '').replace(/%/g, '')}`;
                    if (!element.id) {
                        element.id = id;
                    }

                    // Get text content and clean it
                    let text = element.textContent || '';

                    // Remove leading special characters (like #, ##, etc.)
                    text = text.replace(/^#+\s*/, '');

                    // Skip if text is empty or contains only whitespace
                    if (!text.trim()) return null;

                    return {
                        id: id,
                        text: text,
                        level: parseInt(element.tagName.charAt(1))
                    };
                })
                .filter(item => item !== null) as {id: string; text: string; level: number}[];

            setHeadings(elements);
        };

        // Initial heading retrieval - reduced delay
        const initialTimeout = setTimeout(getHeadings, 100);

        // Retrieve again after page load to ensure all content is rendered
        const loadTimeout = setTimeout(getHeadings, 300);

        // Create a MutationObserver to listen for DOM changes
        const observer = new MutationObserver(getHeadings);

        // Start observing DOM changes
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['id']
        });

        // Listen to scroll events to highlight the currently visible heading
        let scrollTimer: NodeJS.Timeout;
        const handleScroll = () => {
            // Debounce handling to avoid frequent triggering
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                const contentArea = document.querySelector('.prose');
                if (!contentArea) return;

                // Get all heading elements
                const headingElements = Array.from(contentArea.querySelectorAll('h1[id], h2[id], h3[id], h4[id]'))
                    .filter(element => element.id) as HTMLElement[];

                if (headingElements.length === 0) return;

                // Get current scroll position
                const scrollTop = window.scrollY;
                const windowHeight = window.innerHeight;
                const offset = windowHeight / 3; // Use the upper third of the viewport as the judgment standard

                // Special case: If at the top of the page, activate the first heading
                if (scrollTop < 50) {
                    if (headingElements.length > 0) {
                        setActiveId(headingElements[0].id);
                    }
                    return;
                }

                // Find the heading that should be activated
                let activeHeadingId = headingElements[0]?.id || ''; // Default to the first one

                // Search from top to bottom for the first heading in the upper third of the viewport
                for (let i = 0; i < headingElements.length; i++) {
                    const element = headingElements[i];
                    const rect = element.getBoundingClientRect();

                    // If the heading is in the upper third of the viewport, activate it
                    if (rect.top >= 0 && rect.top <= offset) {
                        activeHeadingId = element.id;
                        break;
                    }

                    // If the heading is above the viewport, update to that heading (as a backup)
                    if (rect.top < 0) {
                        activeHeadingId = element.id;
                    }
                }

                setActiveId(activeHeadingId);
            }, 150); // 150ms debounce delay
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        // Initial call
        setTimeout(handleScroll, 100);

        // Cleanup function
        return () => {
            clearTimeout(initialTimeout);
            clearTimeout(loadTimeout);
            clearTimeout(scrollTimer);
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Keep empty dependency array

    // Scroll to specified heading
    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Update active ID
            setActiveId(id);
            // Perform scroll
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Don't display table of contents if there are no headings
    if (headings.length === 0) return null;

    return (
        <div className="hidden xl:block w-56 flex-shrink-0">
            <div className="sticky top-20">
                <div className="bg-base-100 p-4 rounded-box border border-base-300">
                    <ul className="space-y-2">
                        {headings.map((heading) => (
                            <li key={heading.id}>
                                <button
                                    onClick={() => scrollToHeading(heading.id)}
                                    className={`text-sm text-left w-full transition-colors ${
                                        heading.level === 1
                                            ? 'font-semibold'
                                            : 'text-base-content/80'
                                    } ${
                                        heading.level > 1
                                            ? `pl-${(heading.level - 1) * 4}`
                                            : ''
                                    } ${
                                        activeId === heading.id
                                            ? 'text-primary font-semibold'
                                            : 'hover:text-primary'
                                    }`}
                                >
                                    {heading.text}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function DocPageLayout({
                                          docsTree,
                                          project,
                                          breadcrumbs,
                                          title,
                                          description,
                                          children,
                                          topSpacing = "mt-16"
                                      }: {
    docsTree: any[];
    project: string;
    breadcrumbs: { name: string }[];
    title?: string;
    description?: string;
    children: React.ReactNode;
    topSpacing?: string;
}) {
    return (
        <div className="min-h-screen bg-base-100">
            {/* Main content area - Using Flex layout */}
            <div className="p-4 md:p-6 lg:p-8">
                <div className="max-w-6xl lg:max-w-[90rem] mx-auto px-0 sm:px-4 lg:flex lg:gap-6 xl:gap-8">
                    {/* Desktop sidebar - Display on lg and above screens, inline with content area */}
                    <div className="hidden lg:block w-60 xl:w-64 flex-shrink-0">
                        <div className="sticky top-20">
                            <Sidebar docsTree={docsTree} project={project}/>
                        </div>
                    </div>

                    {/* Main content area and right navigation area */}
                    <div className="flex flex-grow w-full">
                        {/* Content area */}
                        <div className="flex-grow min-w-0"> {/* Add min-w-0 to prevent content overflow */}
                            {/* Mobile sidebar - Consistent with navigation menu in Header, displayed on screens below lg */}
                            <div className="lg:hidden -mx-4 mb-4">
                                <Sidebar docsTree={docsTree} project={project}/>
                            </div>

                            {/* Breadcrumb navigation */}
                            <div className="mb-4 px-4 lg:px-6">
                                <nav className="text-sm">
                                    <ul className="flex flex-wrap items-center">
                                        {breadcrumbs.map((crumb, index) => (
                                            <li key={index} className="flex items-center">
                                            <span className={index === breadcrumbs.length - 1
                                                ? "text-base-content font-medium"
                                                : "text-base-content/70"}>
                                                {crumb.name}
                                            </span>
                                                {index < breadcrumbs.length - 1 && (
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         className="h-4 w-4 mx-2 text-base-content/30 flex-shrink-0" fill="none"
                                                         viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                              d="M9 5l7 7-7 7"/>
                                                    </svg>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>

                            {/* Content area - More centered display on large screens, increased max width */}
                            <div className="prose prose-lg dark:prose-invert max-w-none bg-base-100 p-2 md:p-4 lg:p-6 rounded-box lg:max-w-4xl px-4 lg:px-6">
                                {/* Display title and subtitle */}
                                {title && (
                                    <h1 className="text-3xl font-bold mt-0 mb-2 text-base-content">
                                        {title}
                                    </h1>
                                )}
                                {description && (
                                    <p className="text-base-content/80 mb-6 text-lg">
                                        {description}
                                    </p>
                                )}
                                {/* Add spacing */}
                                <div className={topSpacing}>
                                    {children}
                                </div>
                            </div>
                        </div>

                        {/* Right table of contents - Display on xl and above screens */}
                        <TableOfContents />
                    </div>
                </div>
            </div>
        </div>
    );
}