/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ['en-US', 'zh-CN'],
        defaultLocale: 'en-US'
    },
}

const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
})

module.exports = withNextra(nextConfig)
