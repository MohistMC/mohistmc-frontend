import {useEffect, useState} from "react";
import {Project} from "@/interfaces/Project";
import {Dropdown} from "flowbite-react";

interface VersionSelectorElementProps {
    selectedVersion: string | undefined
    setSelectedVersion: (version: string | undefined) => void
    software: Project | undefined
}

interface ProjectVersions {
    versions: string[]
}

export default function VersionSelectorElement({
                                                   selectedVersion,
                                                   setSelectedVersion,
                                                   software
                                               }: VersionSelectorElementProps) {
    // React state
    const [availableVersions, setAvailableVersions] = useState<string[]>([]);

    // React effect
    useEffect(() => {
        const fetchSources = async () => {
            const buildSources = await fetch(`https://mohistmc.com/api/v2/projects/${software}`)
            const buildSourcesJson: ProjectVersions = await buildSources.json()

            setAvailableVersions(buildSourcesJson?.versions || [])
            if(!selectedVersion) {
                if(software === Project.Mohist)
                    setSelectedVersion(buildSourcesJson?.versions.find((version) => version === '1.16.5'))
                else {
                    if(buildSourcesJson?.versions.length > 0)
                        setSelectedVersion(buildSourcesJson?.versions[0])
                    // TODO: Else toast error
                }
            }
        }

        software && fetchSources().catch((e) => {
            // TODO: Toast error
        })
    }, [software])

    return (
        <Dropdown label={selectedVersion ?? 'Loading'} dismissOnClick={true} className={`bg-blue-600`}>
            {availableVersions.filter(value => value !== selectedVersion).map((version) => (
                <Dropdown.Item key={version} onClick={() => setSelectedVersion(version)}>
                    {version}
                </Dropdown.Item>
            ))}
        </Dropdown>
    )
}