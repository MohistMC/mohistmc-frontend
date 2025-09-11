import {Product} from "@/types/product";
import {getBaseURL} from "@/lib/api";

let productsCache: Record<string, Product> | null = null;

export async function loadProducts(): Promise<Record<string, Product>> {
    if (productsCache) {
        return productsCache;
    }

    try {
        // 客户端：使用 fetch API
        const baseURL = getBaseURL();
        const productsURL = `${baseURL}/json/products.json`;
        const response = await fetch(productsURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        productsCache = data;
        return data;
    } catch (error) {
        console.error('Failed to load products:', error);
        return {};
    }
}
