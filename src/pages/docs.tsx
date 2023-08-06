import {useAppSelector} from "@/util/redux/Hooks";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";

export default function Downloads() {
    const strings = useAppSelector(selectTranslations);

    return (
        <section className="flex flex-col justify-center items-center pt-20 pb-10 bg-white dark:bg-dark-25">
            <h1 className="mb-4 mt-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{strings['docs.title']}</h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{strings['docs.subtitle']}</p>

            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 flex flex-row gap-4 flex-wrap">
                <a href="/mohist/docs" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-dark-100 dark:border-dark-200 dark:hover:bg-dark-150">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mohist</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{strings['index.cards.mohist.description']}</p>
                </a>

                <a href="/banner/docs" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-dark-100 dark:border-dark-200 dark:hover:bg-dark-150">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Banner</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{strings['index.cards.banner.description']}</p>
                </a>

                <a href="/mohist-api" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-dark-100 dark:border-dark-200 dark:hover:bg-dark-150">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{strings['docs.cards.websiteapi.title']}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{strings['docs.cards.websiteapi.desc']}</p>
                </a>
            </div>
        </section>

    )
}