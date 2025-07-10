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
import FeatureCard from "@/components/index/FeatureCardProps";

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
                        content={`Unleash Minecraft's full potential with MohistMC! Download our advanced software for an ultimate gaming adventure. Whether Forgeor NeoForge, our server software integrates Bukkit, Spigot, and Paper APIs seamlessly. Elevate your experience now. ${getCopyrightText()} MohistMC.`}
                    />

                    <meta property="og:type" content="website" />
                    <meta
                        property="og:url"
                        content="https://mohistmc.com/downloads"
                    />
                    <meta property="og:title" content="MohistMC - Downloads" />
                    <meta
                        property="og:description"
                        content={`Unleash Minecraft's full potential with MohistMC! Download our advanced software for an ultimate gaming adventure. Whether Forgeor NeoForge, our server software integrates Bukkit, Spigot, and Paper APIs seamlessly. Elevate your experience now. ${getCopyrightText()} MohistMC.`}
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
                        content={`Unleash Minecraft's full potential with MohistMC! Download our advanced software for an ultimate gaming adventure. Whether Forgeor NeoForge, our server software integrates Bukkit, Spigot, and Paper APIs seamlessly. Elevate your experience now. ${getCopyrightText()} MohistMC.`}
                    />
                </Head>
                <h1 className="md:mt-20 mt-10 text-center w-3/4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    {getLocaleStringAsArgs(strings['downloads.title'])[0]}
                    <span className="text-blue-600 dark:text-blue-500">
                        {getLocaleStringAsArgs(strings['downloads.title'])[1]}
                    </span>
                    {getLocaleStringAsArgs(strings['downloads.title'])[2]}
                </h1>

                <div
                    className={`flex flex-row flex-wrap items-center justify-center max-w-screen-xl gap-6 mt-16 mb-16`}
                >
                    <FeatureCard
                        imageSrc="/img/res/mohist.png"
                        title="Mohist"
                        subtitle=""
                        description={strings['index.cards.mohist.description']}
                        buttonLink="/downloadSoftware?project=mohist"
                        buttonText={`Download`}
                    />
                    <FeatureCard
                        imageSrc="/img/res/youer.png"
                        title="Youer"
                        subtitle="Beta"
                        description={strings['index.cards.youer.description']}
                        buttonLink="/downloadSoftware?project=youer"
                        buttonText={`Download`}
                    />
                </div>
            </section>
        </Flowbite>
    )
}
