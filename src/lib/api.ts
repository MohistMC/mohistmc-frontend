
// src/lib/api.ts
export const API_ENDPOINTS = {
    MOHISTMC_API: "https://api.mohistmc.com",
    DISCORD: "https://discord.gg/mohistmc"
} as const;


/**
 * Check if it's development environment
 * @returns boolean
 */
export function isDevelopment(): boolean {
    // Check multiple possible environment variables
    return process.env.NODE_ENV === 'development' ||
        process.env.NEXT_PUBLIC_NODE_ENV === 'development' ||
        // In development environment, production-specific variables are usually not set
        !process.env.NODE_ENV ||
        process.env.NODE_ENV !== 'production';
}

/**
 * Get base URL
 * @returns string - Returns localhost in development environment, and production domain in production environment
 */
export function getBaseURL(): string {
    // If in browser environment and window.location exists, use current domain
    if (typeof window !== 'undefined' && window.location) {
        return `${window.location.protocol}//${window.location.host}`;
    }

    // Return different URLs based on environment
    if (isDevelopment()) {
        return 'http://localhost:3000';
    }

    // Production environment default domain
    return 'https://www.mohistmc.cn';
}