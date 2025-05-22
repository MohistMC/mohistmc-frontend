export interface BuildDto {
    id: number;
    file_sha256: string;
    build_date: string;
    commit: {
        hash: string;
        changelog: string;
        author: string;
        commit_date: string;
    };
    loader?: {
        forge_version?: string;
        neoforge_version?: string;
        fabric_version?: string;
    };
}