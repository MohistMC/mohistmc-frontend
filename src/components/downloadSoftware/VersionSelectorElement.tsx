import { useEffect, useState } from 'react'
import { Project } from '@/interfaces/Project'
import { Dropdown } from 'flowbite-react'
import { useRouter } from 'next/router'
import { getAPIEndpoint } from '@/util/Environment'

interface VersionSelectorElementProps {
    selectedVersion: string | undefined
    setSelectedVersion: (version: string | undefined) => void
    software: Project | undefined
}

export interface ProjectVersions {
    versions: string[]
}

export default function VersionSelectorElement({
    selectedVersion,
    setSelectedVersion,
    software,
}: VersionSelectorElementProps) {
    // React state
    const [availableVersions, setAvailableVersions] = useState<string[]>([])

    const router = useRouter()

    // React effect
    useEffect(() => {
        const fetchSources = async () => {
            const buildSources = await fetch(
                `${getAPIEndpoint()}/projects/${software}`,
            )
            const buildSourcesJson: ProjectVersions = await buildSources.json()

            setAvailableVersions(buildSourcesJson?.versions || [])
            const { projectVersion } = router.query as {
                projectVersion: string | undefined
            }

            if (!selectedVersion) {
                if (
                    software === Project.Mohist ||
                    software === Project.Banner
                ) {
                    setSelectedVersion(
                        buildSourcesJson?.versions.find(
                            (version) => version === projectVersion,
                        ) ||
                            buildSourcesJson?.versions.find(
                                (version) => version === '1.20.1',
                            ),
                    )
                } else {
                    if (buildSourcesJson?.versions.length > 0)
                        setSelectedVersion(buildSourcesJson?.versions[0])
                    // TODO: Else toast error
                }
            }
        }

        software &&
            fetchSources().catch((e) => {
                // TODO: Toast error
            })
    }, [software])

    return (
        <Dropdown label={selectedVersion ?? 'Loading'} dismissOnClick={true}>
            {availableVersions
                .filter((value) => value !== selectedVersion)
                .map((version) => (
                    <Dropdown.Item
                        key={version}
                        onClick={() => setSelectedVersion(version)}
                    >
                        {version}
                    </Dropdown.Item>
                ))}
        </Dropdown>
    )
}
