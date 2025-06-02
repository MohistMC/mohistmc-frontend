import React, { useEffect, useState } from 'react'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import { getCopyrightText } from '@/util/String'
import { selectTranslations } from '@/features/i18n/TranslatorSlice'
import { useSelector } from 'react-redux'

const PATH_SECTION_MAP = {
    '/mohist': 'Mohist',
    '/blog': 'Blog',
    '/youer': 'Youer'
} as const

const config: DocsThemeConfig = {
    docsRepositoryBase: 'https://github.com/MohistMC/website/tree/frontend',
    footer: {
        component: function () {
            return <></>
        },
    },
    useNextSeoProps: function SEO() {
        const router = useRouter()
        const { frontMatter } = useConfig()

        const section = Object.entries(PATH_SECTION_MAP).find(([path]) =>
            router?.pathname.startsWith(path)
        )?.[1] || 'Banner'
        const defaultTitle = frontMatter.overrideTitle || section

        return {
            defaultTitle,
            titleTemplate: `%s – ${section}`,
        }
    },
    head: function useHead() {
        const router = useRouter()

        const section = Object.entries(PATH_SECTION_MAP).find(([path]) =>
            router?.pathname.startsWith(path)
        )?.[1] || 'Banner'
        const description =
            section === 'Blog'
                ? `Stay updated with MohistMC's Blog! Explore the latest news, releases, and insights. Connect with our dynamic community. ${getCopyrightText()} MohistMC.`
                : `Need help setting up, configuring and using our software? The docs are here to help you. ${getCopyrightText()} MohistMC.`
        const title = section === 'Blog' ? 'MohistMC - Blog' : 'MohistMC - Docs'

        return (
            <>
                <meta name="title" content={title} />
                <meta name="description" content={description} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://mohistmc.com/team" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta
                    property="og:image"
                    content="https://mohistmc.com/mohistLogo.png"
                />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="100" />
                <meta property="og:image:height" content="100" />

                <meta
                    property="twitter:url"
                    content="https://mohistmc.com/team"
                />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
            </>
        )
    },
    themeSwitch: {
        component: null,
    },
    editLink: {
        text: 'Edit this page on GitHub',
    },
    gitTimestamp: function GitTimestamp({ timestamp }) {
        const [dateString, setDateString] = useState(timestamp.toISOString())
        const strings = useSelector(selectTranslations)

        useEffect(() => {
            try {
                setDateString(
                    timestamp.toLocaleDateString(navigator.language, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    }),
                )
            } catch (e) {}
        }, [timestamp])

        return (
            <>
                {strings['blog.lastupdated']} {dateString}
            </>
        )
    },
}

export default config
