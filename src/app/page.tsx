import fs from 'fs';
import path from 'path';
import HomeClient from "@/components/HomeClient";

interface HpageRecommend {
    imageSrc: string
    title: string
    subtitle: string
    descriptionKey: string
    id: string
}

async function getHpageRecommend(): Promise<HpageRecommend[]> {
    try {
        const filePath = path.join(process.cwd(), 'public', 'json', 'hpage_recommend.json');
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error("Data loading failed:", error);
        return [];
    }
}

export default async function Home() {
    const hpageRecommend = await getHpageRecommend();

    return <HomeClient initialData={hpageRecommend} />;
}
