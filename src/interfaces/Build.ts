export interface Build {
    id: string;
    hasBeenBuilt: boolean;
    disabled?: boolean;
    buildSourceName: string;
    buildMessage: string;
    gitSha: string;
    gitFullSha: string;
    forgeVersion: string;
    fileMd5: string;
    originUrl: string;
    url?: string;
    createdAt: number;
}