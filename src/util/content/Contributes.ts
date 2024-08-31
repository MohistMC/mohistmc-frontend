const CONTRIBUTES: Record<string, Contributes> = {
    finance: {
        name: "finance",
        imgSrc: "/finance.webp",
        button_href: "/sponsor",
        button: 'button.learnmore'
    },
    github: {
        name: "github",
        imgSrc: "/code.webp",
        button_href: "https://github.com/MohistMC/Mohist",
        button: 'button.learnmore'
    },
    docs: {
        name: "docs",
        imgSrc: "/docs.webp",
        button_href: "/docs/website",
        button: 'button.learnmore'
    },
    translation: {
        name: "translation",
        imgSrc: "/translate.webp",
        button_href: "https://crowdin.com/project/mohist",
        button: 'button.learnmore'
    }
}

export type Contributes = {
    name: string
    imgSrc: string
    button_href: string
    button: string
}

export default CONTRIBUTES
