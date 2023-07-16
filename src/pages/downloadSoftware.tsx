import Link from "next/link";
import VersionSelectorElement from "@/components/downloadSoftware/VersionSelectorElement";
import {useRouter} from "next/router";
import {Project} from "@/interfaces/Project";
import {useEffect, useState} from "react";
import {Build, ProjectBuilds} from "@/interfaces/Build";
import NavigationTableElement from "@/components/downloadSoftware/NavigationTableElement";
import TableBuildElement from "@/components/downloadSoftware/TableBuildElement";
import LoadingParagraph from "@/components/downloadSoftware/LoadingParagraph";
import {capitalizeFirstLetter} from "@/util/String";
import {useAppSelector} from "@/util/redux/Hooks";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";
import {getLocaleStringAsArgs} from "@/util/LocaleHelper";
import SearchElement from "@/components/downloadSoftware/SearchElement";

export default function DownloadSoftware() {
    const router = useRouter()
    const strings = useAppSelector(selectTranslations);
    const perPage = 10

    // React states
    const [project, setProject] = useState<Project | undefined>()
    const [originalBuildPages, setOriginalBuildPages] = useState<Build[][]>([])
    const [viewedBuildPages, setViewedBuildPages] = useState<Build[][]>([])
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [selectedVersion, setSelectedVersion] = useState<string | undefined>()
    const [noResult, setNoResult] = useState<boolean>(false)
    const [noBuild, setNoBuild] = useState<boolean>(false)

    useEffect(() => {
        if (router.isReady) {
            const {software} = router.query as { software: Project }

            if (software === Project.Mohist || software === Project.Banner)
                setProject(software)
            else
                router.push('/404').catch()
        }
    }, [router.isReady, router.query])

    useEffect(() => {
        const handleVersionChanged = async () => {
            setViewedBuildPages([])
            setOriginalBuildPages([])
            setNoBuild(false)

            const projectBuildsReq = await fetch(`https://mohistmc.com/api/v2/projects/${project}/${selectedVersion}/builds`)
            const buildsJson: ProjectBuilds = await projectBuildsReq.json()

            if (!buildsJson?.builds || buildsJson?.builds?.length === 0) {
                setNoBuild(true)
                // TODO: Toast error
                return
            }

            const builds = buildsJson.builds.reverse().map((build) => {
                return {
                    ...build,
                    fileName: `${project}-${selectedVersion}-${build.number}-server.jar`
                }
            })

            const pages: Build[][] = []
            for (let i = 0; i < builds.length; i += perPage)
                pages.push(builds.slice(i, i + perPage))

            // Check if the user have changed the version while the builds were loading
            if (selectedVersion !== buildsJson.projectVersion)
                return

            setOriginalBuildPages(pages)
            setViewedBuildPages(pages)
            setCurrentPage(0)
        }

        selectedVersion && handleVersionChanged().catch()
    }, [selectedVersion])


    return (
        <section className="flex flex-col gap-6 items-center bg-gray-100 dark:bg-dark-25 pt-20 pb-20">
            <div className={`flex items-center justify-center pt-10 md:pt-0`}>
                <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white md:mt-10 text-center">{getLocaleStringAsArgs(strings['downloadSoftware.title'])[0]}
                    <span
                        className="text-blue-600 dark:text-blue-500">&nbsp;{capitalizeFirstLetter(project)}</span>
                    {getLocaleStringAsArgs(strings['downloadSoftware.title'])[1]}
                </h1>
            </div>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{strings[`downloadSoftware.${project}.desc`]}</p>

            <div
                className="relative shadow-md dark:shadow-md dark:bg-dark-50 bg-white sm:rounded-lg mt-10 p-5">
                <div className={`flex md:justify-between gap-2 justify-center items-center pb-4 flex-wrap`}>
                    <SearchElement originalBuildPages={originalBuildPages} setViewedBuildPages={setViewedBuildPages}
                                   setCurrentPage={setCurrentPage} setNoResult={setNoResult} perPage={perPage}
                                   strings={strings}/>
                    <VersionSelectorElement selectedVersion={selectedVersion} setSelectedVersion={setSelectedVersion}
                                            software={project}/>
                </div>
                <table
                    className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-separate border-spacing-0 rounded-lg overflow-hidden">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-200 dark:text-gray-300 rounded-xl">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            {strings['downloadSoftware.build.name']}
                        </th>
                        <th scope="col" className="px-6 py-3 hidden md:table-cell">
                            <div className="flex items-center">
                                {strings['downloadSoftware.build.md5']}
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 hidden md:table-cell">
                            <div className="flex items-center">
                                {strings['downloadSoftware.build.date']}
                                <Link href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1"
                                         aria-hidden="true"
                                         fill="currentColor" viewBox="0 0 320 512">
                                        <path
                                            d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
                                    </svg>
                                </Link>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 hidden md:table-cell">
                            <div className="flex items-center">
                                {project === Project.Mohist ? strings['downloadSoftware.build.forgever'] : project === Project.Banner ? strings['downloadSoftware.build.fabricver'] : "N/A"}
                                <Link href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1"
                                         aria-hidden="true"
                                         fill="currentColor" viewBox="0 0 320 512">
                                        <path
                                            d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
                                    </svg>
                                </Link>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 hidden md:table-cell">
                            <span className="sr-only">{strings['button.download']}</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">{strings['social.github']}</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {viewedBuildPages.length > 0 &&
                        viewedBuildPages[currentPage].map((build, index) => TableBuildElement({
                                build,
                                isLatest: build === originalBuildPages[0][0],
                                project: project as Project,
                                indexOnPage: index,
                                strings,
                            }
                        ))
                    }
                    </tbody>
                </table>
                {viewedBuildPages.length === 0 && !noResult && !noBuild &&
                    <div className="flex justify-center mt-4">
                        <LoadingParagraph/>
                    </div>
                }
                {noResult &&
                    <div className="flex justify-center mt-4">
                        <p className="text-gray-500 dark:text-gray-400">{strings['downloadSoftware.search.noresults']}</p>
                    </div>
                }
                {noBuild &&
                    <div className="flex justify-center mt-4">
                        <p className="text-gray-500 dark:text-gray-400">{strings['downloadSoftware.search.nobuilds']}</p>
                    </div>
                }
                <NavigationTableElement buildPages={viewedBuildPages} currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}/>
            </div>

        </section>
    )
}