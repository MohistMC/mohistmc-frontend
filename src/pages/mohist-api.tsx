import SwaggerComponent from "@/components/SwaggerComponent";
import {useSelector} from "react-redux";
import {selectTheme} from "@/features/theme/ThemeSlice";
import "../app/swagger-custom.scss"
import LoaderBarElement from "@/components/mohist-api/LoaderBarElement";
import {useState} from "react";

export default function MohistApi() {
    // Redux
    const isDark = useSelector(selectTheme)

    // React states
    const [isSwaggerLoaded, setIsSwaggerLoaded] = useState<boolean>(false)

    const onComplete = () => {
        setIsSwaggerLoaded(true)
    }

    return (
        <div className={`bg-white dark:bg-dark-25 flex flex-col`}>
            <section className="flex flex-col justify-center items-center pt-20 bg-white dark:bg-dark-25">
                <div className="pt-10 px-4 mx-auto max-w-screen-xl text-center">
                    <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">MohistMC <span className="text-blue-600 dark:text-blue-500">JSON API</span></h1>
                    <p className="mb-12 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-300">Access the MohistMC JSON API to get our software builds and more!</p>
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