export interface ProjectInfo {
    name: string;
    author: number;
    logo: string;
    introduction: string;
    description: string;
    slogan: string;
    tags: string[];
    status: string;
    license: string;
    openSource: boolean;
    currentVersion: string;
    warning?: string;
}

export interface Feature {
    icon: string;
    title: string;
    description: string;
}

export interface GalleryImage {
    src: string;
    alt: string;
}

export interface ChangelogEntry {
    version: string;
    date: string;
    status: string;
    changes: string[];
    type: 'completed' | 'in-progress';
}

export interface VersionInfo {
    version: string;
    status: string;
    compatibility: string;
    releaseDate: string;
    downloadLink?: string;
    buttonText: string;
}

export interface ProjectData {
    project: ProjectInfo;
    features: Feature[];
    gallery: GalleryImage[];
    changelog: ChangelogEntry[];
    versions: VersionInfo[];
}
