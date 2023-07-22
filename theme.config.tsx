import React, {useEffect, useState} from 'react'
import {DocsThemeConfig, useConfig} from 'nextra-theme-docs'
import {useRouter} from "next/router";

const config: DocsThemeConfig = {
    docsRepositoryBase: 'https://github.com/MohistMC/website/tree/frontend',
    footer: {
        component: function () {
            return <></>
        }
    },
    useNextSeoProps: function SEO() {
        const router = useRouter();
        const { frontMatter } = useConfig();

        const section = router?.pathname.startsWith("/mohist") ? 'Mohist' : 'Banner';
        const defaultTitle = frontMatter.overrideTitle || section;

        return {
            description: frontMatter.description,
            defaultTitle,
            titleTemplate: `%s – ${section}`,
        };
    },
    themeSwitch: {
        component: null
    },
    editLink: {
        text: "Edit this page on GitHub",
    },
    gitTimestamp({ timestamp }) {
        const [dateString, setDateString] = useState(timestamp.toISOString());

        useEffect(() => {
            try {
                setDateString(
                    timestamp.toLocaleDateString(navigator.language, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })
                );
            } catch (e) {}
        }, [timestamp]);

        return <>Last updated on {dateString}</>;
    },
}

export default config