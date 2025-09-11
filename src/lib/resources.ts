// src/lib/resources.ts
import { getBaseURL } from '@/lib/api';

// 资源数据缓存
let resourcesCache: Array<{id: string, type: string}> | null = null;
let resourcesPromise: Promise<Array<{id: string, type: string}>> | null = null;

/**
 * 加载所有资源数据
 * @returns Promise<Array<{id: string, type: string}>>
 */
export async function loadResources(): Promise<Array<{id: string, type: string}>> {
    // 如果已有缓存，直接返回
    if (resourcesCache) {
        return resourcesCache;
    }

    // 如果正在加载中，返回相同的Promise
    if (resourcesPromise) {
        return resourcesPromise;
    }

    // 创建新的加载Promise
    resourcesPromise = (async () => {
        try {
            const baseURL = getBaseURL();
            const response = await fetch(`${baseURL}/json/resources.json`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: Array<{id: string, type: string}> = await response.json();
            resourcesCache = data;
            return data;
        } catch (error) {
            console.error('Failed to load resources:', error);
            return [];
        } finally {
            // 清除Promise记录
            resourcesPromise = null;
        }
    })();

    return resourcesPromise;
}
