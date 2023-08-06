import {Button, CustomFlowbiteTheme, Flowbite, Modal} from "flowbite-react";
import {useEffect, useState} from "react";
import {Build} from "@/interfaces/Build";
import {Project} from "@/interfaces/Project";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectTheme} from "@/features/theme/ThemeSlice";

interface BuildDetailsModalProps {
    build: Build | undefined
    project: Project | undefined
    openModal: string | undefined
    setOpenModal: (modal: string | undefined) => void
}

const customTheme: CustomFlowbiteTheme = {
    modal: {
        "root": {
            "base": "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
            "show": {
                "on": "flex bg-gray-900 dark:bg-dark-50 bg-opacity-50 dark:bg-opacity-80",
                "off": "hidden"
            },
            "sizes": {
                "sm": "max-w-sm",
                "md": "max-w-md",
                "lg": "max-w-lg",
                "xl": "max-w-xl",
                "2xl": "max-w-2xl",
                "3xl": "max-w-3xl",
                "4xl": "max-w-4xl",
                "5xl": "max-w-5xl",
                "6xl": "max-w-6xl",
                "7xl": "max-w-7xl"
            },
            "positions": {
                "top-left": "items-start justify-start",
                "top-center": "items-start justify-center",
                "top-right": "items-start justify-end",
                "center-left": "items-center justify-start",
                "center": "items-center justify-center",
                "center-right": "items-center justify-end",
                "bottom-right": "items-end justify-end",
                "bottom-center": "items-end justify-center",
                "bottom-left": "items-end justify-start"
            }
        },
        "content": {
            "base": "relative h-full w-full p-4 md:h-auto",
            "inner": "relative rounded-lg bg-white shadow dark:bg-dark-300 flex flex-col max-h-[90vh]"
        },
        "body": {
            "base": "p-6 flex-1 overflow-auto",
            "popup": "pt-0"
        },
        "header": {
            "base": "flex items-start justify-between rounded-t dark:border-dark-400 border-b p-5",
            "popup": "p-2 border-b-0",
            "title": "text-xl font-medium text-gray-900 dark:text-white",
            "close": {
                "base": "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-dark-300 dark:hover:text-white",
                "icon": "h-5 w-5"
            }
        },
        "footer": {
            "base": "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-dark-400",
            "popup": "border-t"
        },
    }
}

export default function BuildDetailsModal({build, project, openModal, setOpenModal}: BuildDetailsModalProps) {
    const isDark = useSelector(selectTheme)

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
    }, [build])

    return (
        <Flowbite theme={{theme: customTheme, dark: isDark}}>
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
                                <img className="w-14 h-14 rounded-full" src={`https://github.com/${commitAuthor}.png`}
                                     alt=""></img>
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
                    <Button color="gray" onClick={() => setOpenModal(undefined)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Flowbite>
    )
}