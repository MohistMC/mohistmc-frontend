import { Button, Flowbite, Modal } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { selectTheme } from '@/features/theme/ThemeSlice'
import { useAppSelector } from '@/util/redux/Hooks'
import { selectTranslations } from '@/features/i18n/TranslatorSlice'
import { customTheme } from '@/util/Theme'

interface NoteToHostsModalProps {
    openHostModal: string | undefined
    setOpenHostModal: (modal: string | undefined) => void
}

const NoteToHostsModal = ({
    openHostModal,
    setOpenHostModal,
}: NoteToHostsModalProps) => {
    const mode = useSelector(selectTheme)
    const strings = useAppSelector(selectTranslations)

    return (
        <Flowbite theme={{ theme: customTheme, mode }}>
            <Modal
                dismissible
                show={openHostModal === 'dismissible'}
                onClose={() => setOpenHostModal(undefined)}
            >
                <Modal.Header>Note to host provider</Modal.Header>
                <Modal.Body>
                    <p className="text-sm text-gray-500 dark:text-gray-200 text-center mb-3">
                        Hello, if you are currently reviewing this, it is likely
                        that you are either a developer or the proprietor of a
                        hosting service. If you are interested in incorporating
                        one of our software products to offer to your users,
                        there are certain critical details that you should take
                        into consideration to enhance the support experience.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-200 text-center mb-3">
                        Both Mohist and Banner are actively developed by our
                        team, but it&apos;s important to note that these
                        software products are still in development.
                        Consequently, you may encounter an increased volume of
                        support requests due to compatibility issues with our
                        software, such as mods or plugins not functioning as
                        expected. Unless you possess substantial development
                        expertise, we recommend directing your users to our
                        Discord server or our Github issues pages so that we can
                        assist them in resolving their issues and refine our
                        software accordingly.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-200 text-center mb-3">
                        For those seeking stability, we suggest integrating
                        Mohist 1.12.2 and Mohist 1.16.5, as they are the most
                        stable versions available. If desired, you can also
                        incorporate other versions; however, please be aware
                        that they may exhibit lower stability and potentially
                        generate a higher number of support requests.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-200 text-center mb-3">
                        For any inquiries or further assistance, please do not
                        hesitate to contact us via email or through our Discord
                        server.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color="gray"
                        onClick={() => setOpenHostModal(undefined)}
                    >
                        {strings['button.close']}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Flowbite>
    )
}

export default NoteToHostsModal
