export interface ColorItem {
    id: string;
    hex: string;
    name: string;
    intro: string;
    figure?: string;
}

export interface ColorGroup {
    name: string;
    hex: string;
    colors: ColorItem[];
    RGB: number[];
    id: number;
}