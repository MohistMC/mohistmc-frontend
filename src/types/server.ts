// types/server.ts
export interface Server {
    id: string;
    name: string;
    recommendTag?: string;
    recommendColor?: string;
    text: string;
    img?: string;
    link?: string;
    ip?: string;
    images?: string[];
    onlineMode?: boolean;
    details?: {
        description?: string;
        features?: string[];
        gameModes?: string[];
        community?: string;
    };
}
