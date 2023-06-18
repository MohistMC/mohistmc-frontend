import Link from "next/link";

export default function Downloads() {
    return (
        <section className="flex flex-col justify-center items-center pt-20 bg-white dark:bg-dark-50">
            <h1 className="md:mt-20 text-center w-3/4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Download
                any of our software <span className="text-blue-600 dark:text-blue-500">for free!</span></h1>

            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
                <div
                    className="bg-gray-50 dark:bg-dark-100 border border-gray-200 dark:border-dark-200 rounded-lg p-8 md:p-12 mb-8 hover:bg-gray-100 dark:hover:bg-dark-200 cursor-pointer"
                onClick={() => {
                    window.location.href = "/software/mohist"
                }}>
                    <Link href="https://minecraftforge.net"
                       className="bg-blue-100 text-blue-800 text-xs font-medium items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 mb-2">
                        Forge
                    </Link>
                    <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2 mt-1">Mohist</h1>
                    <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">A Minecraft Forge
                        server
                        software implementing Bukkit, Spigot and Paper APIs. With this software, you can create a
                        Minecraft server with mods and plugins together!</p>
                    <div className={`flex flex-row flex-wrap gap-2`}>
                        <Link href={`/downloadSoftware?software=mohist`}
                           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium inline-flex items-center rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Download
                            <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor"
                                 viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clipRule="evenodd">
                                </path>
                            </svg>
                        </Link>
                        <Link href={`https://wiki.mohistmc.com`}
                           className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-dark-200 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            Documentation
                        </Link>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div
                        className="bg-gray-50 dark:bg-dark-100 border border-gray-200 dark:border-dark-200 rounded-lg p-8 md:p-12 hover:bg-gray-100 dark:hover:bg-dark-200"
                        onClick={() => {
                            window.location.href = "/software/banner"
                        }}>
                        <Link href="https://fabricmc.net/"
                           className="bg-green-100 text-green-800 text-xs font-medium items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-2">
                            Fabric
                        </Link>
                        <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2 mt-1">Banner</h2>
                        <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">A Minecraft Fabric
                            server software implementing Bukkit and Spigot APIs. This software allows you to create
                            a
                            Minecraft server with Fabric mods and plugins, just like Mohist.</p>
                        <div className={`flex flex-row flex-wrap gap-2`}>
                            <Link href={`/software/banner`}
                               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium inline-flex items-center rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Download
                                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor"
                                     viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                          clipRule="evenodd">
                                    </path>
                                </svg>
                            </Link>
                            <Link href={`#`}
                               className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-dark-200 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                Documentation
                            </Link>
                        </div>
                    </div>
                    <div className={`flex justify-center items-center`}>
                        <h2 className="text-5xl font-extrabold dark:text-white">{`That's all`}<small
                            className="ml-2 font-semibold text-gray-500 dark:text-gray-400">for now</small></h2>
                    </div>
                </div>
            </div>
        </section>

    )
}