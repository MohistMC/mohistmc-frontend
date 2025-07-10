import Link from 'next/link'
import { BuildDto } from '@/dto/Build'
import { Project } from '@/dto/Project'
import DownloadButton from '@/components/downloadSoftware/DownloadButton'
import { Button } from 'flowbite-react'
import { getTimeAgoInText } from '@/util/DateUtil'

interface TableBuildElementProps {
    build: BuildDto
    isLatest: boolean
    project: Project
    projectVersion: string
    indexOnPage: number
    strings: Record<any, any>
    setOpenModal: (value: string | undefined) => void
    setModalBuild: (value: BuildDto | undefined) => void
}

export default function TableBuildElement({
    build,
    isLatest,
    project,
    projectVersion,
    indexOnPage,
    strings,
    setOpenModal,
    setModalBuild,
}: TableBuildElementProps) {
    if (!build) return <></>

    const buildGithubCommitUrl = `https://github.com/MohistMC/${project}/commit/${build.commit.hash}`

    const handleModalOpen = () => {
        setModalBuild(build)
        setOpenModal('dismissible')
    }

    const handleSha256ModalOpen = () => {
        setModalBuild(build)
        setOpenModal('sha256')
    }

    return (
        <tr
            key={build.commit.hash}
            className={`border-b ${indexOnPage % 2 === 0 ? 'dark:bg-dark-100 bg-white' : 'dark:bg-dark-150 bg-gray-50'} dark:border-gray-700`}
        >
            <th
                scope="row"
                className="md:px-6 px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
                <Link
                    href="#"
                    onClick={handleModalOpen}
                    className={`bg-green-100 text-xs font-medium items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 mr-2 ${isLatest ? 'text-green-800 dark:text-green-400' : 'text-blue-800 dark:text-blue-400'}`}
                >
                    {build?.commit?.hash?.substring(0, 8)}
                </Link>
            </th>
            <td className="px-6 py-4 hidden md:table-cell">
                <Button
                    onClick={handleSha256ModalOpen}
                    aria-label="Reveal sha256"
                    className="inline-flex justify-center items-center py-.5 px-2 text-sm font-medium text-center text-white rounded-lg bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900"
                >
                    {strings['downloadSoftware.see.sha256']}
                </Button>
            </td>
            <td className="px-6 py-4 hidden md:table-cell">
                {getTimeAgoInText(new Date(build.build_date), strings)}
            </td>
            <td className="px-6 py-4 hidden md:table-cell">
                {project === Project.Mohist && (
                    <div className={`flex flex-col`}>
                        {build.loader?.forge_version && (
                            <p>Forge: {build.loader?.forge_version}</p>
                        )}
                        {build.loader?.neoforge_version && (
                            <p>NeoForge: {build.loader?.neoforge_version}</p>
                        )}
                        {!build.loader?.forge_version &&
                            !build.loader?.neoforge_version && <p>Unknown</p>}
                    </div>
                )}
            </td>
            <td className="md:px-6 px-3 py-4 text-right">
                <DownloadButton
                    build={build}
                    strings={strings}
                    project={project}
                    projectVersion={projectVersion}
                />

                <Button
                    onClick={handleModalOpen}
                    aria-label="See more"
                    className="md:hidden inline-flex justify-center items-center py-2 px-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                >
                    {strings['downloadSoftware.seemore']}
                </Button>
            </td>
            <td className="hidden px-6 py-4 text-right md:table-cell">
                <Link
                    href={buildGithubCommitUrl}
                    className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 text-sm dark:hover:opacity-75"
                >
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="github"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 496 512"
                    >
                        <path
                            fill="currentColor"
                            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                        ></path>
                    </svg>
                </Link>
            </td>
        </tr>
    )
}
