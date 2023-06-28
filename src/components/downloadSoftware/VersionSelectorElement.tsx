import Link from "next/link";
import {useEffect, useState} from "react";
import {AvailableVersions} from "@/interfaces/AvailableVersion";

interface VersionSelectorElementProps {
    versionChangedCallback: (version: AvailableVersions | undefined) => void
}

export default function VersionSelectorElement({versionChangedCallback}: VersionSelectorElementProps) {
    // React state
    const [availableVersions, setAvailableVersions] = useState<AvailableVersions[]>([])
    const [selectedVersion, setSelectedVersion] = useState<AvailableVersions | undefined>()

    // React effect
    useEffect(() => {
        const fetchSources = async () => {
            const buildSources = await fetch('https://new-api.mohistmc.com/api/v1/builds/sources')
            const buildSourcesJson: AvailableVersions[] = await buildSources.json()

            setAvailableVersions(buildSourcesJson)
            !selectedVersion && selectVersion(buildSourcesJson.find((version) => version.name === 'Mohist-1.16.5' && version.source === 'JENKINS'))
        }

        fetchSources().catch((e) => {
            // TODO: Toast error
        })
    }, [])

    function selectVersion(version: AvailableVersions | undefined) {
        setSelectedVersion(version)
        versionChangedCallback(version)
    }

    function handleVersionClick(version: AvailableVersions) {
        selectVersion(version)
    }

    return (
        <>
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">{selectedVersion?.name ?? 'Loading'} <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none"
                                                               stroke="currentColor" viewBox="0 0 24 24"
                                                               xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg></button>
            <div id="dropdown"
                 className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-54 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    {availableVersions.filter(value => value !== selectedVersion).map((version) => (
                        <li key={version.name + ' - ' + version.source}>
                            <Link href="#" onClick={() => handleVersionClick(version)}
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{version.name} - {version.source}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}