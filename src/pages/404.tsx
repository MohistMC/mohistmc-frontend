import {selectTranslations} from "@/features/i18n/TranslatorSlice";
import {useAppSelector} from "@/util/redux/Hooks";

export default function Custom404() {
    const translations = useAppSelector(selectTranslations);

    return (
        <section className="flex flex-col justify-center items-center bg-white dark:bg-dark-50 h-full">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">404 <span
                    className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">{translations['404.title']}</span>
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center m-4">
                {translations['404.subtitle']}
            </p>
        </section>
    )
}