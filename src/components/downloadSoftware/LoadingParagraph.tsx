export default function LoadingParagraph() {
    return (
        <div role="status" className="space-y-2.5 animate-pulse w-full">
            <div className="flex items-center w-full space-x-2">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-dark-300 w-32"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-dark-200 w-24"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-dark-200 w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[480px]">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-dark-300 w-full"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-dark-200 w-full"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-dark-200 w-24"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[400px]">
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-dark-200 w-full"></div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-dark-300 w-80"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-dark-200 w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[480px]">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-dark-300 w-full"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-dark-200 w-full"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-dark-200 w-24"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[440px]">
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-dark-200 w-32"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-dark-200 w-24"></div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-dark-300 w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[360px]">
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-dark-200 w-full"></div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-dark-300 w-80"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-dark-200 w-full"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}