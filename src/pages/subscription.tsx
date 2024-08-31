import Head from 'next/head'
import React from 'react'
import { Flowbite } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { selectTheme } from '@/features/theme/ThemeSlice'
import { customTheme } from '@/util/Theme'
import PricingCard from '@/components/PricingCard'

const Shop = () => {
    const mode = useSelector(selectTheme)

    return (
        <Flowbite theme={{ theme: customTheme, mode }}>
            <section className={`bg-white dark:bg-dark-25 flex flex-col`}>
                <Head>
                    <title>MohistMC - Subscription</title>
                    <meta name="title" content="MohistMC - Subscription" />
                    <meta
                        name="description"
                        content="Empower Minecraft's future at MohistMC. Support our community's growth for innovation. Shop now!"
                    />

                    <meta property="og:type" content="website" />
                    <meta
                        property="og:url"
                        content="https://mohistmc.com/subscription"
                    />
                    <meta property="og:title" content="MohistMC - Shop" />
                    <meta
                        property="og:description"
                        content="Empower Minecraft's future at MohistMC. Support our community's growth for innovation. Shop now!"
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
                        content="https://mohistmc.com/subscription"
                    />
                    <meta
                        property="twitter:title"
                        content="MohistMC - Subscription"
                    />
                    <meta
                        property="twitter:description"
                        content="Empower Minecraft's future at MohistMC. Support our community's growth for innovation. Shop now!"
                    />
                </Head>
                <section className="flex flex-col justify-center items-center pt-20 bg-white dark:bg-dark-25">
                    <div className="pt-10 px-4 mx-auto max-w-screen-xl text-center">
                        <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                            <span className="text-blue-600 dark:text-blue-500">
                                Pricing Plans
                            </span>
                        </h1>
                        <p className="mb-5 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-300">
                            Account plans unlock additional features
                        </p>
                    </div>
                </section>
                <section className="relative flex flex-row justify-center items-stretch pt-20 pb-20 bg-gray-100 dark:bg-dark-50 gap-10 flex-wrap">
                    <PricingCard />
                    <PricingCard />
                    <PricingCard />
                    <PricingCard />
                </section>
            </section>
        </Flowbite>
    )
}

export default Shop
