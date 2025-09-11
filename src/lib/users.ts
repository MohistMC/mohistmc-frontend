// src/lib/users.ts
import { User } from '@/types/user';
import {getBaseURL} from "@/lib/api";

// 用户数据缓存 - 使用uid作为键
let usersCache: Record<number, User> | null = null;
const userPromises: Record<number, Promise<User | null>> = {};

// 模拟从API或数据库加载所有用户数据
async function fetchAllUsers(): Promise<Record<number, User>> {
    try {
        const baseURL = getBaseURL();
        const response = await fetch(`${baseURL}/json/users.json`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();

        // 转换数据结构，使用uid作为键
        const usersData: Record<number, User> = {};
        Object.keys(rawData).forEach(key => {
            const user = rawData[key];
            if (user && typeof user === 'object' && user.uid !== undefined) {
                usersData[user.uid] = user;
            }
        });

        return usersData;
    } catch (error) {
        return {};
    }
}

// 预加载所有用户数据
async function preloadUsers(): Promise<Record<number, User>> {

    if (usersCache) {
        return usersCache;
    }

    usersCache = await fetchAllUsers();
    return usersCache;
}

/**
 * 通过用户UID加载用户数据
 * @param uid 用户唯一标识符
 * @returns Promise<User | null>
 */
export async function loadUser(uid: number): Promise<User | null> {
    // 如果已有缓存，直接返回
    if (usersCache && usersCache[uid]) {
        return usersCache[uid];
    }

    // 如果正在加载中，返回相同的Promise
    if (uid in userPromises) {
        return userPromises[uid];
    }

    // 创建新的加载Promise
    userPromises[uid] = (async () => {
        try {
            // 预加载所有用户数据
            await preloadUsers();

            // 检查用户是否存在
            if (usersCache && usersCache[uid]) {
                return usersCache[uid];
            }
            return null;
        } catch (error) {
            return null;
        } finally {
            // 清除Promise记录
            delete userPromises[uid];
        }
    })();

    return userPromises[uid];
}

/**
 * 批量加载用户数据
 * @param uids 用户ID数组
 * @returns Promise<Record<number, User>>
 */
export async function loadUsers(uids: number[]): Promise<Record<number, User>> {
    const users: Record<number, User> = {};

    // 预加载所有用户数据
    await preloadUsers();

    // 过滤出存在的用户
    uids.forEach(uid => {
        if (usersCache && usersCache[uid]) {
            users[uid] = usersCache[uid];
        }
    });

    return users;
}

/**
 * 获取所有用户数据
 * @returns Promise<Record<number, User>>
 */
export async function loadAllUsers(): Promise<Record<number, User>> {
    return await preloadUsers();
}
