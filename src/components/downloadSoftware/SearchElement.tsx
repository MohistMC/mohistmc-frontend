import {ChangeEvent, useEffect, useRef, useState} from "react";
import {Build} from "@/interfaces/Build";
import {Checkbox, Dropdown, Label} from "flowbite-react";
import {Project} from "@/interfaces/Project";
import {NextRouter} from "next/router";
import {ToastLogger} from "@/util/Logger";

interface FilterDropdownProps {
    originalBuildPages: Build[][]
    setViewedBuildPages: (builds: Build[][]) => void
    setCurrentPage: (page: number) => void
    setNoResult: (noResult: boolean) => void
    perPage: number
    strings: Record<string, string>
    project: Project | undefined
    router: NextRouter
    selectedVersion: string | undefined
}

export default function SearchElement({
                                          originalBuildPages,
                                          setViewedBuildPages,
                                          setCurrentPage,
                                          setNoResult,
                                          perPage,
                                          strings,
                                          project,
                                          router,
                                          selectedVersion
                                      }: FilterDropdownProps) {
    // React states
    const [filters, setFilters] = useState<{
        buildNumber: boolean
        buildName: boolean
        buildMd5: boolean
        buildDate: boolean
        loaderVersion: boolean
    }>({
        buildNumber: true,
        buildName: true,
        buildMd5: true,
        buildDate: true,
        loaderVersion: true
    })
    const [exactMatchChecked, setExactMatchChecked] = useState(false)

    // React refs
    const searchInputRef = useRef<HTMLInputElement>(null)

    const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(0) // Reset the page because the builds will change

        const search = event.target.value

        // Update the URL
        await router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                search
            }
        }, undefined, {shallow: true})

        // If no search query, reset the pages
        if (search.length === 0) {
            setViewedBuildPages(originalBuildPages)
            setNoResult(false)
            return
        }

        // Filter the builds
        const modifiedBuildPages: Build[] = []

        for (const page of originalBuildPages) {
            const filteredPage = exactMatchChecked ?
                page.filter((build) =>
                    (filters.buildNumber && String(build.number).toLowerCase() === search.toLowerCase()) ||
                    (filters.buildMd5 && build.fileMd5.toLowerCase() === search.toLowerCase()) ||
                    (filters.buildName && build.fileName?.toLowerCase() === search.toLowerCase()) ||
                    (filters.buildDate && new Date(build.createdAt).toDateString().toLowerCase() === search.toLowerCase()) ||
                    (filters.loaderVersion && build.forgeVersion?.toLowerCase() === search.toLowerCase()) ||
                    (filters.loaderVersion && build.neoForgeVersion?.toLowerCase() === search.toLowerCase()) ||
                    (filters.loaderVersion && build.fabricLoaderVersion?.toLowerCase() === search.toLowerCase()))
                :
                page.filter((build) =>
                    (filters.buildNumber && String(build.number).toLowerCase().includes(search.toLowerCase())) ||
                    (filters.buildMd5 && build.fileMd5.toLowerCase().includes(search.toLowerCase())) ||
                    (filters.buildName && build.fileName?.toLowerCase().includes(search.toLowerCase())) ||
                    (filters.buildDate && new Date(build.createdAt).toDateString().toLowerCase().includes(search.toLowerCase()) ||
                        (filters.loaderVersion && build.forgeVersion?.toLowerCase().includes(search.toLowerCase()) ||
                            (filters.loaderVersion && build.neoForgeVersion?.toLowerCase().includes(search.toLowerCase()) ||
                                (filters.loaderVersion && build.fabricLoaderVersion?.toLowerCase().includes(search.toLowerCase())
                                )))))

            modifiedBuildPages.push(...filteredPage)
        }

        // Check if there is no result
        if (modifiedBuildPages.length === 0)
            setNoResult(true)

        // Split the builds into pages
        const modifiedPages: Build[][] = []
        for (let i = 0; i < modifiedBuildPages.length; i += perPage)
            modifiedPages.push(modifiedBuildPages.slice(i, i + perPage))

        setViewedBuildPages(modifiedPages)
    }

    const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
        const filter = event.target.name

        const updateUrl = (filter: string, value: boolean) => {
            router.push({
                pathname: router.pathname,
                query: {
                    ...router.query,
                    [filter]: value
                }
            }, undefined, {shallow: true}).catch()
        }

        switch (filter) {
            case 'buildNumber':
                setFilters({...filters, buildNumber: !filters.buildNumber})
                updateUrl('bNumF', !filters.buildNumber)
                break
            case 'buildName':
                setFilters({...filters, buildName: !filters.buildName})
                updateUrl('bNameF', !filters.buildName)
                break
            case 'buildMd5':
                setFilters({...filters, buildMd5: !filters.buildMd5})
                updateUrl('md5F', !filters.buildMd5)
                break
            case 'buildDate':
                setFilters({...filters, buildDate: !filters.buildDate})
                updateUrl('bDateF', !filters.buildDate)
                break
            case 'loaderVersion':
                setFilters({...filters, loaderVersion: !filters.loaderVersion})
                updateUrl('loaderVerF', !filters.loaderVersion)
                break
        }
    }

    /**
     * On builds loaded, apply filters that are in the URL, and fill the search input.
     */
    useEffect(() => {
        if (router.isReady) {
            const {bNumF, bNameF, md5F, bDateF, loaderVerF, search} = router.query as unknown as {
                bNumF: string,
                bNameF: string,
                md5F: string,
                bDateF: string,
                loaderVerF: string,
                search: string
            }

            setFilters({
                buildNumber: bNumF !== 'false',
                buildName: bNameF !== 'false',
                buildMd5: md5F !== 'false',
                buildDate: bDateF !== 'false',
                loaderVersion: loaderVerF !== 'false'
            })

            if (search && searchInputRef.current) {
                searchInputRef.current.value = search
                handleSearch({target: searchInputRef.current} as ChangeEvent<HTMLInputElement>).catch()
            }
        }
    }, [originalBuildPages])

    /**
     * Tell to the user that he still have filters on if he changes the version.
     */
    useEffect(() => {
        if (searchInputRef.current && searchInputRef.current.value.length)
            ToastLogger.info(strings['toast.filters.enabled'])
    }, [selectedVersion]);

    /**
     * On filters change or exact match checkbox change, update the results table.
     */
    useEffect(() => {
        if (searchInputRef.current)
            handleSearch({target: searchInputRef.current} as ChangeEvent<HTMLInputElement>).catch()
    }, [filters, exactMatchChecked]);

    return (
        <div className={`flex gap-2 mb-1 md:flex-row flex-col items-center justify-center`}>
            <div className="bg-white dark:bg-dark-50">
                <label htmlFor="table-search"
                       className="sr-only">{strings['downloadSoftware.search.placeholder']}</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" id="table-search" onChange={handleSearch} ref={searchInputRef}
                           className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-200 dark:border-dark-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder={strings['downloadSoftware.search.placeholder']}></input>
                </div>
            </div>

            <Dropdown label={strings['downloadSoftware.search.filter.btn']}>
                <div
                    className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input checked={filters.buildNumber} id="checkbox-item-4" type="checkbox" value=""
                           name={`buildNumber`}
                           onChange={handleFilter}
                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"></input>
                    <label htmlFor="checkbox-item-4"
                           className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{strings['downloadSoftware.build.number']}</label>
                </div>
                <div
                    className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input checked={filters.buildName} id="checkbox-item-5" type="checkbox" value="" name={`buildName`}
                           onChange={handleFilter}
                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"></input>
                    <label htmlFor="checkbox-item-5"
                           className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{strings['downloadSoftware.build.name']}</label>
                </div>
                <div
                    className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input checked={filters.buildMd5} id="checkbox-item-6" type="checkbox" value="" name={`buildMd5`}
                           onChange={handleFilter}
                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"></input>
                    <label htmlFor="checkbox-item-6"
                           className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{strings['downloadSoftware.build.md5']}</label>
                </div>
                <div
                    className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input checked={filters.buildDate} id="checkbox-item-7" type="checkbox" value="" name={`buildDate`}
                           onChange={handleFilter}
                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"></input>
                    <label htmlFor="checkbox-item-7"
                           className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{strings['downloadSoftware.build.date']}</label>
                </div>
                <div
                    className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input checked={filters.loaderVersion} id="checkbox-item-8" type="checkbox" value=""
                           name={`loaderVersion`}
                           onChange={handleFilter}
                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"></input>
                    <label htmlFor="checkbox-item-8"
                           className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{strings[project === Project.Mohist ? 'downloadSoftware.build.forgever' : 'downloadSoftware.build.fabricver']}</label>
                </div>
            </Dropdown>
            <div className="flex items-center gap-2">
                <Checkbox id="exactMatch" checked={exactMatchChecked}
                          onChange={(evt) => setExactMatchChecked(evt.currentTarget.checked)}/>
                <Label className="flex" htmlFor="exactMatch">
                    <p>
                        {strings['downloadSoftware.search.exactMatch']}
                    </p>
                </Label>
            </div>
        </div>
    )
}