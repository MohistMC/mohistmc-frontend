export interface Product {
    name: string;
    author: number;
    developers: string[];
    icon: string;
    introduction: string;
    tags?: string[];
    description: string;
    banner: string;
    imageAlt: string;
    issuesLink: string;
    jsonPath: string;
    features: ProductFeature[];
    warning?: ProductWarning; // 可选属性
}

interface ProductWarning {
    text: string;
    linkText: string;
    linkHref: string;
}

interface ProductFeature {
    title: string;
    description: string;
    color: string;
}


export interface Project {
    project: {
        name: string;
        author: number;
        developers: string[];
        logo: string;
        banner: string;
        introduction: string;
        description: string;
        slogan: string;
        tags: string[];
        status: string;
        license: string;
        openSource: boolean;
        currentVersion: string;
        warning: string;
    };
    features: Array<{
        icon: string;
        title: string;
        description: string;
    }>;
    gallery: Array<{
        src: string;
        alt: string;
    }>;
    changelog: Array<{
        version: string;
        date: string;
        status: string;
        changes: string[];
        type: string;
    }>;
    versions: Array<{
        version: string;
        status: string;
        compatibility: string;
        releaseDate: string;
        buttonText: string;
    }>;
    author: {
        name: string;
        role: string;
    };
}
