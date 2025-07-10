import { useEffect, useState } from 'react'
import { Project } from '@/dto/Project'
import { Dropdown } from 'flowbite-react'
import { useRouter } from 'next/router'
import { getAPIEndpoint } from '@/util/Environment'

interface VersionSelectorElementProps {
    selectedVersion: string | undefined
    setSelectedVersion: (version: string | undefined) => void
    software: Project | undefined
}

export interface ProjectVersion {
    name: string
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
        const fetchVersions = async () => {
            const versionsRequest = await fetch(
                `${getAPIEndpoint()}/project/${software}/versions`,
            )
            const versionsJson: ProjectVersion[] = await versionsRequest.json()
            const versions = versionsJson.map((version => version.name))

            setAvailableVersions(versions || [])
            const { projectVersion } = router.query as {
                projectVersion: string | undefined
            }

            if (!selectedVersion) {
                if (
                    software === Project.Mohist
                ) {
                    setSelectedVersion(
                        versions.find(
                            (version) => version === projectVersion,
                        ) ||
                        versions.find(
                                (version) => version === '1.20.1',
                            ),
                    )
                } else {
                    if (versions?.length > 0)
                        setSelectedVersion(versions[0])
                    // TODO: Else toast error
                }
            }
        }

        software &&
            fetchVersions().catch((e) => {
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
