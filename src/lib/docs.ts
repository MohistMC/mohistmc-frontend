export type DocItem = {
    id: string;
    title: string;
    path: string;
    children?: DocItem[];
};