import {Build} from "@/interfaces/Build";
import {useState} from "react";

interface DownloadButtonProps {
    build: Build;
}

export default function DownloadButton({build}: DownloadButtonProps) {
    const [hidden, setHidden] = useState(true)

    return (
        <div className={`hidden md:block`}>
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" onClick={() => setHidden(!hidden)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">Downloads <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none"
                                                       stroke="currentColor" viewBox="0 0 24 24"
                                                       xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg></button>
            <div id="dropdown"
                 className={`${hidden && 'hidden'} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute`}>
                <ul className="flex flex-col items-center gap-1 py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <a href={`https://adfoc.us/serve/sitelinks/?id=765928&url=${build.url}`}
                           className="rounded-lg block px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-700 dark:hover:text-white font-semibold">Direct download</a>
                    </li>
                    <li>
                        <a href={build.url}
                           className="rounded-lg block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mirror</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}