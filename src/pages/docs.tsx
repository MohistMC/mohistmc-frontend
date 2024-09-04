import { useAppSelector } from '@/util/redux/Hooks'
import { selectTranslations } from '@/features/i18n/TranslatorSlice'
import Link from 'next/link'
import Head from 'next/head'
import { getCopyrightText } from '@/util/String'
import { locales } from '@/i18n/Language'

export default function Downloads() {
    const strings = useAppSelector(selectTranslations)

    return (
        <section className="flex flex-col justify-center items-center pt-20 pb-10 bg-white dark:bg-dark-25">
            <Head>
                <title>MohistMC - Docs</title>
                <meta name="title" content="MohistMC - Docs" />
                <meta
                    name="description"
                    content={`Explore MohistMC's Comprehensive Documentation! Access various guides for our software solutions: Mohist, Banner, and Website API. Elevate your understanding and unleash the potential of our tools. Start your journey today. ${getCopyrightText()} MohistMC.`}
                />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://mohistmc.com/docs" />
                <meta property="og:title" content="MohistMC - Docs" />
                <meta
                    property="og:description"
                    content={`Explore MohistMC's Comprehensive Documentation! Access various guides for our software solutions: Mohist, Banner, and Website API. Elevate your understanding and unleash the potential of our tools. Start your journey today. ${getCopyrightText()} MohistMC.`}
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
                    content="https://mohistmc.com/docs"
                />
                <meta property="twitter:title" content="MohistMC - Docs" />
                <meta
                    property="twitter:description"
                    content={`Explore MohistMC's Comprehensive Documentation! Access various guides for our software solutions: Mohist, Banner, and Website API. Elevate your understanding and unleash the potential of our tools. Start your journey today. ${getCopyrightText()} MohistMC.`}
                />
            </Head>
            <h1 className="mb-4 mt-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
                {strings['docs.title']}
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">
                {strings['docs.subtitle']}
            </p>

            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 flex flex-row gap-4 flex-wrap">
                <Link
                    href={`/mohist/docs/`}
                    className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-dark-100 dark:border-dark-200 dark:hover:bg-dark-150"
                >
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Mohist
                    </h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {strings['index.cards.mohist.description']}
                    </p>
                </Link>

                <Link
                    href="/banner/docs"
                    className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-dark-100 dark:border-dark-200 dark:hover:bg-dark-150"
                >
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Banner
                    </h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {strings['index.cards.banner.description']}
                    </p>
                </Link>

                <Link
                    href="/mohistmc-api"
                    className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-dark-100 dark:border-dark-200 dark:hover:bg-dark-150"
                >
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {strings['docs.cards.websiteapi.title']}
                    </h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {strings['docs.cards.websiteapi.desc']}
                    </p>
                </Link>
            </div>
        </section>
    )
}
