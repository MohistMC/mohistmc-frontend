import {Button, CustomFlowbiteTheme, Flowbite, Modal} from "flowbite-react";
import {useSelector} from "react-redux";
import {selectTheme} from "@/features/theme/ThemeSlice";
import {useAppSelector} from "@/util/redux/Hooks";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";
import {customTheme} from "@/util/Theme";

interface ChoiceIssueModalProps {
    openIssueModal: string | undefined
    setOpenIssueModal: (modal: string | undefined) => void
}

const ChoiceIssueModal = ({openIssueModal, setOpenIssueModal}: ChoiceIssueModalProps) => {
    const isDark = useSelector(selectTheme)
    const strings = useAppSelector(selectTranslations);

    return (
        <Flowbite theme={{theme: customTheme, dark: isDark}}>
            <Modal dismissible show={openIssueModal === 'dismissible'} onClose={() => setOpenIssueModal(undefined)}>
                <Modal.Header>You are logged in! Choose an action</Modal.Header>
                <Modal.Body>
                    <div className={`flex flex-row gap-2 justify-center align-center mt-3`}>
                        <Button>
                            Open an issue
                        </Button>
                        <Button>
                            View existing issues
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenIssueModal(undefined)}>Sign out</Button>
                    <Button color="gray" onClick={() => setOpenIssueModal(undefined)}>{strings['button.close']}</Button>
                </Modal.Footer>
            </Modal>
        </Flowbite>
    )
}

export default ChoiceIssueModal