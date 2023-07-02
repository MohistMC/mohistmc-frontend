export interface Build {
    number: number;
    gitSha: string;
    forgeVersion: string;
    fileMd5: string;
    originUrl: string;
    url: string;
    createdAt: number;
}

export interface ProjectBuilds {
    projectName: string;
    projectVersion: string;
    builds: Build[];
}