import { Button, Flowbite, Modal } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { selectTheme } from '@/features/theme/ThemeSlice'
import { useAppSelector } from '@/util/redux/Hooks'
import { selectTranslations } from '@/features/i18n/TranslatorSlice'
import { customTheme } from '@/util/Theme'
import { ToastLogger } from '@/util/Logger'
import { Build } from '@/interfaces/Build'

interface BuildSha256ModalProps {
    build: Build | undefined
    openModal: string | undefined
    setOpenModal: (modal: string | undefined) => void
}

export default function BuildSha256Modal({
    build,
    openModal,
    setOpenModal,
}: BuildSha256ModalProps) {
    const mode = useSelector(selectTheme)
    const strings = useAppSelector(selectTranslations)

    const copySha256ToClipboard = () => {
        if (build?.fileSha256) {
            navigator.clipboard.writeText(build.fileSha256)
            ToastLogger.info(strings['toast.sha256.copied'])
            setOpenModal(undefined)
        }
    }

    return (
        <Flowbite theme={{ theme: customTheme, mode }}>
            <Modal
                dismissible
                show={openModal === 'sha256'}
                onClose={() => setOpenModal(undefined)}
            >
                <Modal.Header>
                    Build #{build?.number ?? build?.id?.substring(0, 8)}
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <section className={`flex flex-col`}>
                            <h2 className="text-md font-extrabold leading-none text-dark-25 dark:text-white mb-1">
                                File SHA256 Hash
                            </h2>
                            <p className="text-sm leading-relaxed text-gray-500 dark:text-white">
                                {build?.fileSha256}
                            </p>
                        </section>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="blue" onClick={copySha256ToClipboard}>
                        Copy to clipboard
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
