import Link from "next/link";
import VersionSelectorElement from "@/components/downloadSoftware/VersionSelectorElement";
import {useRouter} from "next/router";
import {Project} from "@/interfaces/Project";
import {ChangeEvent, useEffect, useState} from "react";
import {Build, ProjectBuilds} from "@/interfaces/Build";
import NavigationTableElement from "@/components/downloadSoftware/NavigationTableElement";
import TableBuildElement from "@/components/downloadSoftware/TableBuildElement";
import LoadingParagraph from "@/components/downloadSoftware/LoadingParagraph";

export default function downloadSoftware() {
    const router = useRouter()
    const perPage = 10

    // React states
    const [software, setSoftware] = useState<Project | undefined>()
    const [originalBuildPages, setOriginalBuildPages] = useState<Build[][]>([])
    const [viewedBuildPages, setViewedBuildPages] = useState<Build[][]>([])
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [selectedVersion, setSelectedVersion] = useState<string | undefined>()

    useEffect(() => {
        if (router.isReady) {
            const {software} = router.query as { software: Project }

            if (software === Project.Mohist || software === Project.Banner)
                setSoftware(software)
            else
                router.push('/404').catch()
        }
    }, [router.isReady, router.query])

    useEffect(() => {
        const handleVersionChanged = async () => {
            setViewedBuildPages([])
            setOriginalBuildPages([])

            const projectBuildsReq = await fetch(`https://new-api.mohistmc.com/api/v2/projects/${software}/${selectedVersion}/builds`)
            const buildsJson: ProjectBuilds = await projectBuildsReq.json()

            if (!buildsJson?.builds || buildsJson?.builds?.length === 0) {
                // TODO: Toast error
                return
            }

            const builds = buildsJson.builds.reverse().map((build) => {
                return {
                    ...build,
                    fileName: `${software}-${selectedVersion}-${build.number}-server.jar`
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

    const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(0) // Reset the page because the builds will change

        const search = event.target.value

        // If no search query, reset the pages
        if (search.length === 0) {
            setViewedBuildPages(originalBuildPages)
            return
        }

        // Filter the builds
        const modifiedBuildPages: Build[] = []

        for (const page of originalBuildPages) {
            const filteredPage = page.filter((build) => String(build.number).toLowerCase().includes(search.toLowerCase()) || build.fileMd5.toLowerCase().includes(search.toLowerCase()) || build.fileName?.toLowerCase().includes(search.toLowerCase()))
            modifiedBuildPages.push(...filteredPage)
        }

        // Split the builds into pages
        const modifiedPages: Build[][] = []
        for (let i = 0; i < modifiedBuildPages.length; i += perPage)
            modifiedPages.push(modifiedBuildPages.slice(i, i + perPage))

        setViewedBuildPages(modifiedPages)
    }

    return (
        <section className="flex flex-col gap-6 items-center bg-gray-100 dark:bg-dark-25 pt-20 pb-20">
            <div className={`flex items-center justify-center`}>
                <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white md:mt-10 text-center">Download {software}</h1>
            </div>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Download software, short
                desc.</p>

            <div
                className="relative shadow-md dark:shadow-md dark:bg-dark-50 bg-white sm:rounded-lg mt-10 p-5">
                <div className={`flex md:justify-between md:gap-0 gap-2 justify-center items-center pb-4 flex-wrap`}>
                    <div className="bg-white dark:bg-dark-50">
                        <label htmlFor="table-search" className="sr-only">Search for builds</label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <input type="text" id="table-search" onChange={handleSearch}
                                   className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-200 dark:border-dark-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Search for builds"></input>
                        </div>
                    </div>
                    <VersionSelectorElement selectedVersion={selectedVersion} setSelectedVersion={setSelectedVersion}
                                            software={software}/>
                </div>
                <table
                    className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-separate border-spacing-0 rounded-lg overflow-hidden">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-200 dark:text-gray-300 rounded-xl">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Build name
                        </th>
                        <th scope="col" className="px-6 py-3 hidden md:table-cell">
                            <div className="flex items-center">
                                MD5 Checksum
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 hidden md:table-cell">
                            <div className="flex items-center">
                                Built on
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
                        {software === Project.Mohist &&
                            <th scope="col" className="px-6 py-3 hidden md:table-cell">
                                <div className="flex items-center">
                                    {software === Project.Mohist ? "Forge Version" : "N/A"}
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
                        }
                        <th scope="col" className="px-6 py-3 hidden md:table-cell">
                            <span className="sr-only">Download</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">GitHub</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {viewedBuildPages.length > 0 &&
                        viewedBuildPages[currentPage].map((build, index) => TableBuildElement({
                                build,
                                isLatest: build === originalBuildPages[0][0],
                                project: software as Project,
                                indexOnPage: index,
                            }
                        ))
                    }
                    </tbody>
                </table>
                {viewedBuildPages.length === 0 &&
                    <div className="flex justify-center mt-4">
                        <LoadingParagraph/>
                    </div>
                }
                <NavigationTableElement buildPages={viewedBuildPages} currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}/>
            </div>

        </section>
    )
}