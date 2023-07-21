import {Build} from "@/interfaces/Build";
import {Dropdown} from "flowbite-react";

interface DownloadButtonProps {
    build: Build;
    strings: Record<any, any>
}

export default function DownloadButton({build, strings}: DownloadButtonProps) {
    return (
        <div className={`hidden md:block`}>
            <Dropdown label={strings['button.downloads']} className={`bg-blue-600 hidden md:block`}>
                <a href={`https://adfoc.us/serve/sitelinks/?id=765928&url=${build.url.replace('/download', '/' + (build.fileName || 'download'))}`}
                   className="rounded-lg block px-4 py-2 mx-2 bg-orange-500 hover:bg-orange-600 text-white text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:hover:text-white font-semibold">{strings['button.download']}</a>
                <a href={build.url}
                   className="rounded-lg block px-4 mt-2 mx-2 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-center">{strings['button.download.mirror']}</a>
            </Dropdown>
        </div>
    )
}