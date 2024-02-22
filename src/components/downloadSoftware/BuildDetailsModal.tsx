import {Button, Flowbite, Modal} from "flowbite-react";
import {useEffect, useState} from "react";
import {Build} from "@/interfaces/Build";
import {Project} from "@/interfaces/Project";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectTheme} from "@/features/theme/ThemeSlice";
import ProfileImage from "@/components/ProfileImage";
import {useAppSelector} from "@/util/redux/Hooks";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";
import {customTheme} from "@/util/Theme";

interface BuildDetailsModalProps {
    build: Build | undefined
    project: Project | undefined
    openModal: string | undefined
    setOpenModal: (modal: string | undefined) => void
}

export default function BuildDetailsModal({build, project, openModal, setOpenModal}: BuildDetailsModalProps) {
    const mode = useSelector(selectTheme)
    const strings = useAppSelector(selectTranslations);

    const [commitMessage, setCommitMessage] = useState<string | undefined>(undefined)
    const [commitAuthor, setCommitAuthor] = useState<string | undefined>(undefined)
    const [commitDate, setCommitDate] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (build?.gitSha) {
            fetch(`https://api.github.com/repos/MohistMC/${project}/commits/${build?.gitSha}`)
                .then(res => res.json())
                .then(res => {
                    setCommitMessage(res?.commit?.message)
                    setCommitAuthor(res?.commit?.author?.name)
                    setCommitDate(res?.commit?.author?.date)
                })
                .catch(console.error)
        }
    }, [build, project])

    return (
        <Flowbite theme={{theme: customTheme, mode}}>
            <Modal dismissible show={openModal === 'dismissible'} onClose={() => setOpenModal(undefined)}>
                <Modal.Header>Build #{build?.number}</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <section className={`flex flex-col`}>
                            <h2 className="text-xl font-extrabold leading-none text-dark-25 dark:text-white mb-1">Build
                                information</h2>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Build number: <span className={`font-bold dark:text-gray-300`}>{build?.number}</span>
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Build name: <span className={`font-bold dark:text-gray-300`}>{build?.fileName}</span>
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                MD5 Checksum: <span className={`font-bold dark:text-gray-300`}>{build?.fileMd5}</span>
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Build date: <span
                                className={`font-bold dark:text-gray-300`}>{new Date(build?.createdAt || 0).toLocaleString()}</span>
                            </p>
                            {build?.forgeVersion &&
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Forge version: <span
                                    className={`font-bold dark:text-gray-300`}>{build?.forgeVersion}</span>
                                </p>}
                            {build?.neoForgeVersion &&
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    NeoForge version: <span
                                    className={`font-bold dark:text-gray-300`}>{build?.neoForgeVersion}</span>
                                </p>}
                            {build?.fabricLoaderVersion &&
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Fabric version: <span
                                    className={`font-bold dark:text-gray-300`}>{build?.fabricLoaderVersion}</span>
                                </p>}
                        </section>
                        <section className={`flex flex-col gap-1`}>
                            <h2 className="text-xl font-extrabold leading-none text-dark-25 dark:text-white mb-2">GitHub
                                information</h2>
                            <div className="flex items-center space-x-4">
                                {commitAuthor &&
                                    <ProfileImage name={commitAuthor} githubUrl={`https://github.com/${commitAuthor}`}
                                                  size={14}/>}
                                <div className="font-medium dark:text-white">
                                    <div>{commitAuthor}</div>
                                    <div
                                        className="text-sm text-gray-500 dark:text-gray-400">{new Date(commitDate ?? 0).toLocaleString()}</div>
                                    <div
                                        className={`text-xs md:text-sm text-gray-500 dark:text-gray-400`}>{build?.gitSha}</div>
                                </div>
                            </div>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Commit message: <span className={`font-bold dark:text-gray-300`}>{commitMessage}</span>
                            </p>
                        </section>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link href={build?.url || '#'}>
                        <Button>
                            Download
                        </Button>
                    </Link>
                    <Button color="gray" onClick={() => setOpenModal(undefined)}>GitHub</Button>
                    <Button color="gray" onClick={() => setOpenModal(undefined)}>{strings['button.close']}</Button>
                </Modal.Footer>
            </Modal>
        </Flowbite>
    )
}