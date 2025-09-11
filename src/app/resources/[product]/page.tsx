import ProductPage from "@/components/resources/ProductPage";
import NormalPage from "@/components/resources/NormalPage";
import { notFound } from "next/navigation";
import { loadProducts } from "@/lib/products";
import { Metadata } from "next";
import { existsSync } from 'fs';
import { join } from 'path';
import {loadProject} from "@/lib/projects";

type ResourceId = string;
type Props = {
    params: Promise<{ product: ResourceId }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

// 检查是否为核心项目（通过检查项目数据文件是否存在）
function isNormalProject(resourceId: string): boolean {
    // 检查是否存在对应的项目数据文件
    const projectFilePath = join(process.cwd(), 'public', 'json', 'projects', `${resourceId}.json`);
    return existsSync(projectFilePath);
}

// 检查是否为产品（通过检查产品数据）
async function isProduct(resourceId: string): Promise<boolean> {
    const products = await loadProducts();
    return resourceId in products;
}

export default async function ResourcePageWrapper({ params }: Props) {
    const { product: resourceId } = await params;

    // 检查是否为核心项目
    if (isNormalProject(resourceId)) {
        return <NormalPage params={{ project: resourceId }} />;
    }

    // 检查是否为产品
    if (await isProduct(resourceId)) {
        const products = await loadProducts();
        const product = products[resourceId];

        if (!product) {
            notFound();
        }

        // 使用标准的 ProductPage 组件
        return (
            <ProductPage
                productName={product.name}
                description={product.description}
                banner={product.banner}
                imageAlt={product.imageAlt}
                downloadLink={`/download/${resourceId}`}
                docsLink={`/docs/${resourceId}`}
                issuesLink={product.issuesLink}
                features={product.features}
                jsonPath={product.jsonPath}
                warning={product.warning}
            />
        );
    }

    // 如果既不是核心项目也不是产品，则显示 404
    notFound();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { product: resourceId } = await params;

    // 检查是否为核心项目
    if (isNormalProject(resourceId)) {
        try {
            const project = await loadProject(resourceId);
            if (project && project.project && project.project.name) {
                return {
                    title: `${project.project.name} - MohistMC`,
                    description: project.project.description || `了解${project.project.name}项目详情`,
                };
            }
        } catch (error) {
            console.error(`Failed to load project metadata for ${resourceId}:`, error);
        }

        // 回退到默认标题
        return {
            title: `${resourceId} - MohistMC`,
        };
    }

    // 检查是否为产品
    if (await isProduct(resourceId)) {
        const products = await loadProducts();
        const product = products[resourceId];

        if (!product) {
            return {
                title: '未知资源',
            };
        }

        return {
            title: `${product.name} - MohistMC`,
            description: product.description,
        };
    }

    return {
        title: '资源未找到',
    };
}
