export interface Build {
    number: number
    fileName?: string
    gitSha: string
    forgeVersion?: string
    fabricLoaderVersion?: string
    neoForgeVersion?: string
    fileMd5: string
    originUrl: string
    url: string
    createdAt: number
}

export interface ProjectBuilds {
    projectName: string
    projectVersion: string
    builds: Build[]
}
