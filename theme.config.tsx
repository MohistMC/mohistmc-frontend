import React from 'react'
import {DocsThemeConfig} from 'nextra-theme-docs'

const config: DocsThemeConfig = {
    docsRepositoryBase: 'https://github.com/MohistMC/website/tree/frontend',
    footer: {
        component: function () {
            return <></>
        }
    },
    useNextSeoProps() {
        return {
            titleTemplate: `%s | MohistMC`,
        }
    },
    themeSwitch: {
        component: function () {
            return <></>
        }
    },
}

export default config