import { Project } from '@/types/product';
import {getBaseURL} from "@/lib/api";

// 项目数据缓存
let projectsCache: Record<string, Project> | null = null;
const projectPromises: Record<string, Promise<Project | null>> = {}; // 修改类型

export async function loadProject(projectId: string): Promise<Project | null> {
    // 如果已有缓存，直接返回
    if (projectsCache && projectsCache[projectId]) {
        return projectsCache[projectId];
    }

    // 如果正在加载中，返回相同的Promise
    if (projectId in projectPromises) {
        return projectPromises[projectId];
    }

    // 创建新的加载Promise
    projectPromises[projectId] = (async () => {
        try {
            const baseURL = getBaseURL();
            const response = await fetch(`${baseURL}/json/projects/${projectId}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const projectData: Project = await response.json();

            // 缓存项目数据
            if (!projectsCache) {
                projectsCache = {};
            }
            projectsCache[projectId] = projectData;

            return projectData;
        } catch (error) {
            console.error(`Failed to load project data for ${projectId}:`, error);
            return null;
        } finally {
            // 清除Promise记录
            delete projectPromises[projectId];
        }
    })();

    return projectPromises[projectId];
}

// 预加载多个项目
export async function loadProjects(projectIds: string[]): Promise<Record<string, Project>> {
    const projects: Record<string, Project> = {};

    // 并行加载所有项目
    const projectPromises = projectIds.map(id => loadProject(id));
    const results = await Promise.all(projectPromises);

    // 将结果组合成对象
    projectIds.forEach((id, index) => {
        const project = results[index];
        if (project) {
            projects[id] = project;
        }
    });

    return projects;
}
