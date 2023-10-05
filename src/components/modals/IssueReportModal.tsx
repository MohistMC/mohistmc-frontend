import {Button, CustomFlowbiteTheme, Dropdown, Flowbite, Modal} from "flowbite-react";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectTheme} from "@/features/theme/ThemeSlice";
import {HiExternalLink} from "react-icons/hi";
import {useAppSelector} from "@/util/redux/Hooks";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";
import {customTheme} from "@/util/Theme";

interface LoginModalProps {
    openIssueModal: string | undefined
    setOpenIssueModal: (modal: string | undefined) => void
    openLoginModal: string | undefined
    setOpenLoginModal: (modal: string | undefined) => void
}

const IssueReportModal = ({openIssueModal, setOpenIssueModal, setOpenLoginModal, openLoginModal}: LoginModalProps) => {
    const isDark = useSelector(selectTheme)
    const strings = useAppSelector(selectTranslations);

    const reportViaWebsite = () => {
        setOpenIssueModal(undefined)
        setOpenLoginModal('dismissible')
    }

    return (
        <Flowbite theme={{theme: customTheme, dark: isDark}}>
            <Modal dismissible show={openIssueModal === 'dismissible'} onClose={() => setOpenIssueModal(undefined)}>
                <Modal.Header>{strings['issuemodal.title']}</Modal.Header>
                <Modal.Body>
                    <p className="text-sm text-gray-500 dark:text-gray-200 text-center">
                        {strings['issuemodal.subtitle']}</p>
                    <div className={`flex flex-row gap-2 justify-center align-center mt-3`}>
                        <Dropdown label={strings['issuemodal.report.github']} color="gray">
                            <Dropdown.Item>
                                <Link href={`https://github.com/MohistMC/Mohist/issues`}>
                                    Mohist
                                </Link>
                                <HiExternalLink className="ml-2 h-5 w-5"/>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link href={`https://github.com/MohistMC/Banner/issues`}>
                                    Banner
                                </Link>
                                <HiExternalLink className="ml-2 h-5 w-5"/>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link href={`https://github.com/MohistMC/Website/issues`}>
                                    {strings['issuemodal.dropdown.item.website']}
                                </Link>
                                <HiExternalLink className="ml-2 h-5 w-5"/>
                            </Dropdown.Item>
                        </Dropdown>
                        <Button onClick={reportViaWebsite}>
                            {strings['issuemodal.report.website']}
                        </Button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-200 text-center mt-5">{strings['issuemodal.discord.text']}</p>
                    <div className={`flex flex-row gap-2 justify-center align-center mt-3`}>
                        <Button color="gray">
                            <Link href={`https://discord.gg/MohistMC`}>
                                {strings['social.discord']}
                            </Link>
                            <HiExternalLink className="ml-2 h-5 w-5"/>
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={() => setOpenIssueModal(undefined)}>{strings['button.close']}</Button>
                </Modal.Footer>
            </Modal>
        </Flowbite>
    )
}

export default IssueReportModal