import Head from 'next/head'
import React from 'react'
import { Flowbite } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { selectTheme } from '@/features/theme/ThemeSlice'
import { customTheme } from '@/util/Theme'
import PricingCard from '@/components/PricingCard'
import { useAppSelector } from '@/util/redux/Hooks'
import { selectTranslations } from '@/features/i18n/TranslatorSlice'

const Shop = () => {
    const mode = useSelector(selectTheme)
    const strings = useAppSelector(selectTranslations)

    return (
        <Flowbite theme={{ theme: customTheme, mode }}>
            <section className={`bg-white dark:bg-dark-50 flex flex-col `}>
                <Head>
                    <title>{strings['subscription.page.title']}</title>
                </Head>
                <section className="flex flex-col justify-center items-center pt-20">
                    <div className="pt-10 px-4 mx-auto max-w-screen-xl text-center">
                        <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                            <span className="text-blue-600 dark:text-blue-500">
                                {strings['subscription.title']}
                            </span>
                        </h1>
                        <p className="mb-5 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-300">
                            {strings['subscription.subtitle']}
                        </p>
                    </div>
                </section>
                <section className="relative flex flex-row justify-center items-stretch pt-20 pb-20 gap-10 flex-wrap">
                    <PricingCard
                        title={'free'}
                        vault={0}
                        bool1={true}
                        bool2={true}
                        bool3={true}
                        bool4={false}
                        bool5={false}
                        bool6={false}
                        bool7={false}
                    />
                    <PricingCard
                        title={'vip'}
                        vault={15}
                        bool1={true}
                        bool2={true}
                        bool3={true}
                        bool4={true}
                        bool5={true}
                        bool6={true}
                        bool7={true}
                    />
                </section>
            </section>
        </Flowbite>
    )
}

export default Shop
