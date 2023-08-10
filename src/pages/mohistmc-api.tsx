import SwaggerComponent from "@/components/SwaggerComponent";
import {useSelector} from "react-redux";
import {selectTheme} from "@/features/theme/ThemeSlice";
import "../app/swagger-custom.scss"
import LoaderBarElement from "@/components/mohistmc-api/LoaderBarElement";
import {useState} from "react";
import {useAppSelector} from "@/util/redux/Hooks";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";
import {getLocaleStringAsArgs} from "@/util/LocaleHelper";
import Head from "next/head";
import {getCopyrightText} from "@/util/String";

export default function MohistMCApi() {
    const strings = useAppSelector(selectTranslations);

    // Redux
    const isDark = useSelector(selectTheme)

    // React states
    const [isSwaggerLoaded, setIsSwaggerLoaded] = useState<boolean>(false)

    const onComplete = () => {
        setIsSwaggerLoaded(true)
    }

    return (
        <div className={`bg-white dark:bg-dark-25 flex flex-col`}>
            <Head>
                <title>{strings['mohistapi.page.title']}</title>
                <meta name="title" content="MohistMC - JSON API" />
                <meta name="description" content={`Access valuable project data with MohistMC JSON API. Elevate development, connect with creators, and innovate. Join us today! ${getCopyrightText()} MohistMC.`} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://new.mohistmc.com/mohistmc-api" />
                <meta property="og:title" content="MohistMC - JSON API" />
                <meta property="og:description" content={`Access valuable project data with MohistMC JSON API. Elevate development, connect with creators, and innovate. Join us today! ${getCopyrightText()} MohistMC.`} />
                <meta property="og:image" content="https://new.mohistmc.com/mohistLogo.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://new.mohistmc.com/mohistmc-api" />
                <meta property="twitter:title" content="MohistMC - JSON API" />
                <meta property="twitter:description" content={`Access valuable project data with MohistMC JSON API. Elevate development, connect with creators, and innovate. Join us today! ${getCopyrightText()} MohistMC.`} />
                <meta property="twitter:image" content="https://new.mohistmc.com/mohistLogo.png" />
            </Head>
            <section className="flex flex-col justify-center items-center pt-20 bg-white dark:bg-dark-25">
                <div className="pt-10 px-4 mx-auto max-w-screen-xl text-center">
                    <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">{getLocaleStringAsArgs(strings['mohistapi.title'])[0]} <span className="text-blue-600 dark:text-blue-500">{getLocaleStringAsArgs(strings['mohistapi.title'])[1]}</span>{getLocaleStringAsArgs(strings['mohistapi.title'])[2]}</h1>
                    <p className="mb-12 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-300">{strings['mohistapi.subtitle']}</p>
                </div>
            </section>
            <section className={`${isDark ? 'dark-theme' : 'white-theme' } ${!isSwaggerLoaded && 'flex items-center flex-col'}`}>
                <div role="status"
                     className={`${isSwaggerLoaded && 'hidden'} max-w-2xl mb-10 p-4 space-y-4 w-75 w-full border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-dark-400 md:p-6 dark:border-dark-200`}>
                    <LoaderBarElement/>
                    <LoaderBarElement/>
                    <LoaderBarElement/>
                    <LoaderBarElement/>
                    <LoaderBarElement/>
                    <span className="sr-only">Loading...</span>
                </div>
                <SwaggerComponent onComplete={onComplete}/>
            </section>
        </div>
    )
}