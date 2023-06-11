export default function Sponsor() {
    return (
        <div className={`bg-white dark:bg-dark-25 flex flex-col`}>
            <section className="flex flex-col justify-center items-center pt-20 bg-white dark:bg-dark-50">
                <div className="pt-10 px-4 mx-auto max-w-screen-xl text-center">
                    <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Support
                        the <span className="text-blue-600 dark:text-blue-500">future</span> of Minecraft innovation with
                        MohistMC</h1>
                    <p className="mb-12 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-300">Help
                        fuel the growth of MohistMC's community. Your support covers essential expenses, including services,
                        servers, and infrastructure. Contribute today and make a difference in the future of MohistMC.</p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <a href="/downloads"
                           className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                            OpenCollective
                            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                                <path
                                    d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                            </svg>
                        </a>
                        <a href="#"
                           className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            GitHub Sponsors
                        </a>
                    </div>
                </div>
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
            <section className={``}>
                <div className="pt-10 md:pb-0 pb-6 px-4 mx-auto max-w-screen-xl text-center">
                    <h2 className="text-center mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">Our <span className="text-blue-600 dark:text-blue-500">sponsors</span></h2>
                    <p className="mb-12 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-100">They trust in our projects!</p>

                </div>
            </section>
        </div>
    )
}