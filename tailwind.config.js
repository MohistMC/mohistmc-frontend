const flowbite = require('flowbite-react/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', flowbite.content()],
    theme: {
        colors: {
            gray: {
                50: '#f9fafb',
                100: '#f3f4f6',
                200: '#e5e7eb',
                300: '#d1d5db',
                400: '#9ca3af',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                800: '#1f2937',
                900: '#111111',
                950: '#030712',
            },
        },
        extend: {
            colors: {
                dark: {
                    25: '#0d0d0d',
                    50: '#131313',
                    100: '#1e1e1e',
                    150: '#242424',
                    200: '#2a2a2a',
                    300: '#363636',
                    400: '#424242',
                },
                cyan: {
                    700: '#2860de',
                },
            },
        },
    },
    plugins: [flowbite.plugin()],
    darkMode: 'class',
}
