export default function LoaderBarElement() {
    return (
        <div className="flex items-center justify-between pt-4">
            <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-dark-300 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-dark-400"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-dark-400 w-12"></div>
        </div>
    )
}
