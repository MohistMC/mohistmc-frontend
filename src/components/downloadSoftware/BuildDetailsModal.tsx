import { Button, Flowbite, Modal } from 'flowbite-react'
import { Project } from '@/dto/Project'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectTheme } from '@/features/theme/ThemeSlice'
import ProfileImage from '@/components/ProfileImage'
import { useAppSelector } from '@/util/redux/Hooks'
import { selectTranslations } from '@/features/i18n/TranslatorSlice'
import { customTheme } from '@/util/Theme'
import { BuildDto } from '@/dto/Build'

interface BuildDetailsModalProps {
    build: BuildDto | undefined
    project: Project | undefined
    projectVersion: string | undefined
    openModal: string | undefined
    setOpenModal: (modal: string | undefined) => void
}

export default function BuildDetailsModal({
    build,
    project,
    projectVersion,
    openModal,
    setOpenModal,
}: BuildDetailsModalProps) {
    const mode = useSelector(selectTheme)
    const strings = useAppSelector(selectTranslations)

    return (
        <Flowbite theme={{ theme: customTheme, mode }}>
            <Modal
                dismissible
                show={openModal === 'dismissible'}
                onClose={() => setOpenModal(undefined)}
            >
                <Modal.Header>
                    Build {build?.commit.hash.substring(0, 8)}
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <section className={`flex flex-col`}>
                            <h2 className="text-xl font-extrabold leading-none text-dark-25 dark:text-white mb-1">
                                Build information
                            </h2>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Build number / id:{' '}
                                <span
                                    className={`font-bold dark:text-gray-300`}
                                >
                                    {build?.commit.hash.substring(0, 8)}
                                </span>
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                SHA256 Checksum:{' '}
                                <span
                                    className={`font-bold dark:text-gray-300`}
                                >
                                    {build?.file_sha256}
                                </span>
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {strings['downloadSoftware.build.date']}:{' '}
                                <span
                                    className={`font-bold dark:text-gray-300`}
                                >
                                    {new Date(
                                        build?.build_date || 0,
                                    ).toLocaleString()}
                                </span>
                            </p>
                            {build?.loader?.forge_version && (
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Forge version:{' '}
                                    <span
                                        className={`font-bold dark:text-gray-300`}
                                    >
                                        {build?.loader.forge_version}
                                    </span>
                                </p>
                            )}
                            {build?.loader?.neoforge_version && (
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    NeoForge version:{' '}
                                    <span
                                        className={`font-bold dark:text-gray-300`}
                                    >
                                        {build?.loader.neoforge_version}
                                    </span>
                                </p>
                            )}
                        </section>
                        <section className={`flex flex-col gap-1`}>
                            <h2 className="text-xl font-extrabold leading-none text-dark-25 dark:text-white mb-2">
                                GitHub information
                            </h2>
                            <div className="flex items-center space-x-4">
                                {build?.commit.author && (
                                    <ProfileImage
                                        name={build?.commit.author}
                                        githubUrl={`https://github.com/${build?.commit.author}`}
                                        size={14}
                                    />
                                )}
                                <div className="font-medium dark:text-white">
                                    <div>{build?.commit.author}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(
                                            build?.commit.commit_date ?? 0,
                                        ).toLocaleString()}
                                    </div>
                                    <div
                                        className={`text-xs md:text-sm text-gray-500 dark:text-gray-400`}
                                    >
                                        {build?.commit.hash}
                                    </div>
                                </div>
                            </div>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Commit message:{' '}
                                <span
                                    className={`font-bold dark:text-gray-300`}
                                >
                                    {build?.commit.changelog}
                                </span>
                            </p>
                        </section>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link
                        href={`https://api.mohistmc.com/project/${project}/${projectVersion}/builds/${build?.id}/download`}
                    >
                        <Button>Download</Button>
                    </Link>
                    <Button
                        color="gray"
                        onClick={() => setOpenModal(undefined)}
                    >
                        GitHub
                    </Button>
                    <Button
                        color="gray"
                        onClick={() => setOpenModal(undefined)}
                    >
                        {strings['button.close']}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Flowbite>
    )
}
