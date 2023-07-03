import SwaggerComponent from "@/components/SwaggerComponent";
import {useSelector} from "react-redux";
import {selectTheme} from "@/features/theme/ThemeSlice";
import "../app/swagger-custom.scss"

export default function MohistApi() {
    // Redux
    const isDark = useSelector(selectTheme)

    return (
        <div className={`bg-white dark:bg-dark-25 flex flex-col`}>
            <section className="flex flex-col justify-center items-center pt-20 bg-white dark:bg-dark-25">
                <div className="pt-10 px-4 mx-auto max-w-screen-xl text-center">
                    <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Access to the <span className="text-blue-600 dark:text-blue-500">json rest API</span> of MohistMC</h1>
                    <p className="mb-12 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-300">text.</p>
                </div>
            </section>
            <section className={`${isDark ? 'dark-theme' : 'white-theme' }`}>
                <SwaggerComponent />
            </section>
        </div>
    )
}