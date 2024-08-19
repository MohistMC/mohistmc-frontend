import ThemeSwitcher from '@/components/ThemeSwitcher'
import LanguageDropElement from '@/components/header/LanguageDropElement'
import { ReactElement, useEffect, useState } from 'react'
import LanguageDropButtonElement from '@/components/header/LanguageDropButtonElement'
import { locales } from '@/i18n/Language'
import { isCN } from '@/util/LocaleHelper'
import {
    LocaleState,
    selectTranslations,
    setLocale,
} from '@/features/i18n/TranslatorSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import UserDropdown from '@/components/header/UserDropdown'
import IssueReportModal from '@/components/modals/IssueReportModal'
import LoginModal from '@/components/modals/LoginModal'
import { useAppSelector } from '@/util/redux/Hooks'
import { selectUser } from '@/features/user/UserSlice'
import Image from 'next/image'
import mohistLogo from '../../public/mohistLogo.webp'

export default function Header() {
    const dispatch = useDispatch()

    // React state
    const [languageButtonState, setLanguageButtonState] =
        useState<ReactElement>(
            <LanguageDropButtonElement locale={locales.current} />,
        )
    const [localesElementState, setLocalesElementState] = useState<
        ReactElement[]
    >([])
    const [menuVisibilityState, setMenuVisibilityState] =
        useState<boolean>(false)
    const [openIssueModal, setOpenIssueModal] = useState<string | undefined>()
    const [openLoginModal, setOpenLoginModal] = useState<string | undefined>()

    // React redux
    const strings = useSelector(selectTranslations)
    const user = useAppSelector(selectUser)

    // React effect
    useEffect(() => {
        setLocalesElementState(
            locales.available
                .filter((locale) => locale !== locales.current)
                .map((locale) => (
                    <LanguageDropElement
                        locale={locale}
                        key={locale.initials}
                        handleLocaleChangeCallback={handleLanguageChange}
                    />
                )),
        )

        const getBrowserLanguage = () => {
            return (
                localStorage.getItem('locale') ||
                (navigator.language.includes('-')
                    ? navigator.language.split('-')[0]
                    : navigator.language)
            )
        }

        function handleLanguageChange(
            locale: LocaleState,
            saveToStorage: boolean = true,
        ) {
            locales.current = locale

            setLanguageButtonState(
                <LanguageDropButtonElement locale={locale} />,
            )
            setLocalesElementState(
                locales.available
                    .filter((locale) => locale !== locales.current)
                    .map((locale) => (
                        <LanguageDropElement
                            locale={locale}
                            key={locale.initials}
                            handleLocaleChangeCallback={handleLanguageChange}
                        />
                    )),
            )

            // Merge strings from default locale with the selected locale
            const mergedStrings = Object.assign(
                {},
                locales.default.strings,
                locale.strings,
            )
            dispatch(setLocale({ ...locale, strings: mergedStrings }))
            saveToStorage &&
                localStorage.setItem('locale', locales.current.initials)
        }

        handleLanguageChange(
            locales.available.find(
                (locale) => locale.initials === getBrowserLanguage(),
            ) || locales.current,
            false,
        )
    }, [dispatch])

    const router = useRouter()
    const pageName = router.pathname.split('/')[1]

    // On route change
    useEffect(() => {
        setMenuVisibilityState(false)
    }, [router.pathname])

    const AccountButtons = (rootCss: string, buttonCss: string = '') => {
        return (
            <div className={rootCss}>
                {user.isLogged && <UserDropdown />}
                {/*!user.isLogged && <Button className={buttonCss} onClick={() => setOpenIssueModal('dismissible')}>
                    Report an issue
                </Button>*/}
            </div>
        )
    }

    return (
        <nav className="bg-white border-gray-200 dark:bg-dark-50 fixed top-0 w-full z-30 drop-shadow-md">
            <IssueReportModal
                openIssueModal={openIssueModal}
                setOpenIssueModal={setOpenIssueModal}
                openLoginModal={openLoginModal}
                setOpenLoginModal={setOpenLoginModal}
            />
            <LoginModal
                openModal={openLoginModal}
                setOpenModal={setOpenLoginModal}
            />
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center">
                    <Image
                        src={mohistLogo}
                        className="h-8 w-auto mr-3"
                        alt="MohistMC Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-dark-50 dark:text-white">
                        MohistMC
                    </span>
                </Link>
                <div className="flex items-center md:order-2">
                    <Link
                        href="https://github.com/MohistMC"
                        aria-label="Github"
                        className="hidden xl:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-2"
                    >
                        <svg
                            className="w-5 h-5 "
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
                    <Link
                        href="https://discord.gg/mohistmc"
                        aria-label={'Discord'}
                        className="hidden xl:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-2"
                    >
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="discord"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                        >
                            <path
                                fill="currentColor"
                                d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
                            ></path>
                        </svg>
                    </Link>
                    <Link
                        href="https://qm.qq.com/q/7onbAp4PUQ"
                        aria-label="QQ"
                        className="hidden xl:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                    >
                        <svg
                            className="w-5 h-5 "
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="qq"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill="currentColor"
                                d="M433.754 420.445c-11.526 1.393-44.86-52.741-44.86-52.741 0 31.345-16.136 72.247-51.051 101.786 16.842 5.192 54.843 19.167 45.803 34.421-7.316 12.343-125.51 7.881-159.632 4.037-34.122 3.844-152.316 8.306-159.632-4.037-9.045-15.25 28.918-29.214 45.783-34.415-34.92-29.539-51.059-70.445-51.059-101.792 0 0-33.334 54.134-44.859 52.741-5.37-.65-12.424-29.644 9.347-99.704 10.261-33.024 21.995-60.478 40.144-105.779C60.683 98.063 108.982.006 224 0c113.737.006 163.156 96.133 160.264 214.963 18.118 45.223 29.912 72.85 40.144 105.778 21.768 70.06 14.716 99.053 9.346 99.704z"
                            ></path>
                        </svg>
                    </Link>
                    <button
                        data-collapse-toggle="mobile-menu-language-select"
                        type="button"
                        aria-label="Toggle menu"
                        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-300 dark:hover:bg-dark-200 dark:focus:ring-gray-600"
                        aria-controls="mobile-menu-language-select"
                        aria-expanded="false"
                        onClick={() => {
                            // Override the default behavior of the button
                            setMenuVisibilityState(!menuVisibilityState)
                        }}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    <ThemeSwitcher className={`ml-2`} />
                    {AccountButtons('hidden md:block', 'ml-3')}
                </div>
                <div
                    className={`${!menuVisibilityState ? 'hidden' : ''} w-full md:flex md:w-auto md:order-1`}
                    id="mobile-menu-language-select"
                >
                    <ul className="flex flex-col md:items-center font-medium p-4 md:p-0 mt-4 border border-dark-200 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-dark-50">
                        <li>
                            <button
                                id="dropdownNavbarLink"
                                data-dropdown-toggle="dropdownNavbar"
                                aria-label="Toggle software menu"
                                data-dropdown-trigger="hover"
                                className={`flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 md:dark:bg-transparent md:dark:hover:bg-transparent md:bg-transparent ${pageName === 'software' ? `md:text-blue-700 md:dark:text-blue-500 bg-blue-700 text-white` : 'dark:hover:bg-dark-200 hover:bg-gray-100'}`}
                            >
                                {strings['button.software']}
                                <svg
                                    className="w-5 h-5 ml-1"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <div
                                id="dropdownNavbar"
                                className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-dark-100 dark:divide-gray-600"
                            >
                                <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownLargeButton"
                                >
                                    <li>
                                        <Link
                                            href="/software/mohist"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-200 dark:hover:text-white"
                                        >
                                            Mohist
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/software/banner"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-200 dark:hover:text-white"
                                        >
                                            Banner
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/software/youer"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-200 dark:hover:text-white"
                                        >
                                            Youer
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link
                                href="/downloads"
                                className={`block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent md:dark:bg-transparent dark:border-gray-700 md:bg-transparent ${pageName === 'downloads' || pageName === 'downloadSoftware' ? `md:text-blue-700 md:dark:text-blue-500 bg-blue-700 text-white` : 'hover:bg-gray-100 dark:hover:bg-dark-200'}`}
                            >
                                {strings['button.downloads']}
                            </Link>
                        </li>
                        {isCN(locales.current) && (
                            <li>
                                <Link
                                    href="/shop"
                                    className={`block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent md:dark:bg-transparent dark:border-gray-700 md:bg-transparent ${pageName === 'sponsor' ? `md:text-blue-700 md:dark:text-blue-500 bg-blue-700 text-white` : 'hover:bg-gray-100 dark:hover:bg-dark-200'}`}
                                >
                                    {strings['button.shop']}
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link
                                href="/contribute"
                                className={`block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent md:dark:bg-transparent dark:border-gray-700 md:bg-transparent ${pageName === 'sponsor' ? `md:text-blue-700 md:dark:text-blue-500 bg-blue-700 text-white` : 'hover:bg-gray-100 dark:hover:bg-dark-200'}`}
                            >
                                {strings['button.contribute']}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/blog"
                                className={`block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent md:dark:bg-transparent dark:border-gray-700 md:bg-transparent ${pageName === 'blog' ? `md:text-blue-700 md:dark:text-blue-500 bg-blue-700 text-white` : 'hover:bg-gray-100 dark:hover:bg-dark-200'}`}
                            >
                                {strings['button.blog']}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/mohistmc-api"
                                className={`block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent md:dark:bg-transparent dark:border-gray-700 md:bg-transparent ${pageName === 'mohistmc-api' ? `md:text-blue-700 md:dark:text-blue-500 bg-blue-700 text-white` : 'hover:bg-gray-100 dark:hover:bg-dark-200'}`}
                            >
                                {strings['button.api']}
                            </Link>
                        </li>
                        {AccountButtons('md:hidden', 'ml-2 mt-1 mb-2')}
                        {languageButtonState}
                        <div
                            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-dark-100"
                            id="language-dropdown-menu"
                        >
                            <ul className="py-2 font-medium" role="none">
                                {localesElementState}
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
