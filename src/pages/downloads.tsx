import Link from 'next/link'
import { useAppSelector } from '@/util/redux/Hooks'
import { selectTranslations } from '@/features/i18n/TranslatorSlice'
import { getLocaleStringAsArgs } from '@/util/LocaleHelper'
import Head from 'next/head'
import { getCopyrightText } from '@/util/String'
import { Flowbite } from 'flowbite-react'
import { customTheme } from '@/util/Theme'
import { useSelector } from 'react-redux'
import { selectTheme } from '@/features/theme/ThemeSlice'

export default function Downloads() {
    const strings = useAppSelector(selectTranslations)
    const mode = useSelector(selectTheme)

    return (
        <Flowbite theme={{ theme: customTheme, mode }}>
            <section className="flex flex-col justify-center items-center pt-20 bg-white dark:bg-dark-50">
                <Head>
                    <title>{strings['downloads.page.title']}</title>
                    <meta name="title" content="MohistMC - Downloads" />
                    <meta
                        name="description"
                        content={`Unleash Minecraft's full potential with MohistMC! Download our advanced software for an ultimate gaming adventure. Whether Forge or Fabric, our server software integrates Bukkit, Spigot, and Paper APIs seamlessly. Elevate your experience now. ${getCopyrightText()} MohistMC.`}
                    />

                    <meta property="og:type" content="website" />
                    <meta
                        property="og:url"
                        content="https://mohistmc.com/downloads"
                    />
                    <meta property="og:title" content="MohistMC - Downloads" />
                    <meta
                        property="og:description"
                        content={`Unleash Minecraft's full potential with MohistMC! Download our advanced software for an ultimate gaming adventure. Whether Forge or Fabric, our server software integrates Bukkit, Spigot, and Paper APIs seamlessly. Elevate your experience now. ${getCopyrightText()} MohistMC.`}
                    />
                    <meta
                        property="og:image"
                        content="https://mohistmc.com/mohistLogo.png"
                    />
                    <meta property="og:image:type" content="image/png" />
                    <meta property="og:image:width" content="100" />
                    <meta property="og:image:height" content="100" />

                    <meta
                        property="twitter:url"
                        content="https://mohistmc.com/downloads"
                    />
                    <meta
                        property="twitter:title"
                        content="MohistMC - Downloads"
                    />
                    <meta
                        property="twitter:description"
                        content={`Unleash Minecraft's full potential with MohistMC! Download our advanced software for an ultimate gaming adventure. Whether Forge or Fabric, our server software integrates Bukkit, Spigot, and Paper APIs seamlessly. Elevate your experience now. ${getCopyrightText()} MohistMC.`}
                    />
                </Head>
                <h1 className="md:mt-20 mt-10 text-center w-3/4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    {getLocaleStringAsArgs(strings['downloads.title'])[0]}
                    <span className="text-blue-600 dark:text-blue-500">
                        {getLocaleStringAsArgs(strings['downloads.title'])[1]}
                    </span>
                    {getLocaleStringAsArgs(strings['downloads.title'])[2]}
                </h1>

                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
                    <div className="bg-gray-50 dark:bg-dark-100 border border-gray-200 dark:border-dark-200 rounded-lg p-8 md:p-12 mb-8">
                        <div className={`flex flex-row gap-1`}>
                            <Link
                                href="https://minecraftforge.net"
                                className="bg-blue-100 text-blue-800 text-xs font-medium items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400"
                            >
                                Forge
                            </Link>
                        </div>
                        <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2 mt-1">
                            Mohist
                        </h1>
                        <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
                            {strings['downloads.mohist.desc']}
                        </p>
                        <div className={`flex flex-row flex-wrap gap-2`}>
                            <Link
                                href={`/downloadSoftware?project=mohist`}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium inline-flex items-center rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                {strings['button.downloads']}
                                <svg
                                    aria-hidden="true"
                                    className="ml-2 -mr-1 w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </Link>
                            <Link
                                href="/mohist/docs"
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-dark-200 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            >
                                {strings['button.documentation']}
                            </Link>
                        </div>
                    </div>
                    <div className="flex gap-10">
                        <div
                            className="bg-gray-50 dark:bg-dark-100 border border-gray-200 dark:border-dark-200 rounded-lg p-8 md:p-12">
                            <Link
                                href="https://fabricmc.net/"
                                className="bg-green-100 text-green-800 text-xs font-medium items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-2"
                            >
                                Fabric
                            </Link>
                            <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2 mt-1">
                                Banner
                            </h2>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
                                {strings['downloads.banner.desc']}
                            </p>
                            <div className={`flex flex-row flex-wrap gap-2`}>
                                <Link
                                    href=""
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium inline-flex items-center rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    {strings['button.downloads']}
                                    <svg
                                        aria-hidden="true"
                                        className="ml-2 -mr-1 w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </Link>
                                <Link
                                    href=""
                                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-dark-200 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                >
                                    {strings['button.documentation']}
                                </Link>
                            </div>
                        </div>
                        <div
                            className="bg-gray-50 dark:bg-dark-100 border border-gray-200 dark:border-dark-200 rounded-lg p-8 md:p-12">
                            <Link
                                href="https://neoforged.net/"
                                className="bg-red-200 text-blue-800 text-xs font-medium items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-red-400"
                            >
                                NeoForge
                            </Link>
                            <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2 mt-1">
                                Youer
                            </h2>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
                                {strings['downloads.your.desc']}
                            </p>
                            <div className={`flex flex-row flex-wrap gap-2`}>
                                <Link
                                    href=""
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium inline-flex items-center rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    {strings['button.downloads']}
                                    <svg
                                        aria-hidden="true"
                                        className="ml-2 -mr-1 w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </Link>
                                <Link
                                    href=""
                                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-dark-200 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                >
                                    {strings['button.documentation']}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Flowbite>
    )
}
