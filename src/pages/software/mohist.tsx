import Link from "next/link";
import {useAppSelector} from "@/util/redux/Hooks";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";
import {getLocaleStringAsArgs} from "@/util/LocaleHelper";
import Head from "next/head";
import {getCopyrightText} from "@/util/String";

export default function MohistSoftware() {
    const strings = useAppSelector(selectTranslations)

    return (
        <div className="bg-white dark:bg-dark-25 pt-12">
            <Head>
                <title>{strings['software.mohist.page.title']}</title>
                <meta name="title" content="MohistMC - Mohist" />
                <meta name="description" content={`Elevate your Minecraft server with Mohist! Powerful Forge software with Bukkit, Spigot, Paper APIs. Enjoy smooth gameplay, extensive mod compatibility, and community support. Upgrade to Mohist for limitless possibilities. ${getCopyrightText()} MohistMC.`} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://new.mohistmc.com/software/mohist" />
                <meta property="og:title" content="MohistMC - Mohist" />
                <meta property="og:description" content={`Elevate your Minecraft server with Mohist! Powerful Forge software with Bukkit, Spigot, Paper APIs. Enjoy smooth gameplay, extensive mod compatibility, and community support. Upgrade to Mohist for limitless possibilities. ${getCopyrightText()} MohistMC.`} />
                <meta property="og:image" content="https://new.mohistmc.com/mohistLogo.png" />
                <meta property="og:image:width" content="50" />
                <meta property="og:image:height" content="50" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://new.mohistmc.com/software/mohist" />
                <meta property="twitter:title" content="MohistMC - Mohist" />
                <meta property="twitter:description" content={`Elevate your Minecraft server with Mohist! Powerful Forge software with Bukkit, Spigot, Paper APIs. Enjoy smooth gameplay, extensive mod compatibility, and community support. Upgrade to Mohist for limitless possibilities. ${getCopyrightText()} MohistMC.`} />
                <meta property="twitter:image" content="https://new.mohistmc.com/mohistLogo.png" />
            </Head>
            <section className="bg-white dark:bg-dark-25 pt-10">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
                    <h1 className="mb-8 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Mohist</h1>
                    <p className="mb-12 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-200 md:w-1/2">{strings['software.mohist.subtitle']}</p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <Link href="/downloadSoftware?project=mohist"
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
                        <Link href="/mohist/docs"
                           className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            {strings['button.documentation']}
                        </Link>
                        <Link href="https://github.com/MohistMC/Mohist"
                           className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            {strings['button.sourcecode']}
                        </Link>
                    </div>
                </div>
            </section>
            <div className="mt-10 top-0 left-0 w-full overflow-hidden leading-none rotate-180">
                <svg className={`h-20 w-full`} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 1200 120"
                     preserveAspectRatio="none">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="shadow fill-gray-100 dark:fill-dark-50"></path>
                </svg>
            </div>
            <section className={`bg-gray-100 dark:bg-dark-50`}>
                <h2 className="pt-10 md:pt-20 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">{getLocaleStringAsArgs(strings['software.mohist.cards.title'])[0]} <span
                        className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">{getLocaleStringAsArgs(strings['software.mohist.cards.title'])[1]}</span> {getLocaleStringAsArgs(strings['software.mohist.cards.title'])[2]}
                </h2>

                <div className="flex flex-wrap justify-center gap-12 w-full dark:bg-dark-50 pt-10 md:pt-20 md:pb-20 pb-10">
                    <div
                        className="max-w-sm bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-dark-100 dark:border-dark-300 mr-5 ml-5">
                        <div className={`orangeGradient rounded-t-lg`}>&nbsp;
                        </div>
                        <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{strings['software.mohist.cards.1.title']}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{strings['software.mohist.cards.1.desc']}</p>
                        </div>
                    </div>

                    <div
                        className="max-w-sm bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-dark-100 dark:border-dark-300 mr-5 ml-5">
                        <div className={`blueGradient rounded-t-lg`}>&nbsp;
                        </div>
                        <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{strings['software.mohist.cards.2.title']}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{strings['software.mohist.cards.2.desc']}</p>
                        </div>
                    </div>

                    <div
                        className="max-w-sm bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-dark-100 dark:border-dark-300 mr-5 ml-5">
                        <div className={`greenGradient rounded-t-lg`}>&nbsp;
                        </div>
                        <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{strings['software.mohist.cards.3.title']}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{strings['software.mohist.cards.3.desc']}</p>
                        </div>
                    </div>

                </div>
            </section>
            <div className="top-0 left-0 w-full overflow-hidden leading-none rotate-180">
                <svg className={`h-20 w-full`} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 1200 120"
                     preserveAspectRatio="none">
                    <path
                        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                        className="shadow fill-gray-100 dark:fill-dark-50"></path>
                </svg>
            </div>
            <section className={`pt-5 md:pt-10 pb-10`}>
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                    <h2 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-6xl dark:text-white">{strings['software.mohist.footer.title']}</h2>
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">{strings['software.mohist.footer.desc']}</p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <Link href="https://discord.gg/MohistMC" target="_blank"
                           className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                            {strings['software.mohist.footer.discord']}
                            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                                <path
                                    d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                            </svg>
                        </Link>
                        <Link href="/downloadSoftware?project=mohist"
                           className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            {strings['button.downloads']}
                            <svg aria-hidden="true" className="ml-2 -mr-1 w-5 h-5" fill="currentColor"
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
        </div>
    )
}