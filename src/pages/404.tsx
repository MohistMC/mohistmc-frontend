import { selectTranslations } from '@/features/i18n/TranslatorSlice'
import { useAppSelector } from '@/util/redux/Hooks'
import Image from 'next/image'
import image404 from '../../public/404.png'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { locales } from '@/i18n/Language'

export default function Custom404() {
    const translations = useAppSelector(selectTranslations)
    const router = useRouter()

    // Redirect to the default locale if the user tries to access the docs that does not exist in the specified language
    useEffect(() => {
        const previousPath = router.asPath
        if (previousPath.startsWith('/mohist/docs') || previousPath.startsWith('/banner/docs')) {
            const localeRegex = /\/[a-z]{2}-[a-z]{2}/;

            // If language is specified in the path, redirect to the default locale
            if(previousPath.match(localeRegex)) {
                router.push(previousPath.replace(localeRegex, `/${locales.default.locale.toLowerCase()}`)).catch();
                return;
            }

            // If language is not specified in the path, redirect to the default locale with the same path
            router.push(previousPath.replace('/docs/', `/docs/${locales.default.locale.toLowerCase()}/`)).catch();
        }
    }, [])

    return (
        <section className="flex flex-col justify-center items-center bg-white dark:bg-dark-50 h-full py-20">
            <Image
                height="432"
                alt="Mohist Project Status"
                src={image404}
            />
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                404{' '}
                <span
                    className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                    {translations['404.title']}
                </span>
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center m-4">
                {translations['404.subtitle']}
            </p>
        </section>
    )
}
