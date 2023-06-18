export default function Custom404() {
    return (
        <section className="flex flex-col justify-center items-center bg-white dark:bg-dark-50 h-full">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">404 <span
                    className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">not found</span>
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{`We're sorry, the resource you're looking for cannot be found on this website.`}</p>
        </section>
    )
}