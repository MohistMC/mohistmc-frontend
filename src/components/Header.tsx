import ThemeSwitcher from '@/components/ThemeSwitcher'
import LanguageDropElement from '@/components/header/LanguageDropElement'
import { ReactElement, useEffect, useState } from 'react'
import LanguageDropButtonElement from '@/components/header/LanguageDropButtonElement'
import { locales } from '@/i18n/Language'
import {
    LocaleState,
    selectTranslations,
    setLocale
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
import { isDevEnv } from '@/util/Environment'
import { FaGithub, FaDiscord, FaQq } from 'react-icons/fa'
import { getPagesUnderRoute } from 'nextra/context'

export default function Header() {
    const dispatch = useDispatch()
    const router = useRouter()

    // React state
    const [languageButtonState, setLanguageButtonState] =
        useState<ReactElement>(
            <LanguageDropButtonElement locale={locales.current} />
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
                        key={locale.locale}
                        handleLocaleChangeCallback={handleLanguageChange}
                    />
                ))
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
            saveToStorage: boolean = true
        ) {
            locales.current = locale

            setLanguageButtonState(
                <LanguageDropButtonElement locale={locale} />
            )
            setLocalesElementState(
                locales.available
                    .filter((locale) => locale !== locales.current)
                    .map((locale) => (
                        <LanguageDropElement
                            locale={locale}
                            key={locale.locale}
                            handleLocaleChangeCallback={handleLanguageChange}
                        />
                    ))
            )

            // Merge strings from default locale with the selected locale
            const mergedStrings = Object.assign(
                {},
                locales.default.strings,
                locale.strings
            )
            dispatch(setLocale({ ...locale, strings: mergedStrings }))
            saveToStorage &&
            localStorage.setItem('locale', locales.current.locale)
        }

        handleLanguageChange(
            locales.available.find(
                (locale) => locale.locale === getBrowserLanguage()
            ) || locales.current,
            false
        )
    }, [dispatch])

    const [hasDocsRouteChanged, setHasDocsRouteChanged] = useState(false)
    const handleDocsRouting = () => {
        if (router.pathname.includes('mohist/docs') || router.pathname.includes('banner/docs')) {
            // Prevent infinite loop
            if (hasDocsRouteChanged) {
                setHasDocsRouteChanged(false)
                return
            }

            // Redirect to the correct locale only if the locale is not right
            if (!router.pathname.includes(locales.current.locale.toLowerCase())) {
                const otherLanguagesLocaleNames = locales.available
                    .filter(locale => locale.locale !== locales.current.locale)
                    .map(locale => locale.locale.toLowerCase())

                // Check if the selected locale has docs, if not, redirect to the default locale
                const pages = getPagesUnderRoute(`/mohist/docs/${locales.current.locale.toLowerCase()}`)
                const availableDocLocaleToLowerCase = pages.length > 0 ? locales.current.locale.toLowerCase() : locales.default.locale.toLowerCase()

                // Check if the current pathname has a locale, if so, replace it with the new locale, if not, add the new locale
                const newPathname = otherLanguagesLocaleNames.some(locale => router.pathname.includes(locale))
                    ? router.pathname.replace(otherLanguagesLocaleNames.find(locale => router.pathname.includes(locale))!, availableDocLocaleToLowerCase)
                    : router.pathname.replace('/docs', `/docs/${availableDocLocaleToLowerCase}`)

                setHasDocsRouteChanged(true)
                router.push(newPathname).catch()
            }
        }
    }

    useEffect(() => {
        handleDocsRouting()
    }, [router, router.pathname, locales.current])

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
                        <FaGithub className="w-6 h-6" />
                    </Link>
                    <Link
                        href="https://discord.gg/mohistmc"
                        aria-label={'Discord'}
                        className="hidden xl:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-2"
                    >
                        <FaDiscord className="w-6 h-6" />
                    </Link>
                    <Link
                        href="https://qm.qq.com/q/7onbAp4PUQ"
                        aria-label="QQ"
                        className="hidden xl:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                    >
                        <FaQq className="w-5 h-5" />
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
                        <li>
                            <Link
                                href="/contribute"
                                className={`block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent md:dark:bg-transparent dark:border-gray-700 md:bg-transparent ${pageName === 'contribute' ? `md:text-blue-700 md:dark:text-blue-500 bg-blue-700 text-white` : 'hover:bg-gray-100 dark:hover:bg-dark-200'}`}
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
                        {isDevEnv && (
                            <li>
                                <Link
                                    href="/subscription"
                                    className={`block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent md:dark:bg-transparent dark:border-gray-700 md:bg-transparent ${pageName === 'subscription' ? `md:text-blue-700 md:dark:text-blue-500 bg-blue-700 text-white` : 'hover:bg-gray-100 dark:hover:bg-dark-200'}`}
                                >
                                    {strings['button.subscription']}
                                </Link>
                            </li>
                        )}
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
