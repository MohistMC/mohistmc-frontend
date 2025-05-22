import { Dropdown } from 'flowbite-react'
import { BuildDto } from '@/dto/Build'
import { getAPIEndpoint } from '@/util/Environment'

interface DownloadButtonProps {
    build: BuildDto
    project: string
    projectVersion: string
    strings: Record<any, any>
}

export default function DownloadButton({
    build,
    project,
    projectVersion,
    strings,
}: DownloadButtonProps) {
    return (
        <div className={`hidden md:block`}>
            <Dropdown
                label={strings['button.downloads']}
                className={`hidden md:block py-2 pb-2`}
            >
                <a
                    href={`https://adfoc.us/serve/sitelinks/?id=765928&url=${getAPIEndpoint()}/project/${project}/${projectVersion}/builds/${build.id}/download`}
                    className="rounded-lg block px-4 py-2 mx-2 bg-orange-500 hover:bg-orange-600 text-white text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:hover:text-white font-semibold"
                >
                    {strings['button.download']}
                </a>
                <a
                    href={`${getAPIEndpoint()}/project/${project}/${projectVersion}/builds/${build.id}/download`}
                    className="rounded-lg block px-4 mt-2 mx-2 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-center"
                >
                    {strings['button.download.mirror']}
                </a>
            </Dropdown>
        </div>
    )
}
