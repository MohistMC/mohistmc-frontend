export interface User {
    uid: number;
    email: string;
    name: string;
    country: string
    position: string;
    bio: string;
    avatar: string;
    level: number;
    points: number;
    joinDate: string;
    posts: number;
    downloads: number;
    social: {
        github?: string;
        twitter?: string;
    };
    online?: boolean;
    skills: string[];
}
