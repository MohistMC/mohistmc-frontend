
// src/app/download/[project]/page.tsx
import DownloadTable from "@/components/resources/DownloadTable";
import { notFound } from 'next/navigation';

// Project configuration mapping
const projectConfigs = {
    mohist: {
        titleKey: "Download Mohist",
        subtitleKey: "Our Minecraft Forge + Bukkit/Spigot server software.",
        initialVersion: "1.20.1",
        availableVersions: [
            "1.12.2", "1.16.5",
            "1.18.2", "1.19.2",
            "1.20.1", "1.20.2"
        ]
    },
    youer: {
        titleKey: "Download Youer",
        subtitleKey: "Our Minecraft NeoForge + Paper server software.",
        initialVersion: "1.21.1",
        availableVersions: [
            "1.21.1"
        ]
    },
    silkard: {
        titleKey: "Download Silkard",
        subtitleKey: "Our Minecraft Fabric + Bukkit/Spigot server software.",
        initialVersion: "1.22",
        availableVersions: [
            "1.22"
        ]
    }
};

const DownloadPage = async ({ params }: any) => {
    const { project } = await params;
    const config = projectConfigs[project as keyof typeof projectConfigs];

    if (!config) {
        notFound();
    }

    return (
        <DownloadTable
            projectName={project}
            availableVersions={config.availableVersions}
            titleKey={config.titleKey}
            subtitleKey={config.subtitleKey}
            initialVersion={config.initialVersion}
        />
    );
};

export default DownloadPage;