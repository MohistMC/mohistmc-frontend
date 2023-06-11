import {wrapper} from "@/util/redux/Store";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";
import {useAppSelector} from "@/util/redux/Hooks";
import {getLocaleStringAsArgs} from "@/util/LocaleHelper";

function Home() {
    const strings = useAppSelector(selectTranslations);

    return (
        <div className="bg-white dark:bg-dark-25 pt-12">
            <section className="bg-white dark:bg-dark-25 pt-10">
                <div className="pt-10 md:pb-0 pb-6 px-4 mx-auto max-w-screen-xl text-center">
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{strings['index.head.title']}</h1>
                    <p className="mb-12 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">{strings['index.head.subtitle']}</p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <a href="/downloads"
                           className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                            {strings['button.downloads']}
                            <svg aria-hidden="true" className="ml-2 -mr-1 w-5 h-5" fill="currentColor"
                                 viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </a>
                        <a href="#"
                           className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            {strings['button.learnmore']}
                        </a>
                    </div>
                </div>
            </section>
            <div className="w-full">
                <svg className={`h-20 w-full`} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 1200 120"
                     preserveAspectRatio="none">
                    <path d="M741,116.23C291,117.43,0,27.57,0,6V120H1200V6C1200,27.93,1186.4,119.83,741,116.23Z"
                          className="shadow fill-gray-100 dark:fill-dark-50"></path>
                </svg>
            </div>
            <section
                className="pt-20 pb-20 bg-gray-100 dark:bg-dark-50 py-10 flex flex-col flex-wrap justify-center items-center">
                <h2 className="text-center mb-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">{getLocaleStringAsArgs(strings['index.cards.title'])[0]}<span
                        className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">{getLocaleStringAsArgs(strings['index.cards.title'])[1]}</span>
                    {getLocaleStringAsArgs(strings['index.cards.title'])[2]}
                </h2>
                <div className={`flex flex-row flex-wrap items-center justify-center max-w-screen-xl gap-6`}>
                    <div
                        className="max-w-sm p-6 bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-dark-100 dark:border-dark-200">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mohist</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{strings['index.cards.mohist.description']}</p>
                        <a href="/software/mohist"
                           className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {strings['button.readmore']}
                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor"
                                 viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                    <div
                        className="max-w-sm p-6 bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-dark-100 dark:border-dark-200">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Banner</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{strings['index.cards.banner.description']}</p>
                        <a href="/software/banner"
                           className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {strings['button.readmore']}
                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor"
                                 viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
            <section className="pb-20 bg-white dark:bg-dark-50 pt-10">
                <h2 className="text-center mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-4xl dark:text-white">{strings['index.stats.title']}</h2>
                <div
                    className="bg-gray-100 grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-2 xl:grid-cols-4 dark:bg-dark-25 rounded-xl dark:text-white sm:p-8">
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">0</dt>
                        <dd className="text-gray-500 dark:text-gray-400">{strings['index.stats.resolvedbugs']}</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">0</dt>
                        <dd className="text-gray-500 dark:text-gray-400">{strings['index.stats.openedissues']}</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">0+</dt>
                        <dd className="text-gray-500 dark:text-gray-400">{strings['index.stats.players']}</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">0+</dt>
                        <dd className="text-gray-500 dark:text-gray-400">{strings['index.stats.servers']}</dd>
                    </div>
                </div>
            </section>
            <section className={`bg-gray-50 dark:bg-dark-25 flex justify-center flex-col items-center pt-12`}>
                <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">{getLocaleStringAsArgs(strings['index.partner.title'])[0]}<span
                    className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">{getLocaleStringAsArgs(strings['index.partner.title'])[1]}</span>
                    {getLocaleStringAsArgs(strings['index.partner.title'])[2]}
                </h2>
                <div id="default-carousel" className="relative w-full" data-carousel="slide">
                    <div className="relative h-36 overflow-hidden rounded-lg md:h-56">
                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                            <a href={`https://ci.codemc.io/`}><img src="/codemc.png"
                                                                   className="absolute block w-3/4 md:w-1/6 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                                                   alt="..."></img></a>
                        </div>
                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                            <a href={`https://www.bisecthosting.com/mohistmc`}><img src="/bisecthosting.png"
                                                                                    className="absolute block w-3/4 md:w-1/4 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                                                                    alt="..."></img></a>
                        </div>
                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                            <a href={`http://www.yourkit.com/`}><img src="yourkit.png"
                                                                     className="absolute block w-3/4 md:w-1/6 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                                                     alt="..."></img></a>
                        </div>
                    </div>
                    <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1"
                                data-carousel-slide-to="0"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2"
                                data-carousel-slide-to="1"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3"
                                data-carousel-slide-to="2"></button>
                    </div>
                    <button type="button"
                            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            data-carousel-prev>
        <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none"
                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            <span className="sr-only">Previous</span>
        </span>
                    </button>
                    <button type="button"
                            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            data-carousel-next>
        <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none"
                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            <span className="sr-only">Next</span>
        </span>
                    </button>
                </div>
            </section>
        </div>
    )
}

export default wrapper.withRedux(Home)