import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageDropElement from "@/components/header/LanguageDropElement";
import {ReactElement, useEffect, useState} from "react";
import LanguageDropButtonElement from "@/components/header/LanguageDropButtonElement";
import {locales} from "@/i18n/Language";
import {LocaleState, selectTranslations, setLocale} from "@/features/i18n/TranslatorSlice";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import Link from "next/link";
import UserDropdown from "@/components/header/UserDropdown";
import {Button} from "flowbite-react";
import IssueReportModal from "@/components/modals/IssueReportModal";
import LoginModal from "@/components/modals/LoginModal";
import {useAppSelector} from "@/util/redux/Hooks";
import {selectUser} from "@/features/user/UserSlice";

export default function Header() {
    // React state
    const [languageButtonState, setLanguageButtonState] = useState<ReactElement>(<LanguageDropButtonElement
        locale={locales.current}/>);
    const [localesElementState, setLocalesElementState] = useState<ReactElement[]>([]);
    const [menuVisibilityState, setMenuVisibilityState] = useState<boolean>(false);
    const [openIssueModal, setOpenIssueModal] = useState<string | undefined>();
    const [openLoginModal, setOpenLoginModal] = useState<string | undefined>();

    // React redux
    const dispatch = useDispatch();
    const strings = useSelector(selectTranslations);
    const user = useAppSelector(selectUser)

    // React effect
    useEffect(() => {
        setLocalesElementState(locales.available.filter(locale => locale !== locales.current).map(locale =>
            <LanguageDropElement locale={locale} key={locale.initials}
                                 handleLocaleChangeCallback={handleLanguageChange}/>));

        const getBrowserLanguage = () => {
            return localStorage.getItem('locale') || (navigator.language.includes('-') ? navigator.language.split('-')[0] : navigator.language);
        };

        handleLanguageChange(locales.available.find(locale => locale.initials === getBrowserLanguage()) || locales.current, false);
    }, [])

    const router = useRouter();
    const pageName = router.pathname.split('/')[1];

    // On route change
    useEffect(() => {
        setMenuVisibilityState(false);
    }, [router.pathname])

    const handleLanguageChange = (locale: LocaleState, saveToStorage: boolean = true) => {
        locales.current = locale;

        setLanguageButtonState(<LanguageDropButtonElement locale={locale}/>);
        setLocalesElementState(locales.available.filter(locale => locale !== locales.current).map(locale =>
            <LanguageDropElement locale={locale} key={locale.initials}
                                 handleLocaleChangeCallback={handleLanguageChange}/>));

        // Merge strings from default locale with the selected locale
        const mergedStrings = Object.assign({}, locales.default.strings, locale.strings);
        dispatch(setLocale({...locale, strings: mergedStrings}));
        saveToStorage && localStorage.setItem('locale', locales.current.initials);
    }

    const AccountButtons = (rootCss: string, buttonCss: string = '') => {
        return (
            <div className={rootCss}>
                {user.isLogged && <UserDropdown/>}
                {!user.isLogged && <Button className={buttonCss} onClick={() => setOpenIssueModal('dismissible')}>
                    Report an issue
                </Button>}
            </div>
        )
    }

    return (
        <nav className="bg-white border-gray-200 dark:bg-dark-50 fixed top-0 w-full z-30 drop-shadow-md">
            <IssueReportModal openIssueModal={openIssueModal} setOpenIssueModal={setOpenIssueModal} openLoginModal={openLoginModal} setOpenLoginModal={setOpenLoginModal}/>
            <LoginModal openModal={openLoginModal} setOpenModal={setOpenLoginModal}/>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center">
                    <img src="/mohistLogo.webp" className="h-8 mr-3" alt="MohistMC Logo"/>
                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap text-dark-50 dark:text-white">MohistMC</span>
                </Link>
                <div className="flex items-center md:order-2">
                    <Link href="https://github.com/MohistMC"
                          className="hidden xl:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-2">
                        <svg className="w-5 h-5 " aria-hidden="true" focusable="false" data-prefix="fab"
                             data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                            <path fill="currentColor"
                                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                        </svg>
                    </Link>
                    <Link href="https://discord.gg/mohistmc"
                          className="hidden xl:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                        <svg className="w-6 h-6" aria-hidden="true" focusable="false" data-prefix="fab"
                             data-icon="discord" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path fill="currentColor"
                                  d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
                        </svg>
                    </Link>
                    <Link href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=dDX-3YVb6E1EUGPM0mLq3ZQ1ZAVHZip-&authKey=RQvCDMf6mUgXEFWvw%2Bey%2Ft02Lr34yN%2FZCWIJ05JF0U%2FhKRY8QoosLCrPA8uEay7w&noverify=0&group_code=782534813"
                          className="hidden xl:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-2">
                        <svg className="w-5 h-5 " aria-hidden="true" focusable="false" data-prefix="fab"
                             data-icon="qq" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <path fill="currentColor"
                                  d="M 16 5.886719 C 22.085938 5.886719 22.394531 11.324219 22.730469 12.394531 C 22.730469 12.394531 23.210938 12.929688 23.324219 13.746094 C 23.398438 14.273438 23.097656 14.871094 23.097656 14.871094 C 23.097656 14.871094 25.042969 17.492188 25.042969 19.550781 C 25.042969 20.835938 24.664063 21.5 24.222656 21.5 C 23.777344 21.5 23.128906 20.140625 23.128906 20.140625 C 23.128906 20.140625 22.113281 22.308594 21.605469 22.621094 C 21.097656 22.929688 23.4375 23.269531 23.4375 24.28125 C 23.4375 25.296875 21.578125 25.746094 20.058594 25.746094 C 18.535156 25.746094 16.113281 24.957031 16.113281 24.957031 L 15.238281 24.929688 C 15.238281 24.929688 14.5625 25.886719 11.773438 25.886719 C 8.984375 25.886719 7.773438 25.128906 7.773438 24.226563 C 7.773438 23.011719 9.550781 22.847656 9.550781 22.847656 C 9.550781 22.847656 8.417969 22.53125 7.460938 19.851563 C 7.460938 19.851563 6.796875 21.296875 5.859375 21.296875 C 5.859375 21.296875 5.464844 21.0625 5.464844 19.746094 C 5.464844 17.023438 7.421875 15.695313 8.265625 14.878906 C 8.265625 14.878906 8.125 14.523438 8.199219 14.082031 C 8.28125 13.589844 8.574219 13.292969 8.574219 13.292969 C 8.574219 13.292969 8.464844 12.703125 8.875 12.226563 C 8.957031 10.902344 9.914063 5.886719 16 5.886719 M 16 3.886719 C 9.601563 3.886719 7.332031 8.476563 6.929688 11.554688 C 6.738281 11.929688 6.628906 12.316406 6.585938 12.679688 C 6.433594 12.96875 6.296875 13.324219 6.226563 13.746094 C 6.207031 13.851563 6.195313 13.960938 6.1875 14.0625 C 5.078125 15.082031 3.464844 16.820313 3.464844 19.746094 C 3.464844 21.777344 4.210938 22.644531 4.839844 23.015625 L 5.308594 23.296875 L 5.859375 23.296875 C 5.875 23.296875 5.890625 23.296875 5.910156 23.296875 C 5.820313 23.582031 5.773438 23.890625 5.773438 24.226563 C 5.773438 25.085938 6.207031 27.890625 11.773438 27.890625 C 13.8125 27.890625 15.085938 27.449219 15.867188 26.976563 C 16.6875 27.222656 18.605469 27.746094 20.054688 27.746094 C 23.324219 27.746094 25.4375 26.386719 25.4375 24.28125 C 25.4375 23.90625 25.363281 23.574219 25.242188 23.277344 C 26.207031 22.839844 27.039063 21.710938 27.039063 19.550781 C 27.039063 17.65625 25.992188 15.667969 25.28125 14.535156 C 25.335938 14.210938 25.355469 13.847656 25.304688 13.472656 C 25.1875 12.632813 24.851563 11.964844 24.582031 11.546875 C 24.574219 11.507813 24.566406 11.46875 24.558594 11.429688 C 23.511719 6.421875 20.628906 3.886719 16 3.886719 Z"></path>
                        </svg>
                    </Link>
                    <button data-collapse-toggle="mobile-menu-language-select" type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-dark-200 dark:focus:ring-gray-600"
                            aria-controls="mobile-menu-language-select" aria-expanded="false"
                            onClick={() => {
                                // Override the default behavior of the button
                                setMenuVisibilityState(!menuVisibilityState)
                            }}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" aria-hidden="true" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </button>
                    <ThemeSwitcher className={`ml-2`}/>
                    {AccountButtons('hidden md:block', 'ml-3')}
                </div>
                <div
                    className={`${!menuVisibilityState ? 'hidden' : ''} w-full md:flex md:w-auto md:order-1`}
                    id="mobile-menu-language-select">
                    <ul className="flex flex-col md:items-center font-medium p-4 md:p-0 mt-4 border border-dark-200 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-dark-50">
                        <li>
                            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar"
                                    data-dropdown-trigger="hover"
                                    className={`flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 md:dark:bg-transparent md:dark:hover:bg-transparent md:bg-transparent ${pageName === 'software' ? `md:text-blue-700 md:dark:text-blue-500 bg-blue-700 text-white` : 'dark:hover:bg-dark-200 hover:bg-gray-100'}`}>
                                {strings['button.software']}
                                <svg
                                    className="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </button>
                            <div id="dropdownNavbar"
                                 className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-dark-100 dark:divide-gray-600">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownLargeButton">
                                    <li>
                                        <Link href="/software/mohist"
                                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-200 dark:hover:text-white">Mohist</Link>
                                    </li>
                                    <li>
                                        <Link href="/software/banner"
                                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-200 dark:hover:text-white">Banner</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link href="/downloads"
                                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent md:dark:bg-transparent dark:border-gray-700 md:bg-transparent ${pageName === 'downloads' || pageName === 'downloadSoftware' ? `md:text-blue-700 md:dark:text-blue-500 bg-blue-700 text-white` : 'hover:bg-gray-100 dark:hover:bg-dark-200'}`}>
                                {strings['button.downloads']}
                            </Link>
                        </li>
                        <li>
                            <Link href="/contribute"
                                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent md:dark:bg-transparent dark:border-gray-700 md:bg-transparent ${pageName === 'sponsor' ? `md:text-blue-700 md:dark:text-blue-500 bg-blue-700 text-white` : 'hover:bg-gray-100 dark:hover:bg-dark-200'}`}>
                                {strings['button.contribute']}
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog"
                                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent md:dark:bg-transparent dark:border-gray-700 md:bg-transparent ${pageName === 'blog' ? `md:text-blue-700 md:dark:text-blue-500 bg-blue-700 text-white` : 'hover:bg-gray-100 dark:hover:bg-dark-200'}`}>
                                {strings['button.blog']}
                            </Link>
                        </li>
                        <li>
                            <Link href="/mohistmc-api"
                                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent md:dark:bg-transparent dark:border-gray-700 md:bg-transparent ${pageName === 'mohistmc-api' ? `md:text-blue-700 md:dark:text-blue-500 bg-blue-700 text-white` : 'hover:bg-gray-100 dark:hover:bg-dark-200'}`}>
                                {strings['button.api']}
                            </Link>
                        </li>
                        {AccountButtons('md:hidden', 'ml-2 mt-1 mb-2')}
                        {languageButtonState}
                        <div
                            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-dark-100"
                            id="language-dropdown-menu">
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