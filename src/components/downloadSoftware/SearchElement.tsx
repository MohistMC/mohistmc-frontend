import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Checkbox, Dropdown, Label } from 'flowbite-react'
import { Project } from '@/dto/Project'
import { useRouter } from 'next/router'
import { ToastLogger } from '@/util/Logger'
import { BuildDto } from '@/dto/Build'

interface FilterDropdownProps {
    originalBuildPages: BuildDto[][]
    setViewedBuildPages: (builds: BuildDto[][]) => void
    setCurrentPage: (page: number) => void
    setNoResult: (noResult: boolean) => void
    perPage: number
    strings: Record<string, string>
    project: Project | undefined
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
    selectedVersion,
}: FilterDropdownProps) {
    // React states
    const [filters, setFilters] = useState<{
        buildNumber: boolean
        buildId: boolean
        buildSha256: boolean
        buildDate: boolean
        loaderVersion: boolean
    }>({
        buildNumber: true,
        buildId: true,
        buildSha256: true,
        buildDate: true,
        loaderVersion: true,
    })
    const [exactMatchChecked, setExactMatchChecked] = useState(false)
    const [search, setSearch] = useState<string>('')

    // React refs
    const searchInputRef = useRef<HTMLInputElement>(null)

    const router = useRouter()

    /**
     * Handle the search input change.
     * @param event The event.
     */
    const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const updateUrl = (filter: string, value: boolean) => {
        router
            .push(
                {
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        [filter]: value,
                    },
                },
                undefined,
                { shallow: true },
            )
            .catch()
    }

    const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
        const filter = event.target.name

        switch (filter) {
            case 'buildNumber':
                setFilters({ ...filters, buildNumber: !filters.buildNumber })
                updateUrl('bNumF', !filters.buildNumber)
                break
            case 'buildId':
                setFilters({ ...filters, buildId: !filters.buildId })
                updateUrl('bIdF', !filters.buildId)
                break
            case 'buildSha256':
                setFilters({ ...filters, buildSha256: !filters.buildSha256 })
                updateUrl('sha256F', !filters.buildSha256)
                break
            case 'buildDate':
                setFilters({ ...filters, buildDate: !filters.buildDate })
                updateUrl('bDateF', !filters.buildDate)
                break
            case 'loaderVersion':
                setFilters({
                    ...filters,
                    loaderVersion: !filters.loaderVersion,
                })
                updateUrl('loaderVerF', !filters.loaderVersion)
                break
        }
    }

    const handleExactMatch = (event: ChangeEvent<HTMLInputElement>) => {
        setExactMatchChecked(event.target.checked)
        updateUrl('eM', event.target.checked)
    }

    /**
     * On builds loaded, apply filters that are in the URL, and fill the search input.
     */
    useEffect(() => {
        if (router.isReady) {
            const { bNumF, bIdF, sha256F, bDateF, loaderVerF, eM, search } =
                router.query as unknown as {
                    bNumF: string
                    bIdF: string
                    sha256F: string
                    bDateF: string
                    loaderVerF: string
                    eM: string
                    search: string
                }

            setFilters({
                buildNumber: bNumF !== 'false',
                buildId: bIdF !== 'false',
                buildSha256: sha256F !== 'false',
                buildDate: bDateF !== 'false',
                loaderVersion: loaderVerF !== 'false',
            })

            setExactMatchChecked(eM === 'true')

            if (search && searchInputRef.current) {
                searchInputRef.current.value = search
                handleSearch({
                    target: searchInputRef.current,
                } as ChangeEvent<HTMLInputElement>).catch()
            }
        }
    }, [originalBuildPages])

    /**
     * Tell to the user that he still have filters on if he changes the version.
     */
    useEffect(() => {
        if (searchInputRef.current && searchInputRef.current.value.length)
            ToastLogger.info(strings['toast.filters.enabled'])
    }, [selectedVersion])

    /**
     * On search change, update the URL.
     */
    useEffect(() => {
        const updateTable = () => {
            setCurrentPage(0) // Reset the page because the builds will change

            // If no search query, reset the pages
            if (search.length === 0) {
                setViewedBuildPages(originalBuildPages)
                setNoResult(false)
                return
            }

            // Filter the builds
            const modifiedBuildPages: BuildDto[] = []

            for (const page of originalBuildPages) {
                const filteredPage = exactMatchChecked
                    ? page.filter(
                          (build) =>
                              (filters.buildNumber &&
                                  build?.commit?.hash &&
                                  build?.commit?.hash.toLowerCase() ===
                                      search.toLowerCase()) ||
                              (filters.buildId &&
                                  String(build?.id) === search.toLowerCase()) ||
                              (filters.buildSha256 &&
                                  build.file_sha256.toLowerCase() ===
                                      search.toLowerCase()) ||
                              (filters.buildDate &&
                                  new Date(build.build_date)
                                      .toDateString()
                                      .toLowerCase() ===
                                      search.toLowerCase()) ||
                              (filters.loaderVersion &&
                                  build.loader?.forge_version?.toLowerCase() ===
                                      search.toLowerCase()) ||
                              (filters.loaderVersion &&
                                  build.loader?.neoforge_version?.toLowerCase() ===
                                      search.toLowerCase())
                      )
                    : page.filter(
                          (build) =>
                              (filters.buildId &&
                                  String(build?.id)?.includes(
                                      search.toLowerCase(),
                                  )) ||
                              (filters.buildSha256 &&
                                  build.file_sha256
                                      .toLowerCase()
                                      .includes(search.toLowerCase())) ||
                              (filters.buildDate &&
                                  new Date(build.build_date)
                                      .toDateString()
                                      .toLowerCase()
                                      .includes(search.toLowerCase())) ||
                              (filters.loaderVersion &&
                                  build.loader?.forge_version
                                      ?.toLowerCase()
                                      .includes(search.toLowerCase())) ||
                              (filters.loaderVersion &&
                                  build.loader?.neoforge_version
                                      ?.toLowerCase()
                                      .includes(search.toLowerCase())),
                      )

                modifiedBuildPages.push(...filteredPage)
            }

            // Check if there is no result
            if (modifiedBuildPages.length === 0) setNoResult(true)

            // Split the builds into pages
            const modifiedPages: BuildDto[][] = []
            for (let i = 0; i < modifiedBuildPages.length; i += perPage)
                modifiedPages.push(modifiedBuildPages.slice(i, i + perPage))

            setViewedBuildPages(modifiedPages)
        }

        if (searchInputRef.current) {
            updateTable()

            if (search.length > 0)
                router.push(
                    {
                        pathname: router.pathname,
                        query: {
                            ...router.query,
                            search,
                        },
                    },
                    undefined,
                    { shallow: true },
                )
        }
    }, [search])

    return (
        <div
            className={`flex gap-2 mb-1 md:flex-row flex-col items-center justify-center`}
        >
            <div className="bg-white dark:bg-dark-50">
                <label htmlFor="table-search" className="sr-only">
                    {strings['downloadSoftware.search.placeholder']}
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        onChange={handleSearch}
                        ref={searchInputRef}
                        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-200 dark:border-dark-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={
                            strings['downloadSoftware.search.placeholder']
                        }
                    ></input>
                </div>
            </div>

            <Dropdown
                label={strings['downloadSoftware.search.filter.btn']}
                className={`select-none`}
            >
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                        checked={filters.buildNumber}
                        id="checkbox-item-4"
                        type="checkbox"
                        value=""
                        name={`buildNumber`}
                        onChange={handleFilter}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    ></input>
                    <label
                        htmlFor="checkbox-item-4"
                        className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                        {strings['downloadSoftware.build.number']}
                    </label>
                </div>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                        checked={filters.buildSha256}
                        id="checkbox-item-9"
                        type="checkbox"
                        value=""
                        name={`buildSha256`}
                        onChange={handleFilter}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    ></input>
                    <label
                        htmlFor="checkbox-item-9"
                        className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                        {strings['downloadSoftware.build.sha256']}
                    </label>
                </div>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                        checked={filters.buildDate}
                        id="checkbox-item-7"
                        type="checkbox"
                        value=""
                        name={`buildDate`}
                        onChange={handleFilter}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    ></input>
                    <label
                        htmlFor="checkbox-item-7"
                        className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                        {strings['downloadSoftware.build.date']}
                    </label>
                </div>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                        checked={filters.loaderVersion}
                        id="checkbox-item-8"
                        type="checkbox"
                        value=""
                        name={`loaderVersion`}
                        onChange={handleFilter}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    ></input>
                    <label
                        htmlFor="checkbox-item-8"
                        className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                        {
                            strings[
                                project === Project.Mohist
                                    ? 'downloadSoftware.build.forgever'
                                    : 'downloadSoftware.build.neoforgever'
                            ]
                        }
                    </label>
                </div>
            </Dropdown>
            <div className="flex items-center gap-2 select-none">
                <Checkbox
                    id="exactMatch"
                    checked={exactMatchChecked}
                    onChange={handleExactMatch}
                />
                <Label className="flex" htmlFor="exactMatch">
                    <p>{strings['downloadSoftware.search.exactMatch']}</p>
                </Label>
            </div>
        </div>
    )
}
