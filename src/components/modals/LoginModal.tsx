import {Button, CustomFlowbiteTheme, Flowbite, Modal} from "flowbite-react";
import {useSelector} from "react-redux";
import {selectTheme} from "@/features/theme/ThemeSlice";
import Link from "next/link";
import {HiExternalLink} from "react-icons/hi";
import {useAppSelector} from "@/util/redux/Hooks";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import axios from "axios";
import {useRouter} from "next/router";
import {setCookie} from "cookies-next";
import {customTheme} from "@/util/Theme";

interface LoginModalProps {
    openModal: string | undefined
    setOpenModal: (modal: string | undefined) => void
    mustLogin?: boolean
}

const LoginModal = ({openModal, setOpenModal, mustLogin}: LoginModalProps) => {
    const router = useRouter()
    const mode = useSelector(selectTheme)
    const strings = useAppSelector(selectTranslations);
    const {executeRecaptcha} = useGoogleReCaptcha();

    const handleClicked = async () => {
        if (!executeRecaptcha) return

        const token = await executeRecaptcha();
        if (!token)
            return;

        const result = await axios.post("/api/recaptcha", {
            token,
            name: "test",
        });
        console.log(result);
    }

    return (
        <Flowbite theme={{theme: customTheme, mode}}>
            <Modal dismissible show={openModal === 'dismissible'} onClose={() => setOpenModal(undefined)}>
                <Modal.Header>{strings['loginmodal.title']}</Modal.Header>
                <Modal.Body>
                    <p className="text-sm text-gray-500 dark:text-gray-200 text-center">{strings['loginmodal.subtitle']}</p>
                    <div className={`flex flex-row gap-2 justify-center align-center mt-3`}>
                        <Button onClick={handleClicked}>
                            test
                        </Button>
                        <Button>
                            <Link onClick={() => setCookie('redirect', router.pathname, {path: '/'})}
                                  href={`https://github.com/login/oauth/authorize?client_id=${process.env.NODE_ENV === 'production' ? '38c3c24f71ee7aaff398' : '7772518e5a9dde7cd42f'}`}>
                                {strings['loginmodal.githublogin']}
                                <HiExternalLink className={`inline-block ml-1`}/>
                            </Link>
                        </Button>
                        <Button>
                            <Link onClick={() => setCookie('redirect', router.pathname, {path: '/'})}
                                  href={`https://discord.com/oauth2/authorize?client_id=1145110402313756692&scope=identify&permissions=0&response_type=code&redirect_uri=${process.env.NODE_ENV === 'production' ? 'https://mohistmc.com' : 'http://localhost:2024'}/api/v2/oauth/discord/callback`}>
                                {strings['loginmodal.discordlogin']}
                                <HiExternalLink className={`inline-block ml-1`}/>
                            </Link>
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {!mustLogin && <Button color="gray" onClick={() => setOpenModal(undefined)} aria-label={"Cancel action"}>Cancel</Button>}
                    {mustLogin && <Button color="blue" onClick={() => router.push('/')} aria-label={"Home"}>{strings['loginmodal.return']}</Button>}
                </Modal.Footer>
            </Modal>
        </Flowbite>
    )
}

export default LoginModal