export interface CfsColorItem {
    name: string;
    hex: string;
}

export interface CfsColorGroup {
    title: string;
    list: CfsColorItem[];
}

export type CfsColors = CfsColorGroup[];