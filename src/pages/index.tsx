import {selectTranslations} from "@/features/i18n/TranslatorSlice";
import {useAppSelector} from "@/util/redux/Hooks";
import {getLocaleStringAsArgs} from "@/util/LocaleHelper";
import Link from "next/link";
import StatisticsElement from "@/components/index/StatisticsElement";
import DefaultCarousel from "@/components/index/Carousel";
import Head from "next/head";
import {getCopyrightText} from "@/util/String";
import {useRouter} from "next/router";
import {setCookie} from "cookies-next";
import {useEffect, useState} from "react";
import ChoiceIssueModal from "@/components/modals/ChoiceIssueModal";
import {useDispatch} from "react-redux";
import {loginUserAsync, selectUser, setState} from "@/features/user/UserSlice";

const Home = () => {
    // React redux
    const dispatch = useDispatch();
    const strings = useAppSelector(selectTranslations);
    const user = useAppSelector(selectUser)
    const router = useRouter()

    // React states
    const [openChoiceIssueModal, setOpenChoiceIssueModal] = useState<string | undefined>();

    useEffect(() => {
        if(!router.isReady) return

        const {auth} = router.query as { auth: string }

        // Store auth token in cookie and remove from url
        if (auth && auth.length) {
            setCookie('auth', auth, {path: '/', maxAge: 21600})
            router.replace(router.pathname)
            loginUserAsync(dispatch, true)
        }
    }, [router.isReady, router.query]);

    useEffect(() => {
        if(user.isFirstLogin && user.isLogged) {
            setOpenChoiceIssueModal('dismissible')
            dispatch(setState({
                isFirstLogin: false
            }))
        }
    }, [user])

    return (
        <div className="bg-white dark:bg-dark-25 pt-12">
            <Head>
                <title>{strings['index.page.title']}</title>
                <meta name="title" content="MohistMC - Home"/>
                <meta name="description"
                      content={`Explore Minecraft innovation with MohistMC. Discover our hybrid servers software, mods, plugins, and vibrant community. Unleash new gaming dimensions. ${getCopyrightText()} MohistMC.`}/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://new.mohistmc.com/"/>
                <meta property="og:title" content="MohistMC - Home"/>
                <meta property="og:description"
                      content={`Explore Minecraft innovation with MohistMC. Discover our hybrid servers software, mods, plugins, and vibrant community. Unleash new gaming dimensions. ${getCopyrightText()} MohistMC.`}/>
                <meta property="og:image" content="https://new.mohistmc.com/mohistLogo.png"/>
                <meta property="og:image:type" content="image/png"/>
                <meta property="og:image:width" content="100" />
                <meta property="og:image:height" content="100" />

                <meta property="twitter:url" content="https://new.mohistmc.com/"/>
                <meta property="twitter:title" content="MohistMC - Home"/>
                <meta property="twitter:description"
                      content={`Explore Minecraft innovation with MohistMC. Discover our hybrid servers software, mods, plugins, and vibrant community. Unleash new gaming dimensions. ${getCopyrightText()} MohistMC.`}/>
            </Head>
            <ChoiceIssueModal openIssueModal={openChoiceIssueModal} setOpenIssueModal={setOpenChoiceIssueModal}/>
            <section className="bg-white dark:bg-dark-25 pt-10">
                <div className="pt-5 md:pt-10 md:pb-0 pb-6 px-4 mx-auto max-w-screen-xl text-center">
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{strings['index.head.title']}</h1>
                    <p className="mb-12 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">{strings['index.head.subtitle']}</p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <Link href="/downloads"
                              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                            {strings['button.downloads']}
                            <svg aria-hidden="true" className="ml-2 -mr-1 w-5 h-5" fill="currentColor"
                                 viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </Link>
                        <Link href="/docs"
                              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            {strings['button.documentations']}
                        </Link>
                    </div>
                </div>
            </section>
            <div className="w-full">
                <svg className={`h-20 w-full`} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 1200 120"
                     preserveAspectRatio="none">
                    <path d="M741,116.23C291,117.43,0,27.57,0,6V120H1200V6C1200,27.93,1186.4,119.83,741,116.23Z"
                          className="shadow fill-gray-100 dark:fill-dark-50"></path>
                </svg>
            </div>
            <section
                className="pt-20 pb-10 md:pb-20 bg-gray-100 dark:bg-dark-50 py-10 flex flex-col flex-wrap justify-center items-center">
                <h2 className="text-center mb-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">{getLocaleStringAsArgs(strings['index.cards.title'])[0]}<span
                    className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">{getLocaleStringAsArgs(strings['index.cards.title'])[1]}</span>
                    {getLocaleStringAsArgs(strings['index.cards.title'])[2]}
                </h2>
                <div className={`flex flex-row flex-wrap items-center justify-center max-w-screen-xl gap-6`}>
                    <div
                        className="max-w-sm p-6 bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-dark-100 dark:border-dark-200 mr-5 ml-5 md:mr-0 md:ml-0">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mohist</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{strings['index.cards.mohist.description']}</p>
                        <Link href="/software/mohist"
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {strings['button.readmore']}
                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor"
                                 viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </Link>
                    </div>
                    <div
                        className="max-w-sm p-6 bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-dark-100 dark:border-dark-200 mr-5 ml-5 md:mr-0 md:ml-0">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Banner</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{strings['index.cards.banner.description']}</p>
                        <Link href="/software/banner"
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {strings['button.readmore']}
                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor"
                                 viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
            <StatisticsElement/>
            <section className={`bg-gray-50 dark:bg-dark-25 flex justify-center flex-col items-center pt-12`}>
                <h2 className="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">{getLocaleStringAsArgs(strings['index.partner.title'])[0]}<span
                    className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">{getLocaleStringAsArgs(strings['index.partner.title'])[1]}</span>
                    {getLocaleStringAsArgs(strings['index.partner.title'])[2]}
                </h2>
                <DefaultCarousel/>
            </section>
        </div>
    )
}

export default Home