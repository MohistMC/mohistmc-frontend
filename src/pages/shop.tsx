import Head from "next/head";
import {getLocaleStringAsArgs} from "@/util/LocaleHelper";
import React from "react";
import {useAppSelector} from "@/util/redux/Hooks";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";
import {Alert, Card, Flowbite} from "flowbite-react";
import {useSelector} from "react-redux";
import {selectTheme} from "@/features/theme/ThemeSlice";
import {customTheme} from "@/util/Theme";

import {HiInformationCircle} from "react-icons/hi";

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
                    <meta property="og:url" content="https://mohistmc.com/shop"/>
                    <meta property="og:title" content="MohistMC - Shop"/>
                    <meta property="og:description"
                          content="Empower Minecraft's future at MohistMC. Support our community's growth for innovation. Shop now!"/>
                    <meta property="og:image" content="https://mohistmc.com/mohistLogo.png"/>
                    <meta property="og:image:type" content="image/png"/>
                    <meta property="og:image:width" content="100"/>
                    <meta property="og:image:height" content="100"/>

                    <meta property="twitter:url" content="https://mohistmc.com/shop"/>
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
                <section className="relative flex flex-row justify-center flex-wrap">
                    <Alert color="failure" icon={HiInformationCircle}>
                        <span className="font-medium">
                            {strings['shop.alert']}</span> {strings['shop.alert.1']}
                    </Alert>
                </section>
                <section className="relative flex flex-row justify-center flex-wrap">
                    <Alert color="failure" icon={HiInformationCircle}>
                        <span className="font-medium">
                            {strings['shop.alert']}</span> {strings['shop.alert.2']}
                    </Alert>
                </section>
                <section
                    className="relative flex flex-row justify-center items-stretch pt-20 pb-20 bg-gray-100 dark:bg-dark-50 gap-10 flex-wrap">
                    <Card imgSrc="/code.webp">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {strings['shop.cards.1.title']}
                        </h2>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {strings['shop.cards.1.desc']}
                        </p>
                        {renderRatingStars('5.0')}
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white"></span>
                            <a href="#"
                               className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                                {strings['shop.none']}
                            </a>
                        </div>
                    </Card>
                    <Card imgSrc="/code.webp">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {strings['shop.cards.2.title']}
                        </h2>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {strings['shop.cards.2.desc']}
                        </p>
                        {renderRatingStars('5.0')}
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white"></span>
                            <a href="#"
                               className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                                {strings['shop.none']}
                            </a>
                        </div>
                    </Card>
                    <Card imgSrc="/code.webp">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {strings['shop.cards.3.title']}
                        </h2>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {strings['shop.cards.3.desc']}
                        </p>
                        {renderRatingStars('5.0')}
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white"></span>
                            <a href="#"
                               className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                                {strings['shop.none']}
                            </a>
                        </div>
                    </Card>
                    <Card imgSrc="/code.webp">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {strings['shop.cards.4.title']}
                        </h2>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {strings['shop.cards.4.desc']}<br/>
                            {""}<br/>
                            {""}<br/>
                            {""}
                        </p>
                        {renderRatingStars('5.0')}
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white"></span>
                            <a href="#"
                               className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                                {strings['shop.none']}
                            </a>
                        </div>
                    </Card>
                </section>
                <section
                    className="relative flex flex-row justify-center items-stretch pt-20 pb-20 bg-gray-100 dark:bg-dark-50 gap-10 flex-wrap">
                    <Card imgSrc="/code.webp">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {strings['shop.cards.5.title']}
                        </h2>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {strings['shop.cards.5.desc']}<br/>
                            {""}<br/>
                            {""}<br/>
                            {""}
                        </p>
                        {renderRatingStars('5.0')}
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white"></span>
                            <a href="#"
                               className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                                {strings['shop.none']}
                            </a>
                        </div>
                    </Card>
                    <Card imgSrc="/code.webp">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {strings['shop.cards.6.title']}
                        </h2>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {strings['shop.cards.6.desc']}<br/>
                            {""}<br/>
                            {""}<br/>
                            {""}
                        </p>
                        {renderRatingStars('5.0')}
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white"></span>
                            <a href="#"
                               className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                                {strings['shop.none']}
                            </a>
                        </div>
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


function renderRatingStars(starsCount: string) {
    return (
        <div className="mb-5 mt-2.5 flex items-center">
            {Array.from({length: Math.floor(Number(starsCount))}, (_, index) => (
                <svg key={index} className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
            ))}
            <span
                className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                {starsCount}
            </span>
        </div>
    );
}

export default Shop;