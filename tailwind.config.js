/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './node_modules/flowbite-react/**/*.js',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/tw-elements/dist/js/**/*.js',
    ],
    theme: {
        colors: {
            gray: {
                '50': '#f9fafb',
                '100': '#f3f4f6',
                '200': '#e5e7eb',
                '300': '#d1d5db',
                '400': '#9ca3af',
                '500': '#6b7280',
                '600': '#4b5563',
                '700': '#374151',
                '800': '#1f2937',
                '900': '#111111',
                '950': '#030712'
            },
        },
        extend: {
            colors: {
                dark: {
                    '25': '#0d0d0d',
                    '50': '#131313',
                    '100': '#1e1e1e',
                    '200': '#2a2a2a',
                    '300': '#363636',
                    '400': '#424242',
                },
            },
        }
    },
    plugins: [
        require("flowbite/plugin"),
        require('tw-elements/dist/plugin')
    ],
    darkMode: 'class',
}
