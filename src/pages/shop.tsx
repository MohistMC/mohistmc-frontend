import Head from "next/head";
import {getLocaleStringAsArgs} from "@/util/LocaleHelper";
import React from "react";
import {useAppSelector} from "@/util/redux/Hooks";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";
import {Button, Card, Flowbite} from "flowbite-react";
import {useSelector} from "react-redux";
import {selectTheme} from "@/features/theme/ThemeSlice";
import Link from "next/link";
import {customTheme} from "@/util/Theme";

const Shop = () => {
    const strings = useAppSelector(selectTranslations);
    const mode = useSelector(selectTheme)

    return (
        <Flowbite theme={{theme: customTheme, mode}}>
            <div className={`bg-white dark:bg-dark-25 flex flex-col`}>
                <Head>
                    <title>{strings['shop.page.title']}</title>
                    <meta name="title" content="MohistMC - Shop"/>
                    <meta name="description"
                          content="Empower Minecraft's future at MohistMC. Support our community's growth for innovation. Shop now!"/>

                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content="https://new.mohistmc.com/shop"/>
                    <meta property="og:title" content="MohistMC - Shop"/>
                    <meta property="og:description"
                          content="Empower Minecraft's future at MohistMC. Support our community's growth for innovation. Shop now!"/>
                    <meta property="og:image" content="https://new.mohistmc.com/mohistLogo.png"/>
                    <meta property="og:image:type" content="image/png"/>
                    <meta property="og:image:width" content="100" />
                    <meta property="og:image:height" content="100" />

                    <meta property="twitter:url" content="https://new.mohistmc.com/shop"/>
                    <meta property="twitter:title" content="MohistMC - Shop"/>
                    <meta property="twitter:description"
                          content="Empower Minecraft's future at MohistMC. Support our community's growth for innovation. Shop now!"/>
                </Head>
                <section className="flex flex-col justify-center items-center pt-20 bg-white dark:bg-dark-25">
                    <div className="pt-10 px-4 mx-auto max-w-screen-xl text-center">
                        <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">{getLocaleStringAsArgs(strings['shop.title'])[0]}
                            <span
                                className="text-blue-600 dark:text-blue-500">{getLocaleStringAsArgs(strings['shop.title'])[1]}</span>
                            {getLocaleStringAsArgs(strings['shop.title'])[2]}</h1>
                        <p className="mb-5 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-300">{strings['shop.subtitle']}</p>
                    </div>
                </section>
                <div className="top-0 left-0 w-full overflow-hidden leading-none rotate-180">
                    <svg className={`h-20 w-full`} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 1200 120"
                         preserveAspectRatio="none">
                        <path
                            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                            className="shadow fill-gray-100 dark:fill-dark-50"></path>
                    </svg>
                </div>
                <section className="relative flex flex-row justify-center items-stretch pt-20 pb-20 bg-gray-100 dark:bg-dark-50 gap-10 flex-wrap">
                    <Card imgAlt="Shop financially" imgSrc="/finance.webp">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {strings['shop.cards.1.title']}
                        </h2>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {strings['shop.cards.1.desc']}
                        </p>
                    </Card>
                    <Card imgAlt="Shop to the code" imgSrc="/code.webp">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {strings['shop.cards.2.title']}
                        </h2>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {strings['shop.cards.2.desc']}
                        </p>
                    </Card>
                    <Card imgAlt="Shop to the docs" imgSrc="/docs.webp">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {strings['shop.cards.3.title']}
                        </h2>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {strings['shop.cards.3.desc']}
                        </p>
                    </Card>
                    <Card imgAlt="Shop to the translation" imgSrc="/translate.webp">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {strings['shop.cards.4.title']}
                        </h2>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {strings['shop.cards.4.desc']}
                        </p>
                    </Card>
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
            </div>
        </Flowbite>
    )
}

export default Shop;