import { Build } from '@/interfaces/Build'
import React from 'react'
import { useAppSelector } from '@/util/redux/Hooks'
import { selectTranslations } from '@/features/i18n/TranslatorSlice'

interface NavigationTableElementProps {
    buildPages: Build[][]
    currentPage: number
    setCurrentPage: (page: number) => void
}

export default function NavigationTableElement({
    buildPages,
    currentPage,
    setCurrentPage,
}: NavigationTableElementProps) {
    const buildPageDisplayed =
        buildPages.length > 4
            ? [...buildPages.slice(0, 3), undefined]
            : buildPages

    // React states
    const [customPage, setCustomPage] = React.useState<string>('...')

    const handleCustomPage = () => {
        setCustomPage('')
    }

    const i18n = useAppSelector(selectTranslations)

    return (
        <nav
            className="flex items-center md:justify-between justify-center md:gap-0 gap-2 pt-4 flex-wrap"
            aria-label="Table navigation"
        >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {i18n['table.page.1']}{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {buildPages.length ? 1 : 0}-{buildPages.length}
                </span>{' '}
                {i18n['table.page.2']}{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {buildPages.reduce((acc, val) => acc + val.length, 0)}
                </span>
            </span>
            <ul className="inline-flex items-center -space-x-px">
                <li>
                    <div
                        role={'button'}
                        onClick={() =>
                            currentPage > 0 && setCurrentPage(currentPage - 1)
                        }
                        className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-dark-100 dark:border-dark-200 dark:text-gray-400 dark:hover:bg-dark-200 dark:hover:text-white"
                    >
                        <span className="sr-only">Previous</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </li>
                {buildPageDisplayed
                    .map((_, index) => {
                        const toRender = []

                        // If the page is undefined, it means it's the custom page element and we want to render it + the last page
                        !_ &&
                            toRender.push(
                                <li key={`button-custom`}>
                                    <div
                                        role={'button'}
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        className={`px-3 py-2 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-dark-100 dark:border-dark-200 dark:text-gray-400 dark:hover:bg-dark-200 dark:hover:text-white ${currentPage > 2 && currentPage < buildPages.length - 1 ? 'z-10 text-blue-600 bg-blue-50 dark:bg-dark-200 dark:text-white' : 'text-gray-500 bg-white'}`}
                                        onClick={handleCustomPage}
                                        onInput={(e) => {
                                            if (
                                                Number.isNaN(
                                                    Number(
                                                        e.currentTarget
                                                            .textContent,
                                                    ),
                                                )
                                            )
                                                e.currentTarget.textContent =
                                                    customPage
                                            else
                                                setCustomPage(
                                                    e.currentTarget
                                                        .textContent || '...',
                                                )
                                        }}
                                        onBlur={() => {
                                            if (
                                                Number.isNaN(customPage) ||
                                                Number(customPage) < 1 ||
                                                Number(customPage) >
                                                    buildPages.length
                                            )
                                                setCustomPage('...')
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.currentTarget.blur()

                                                if (
                                                    Number.isNaN(
                                                        Number(customPage),
                                                    ) ||
                                                    Number(customPage) < 1 ||
                                                    Number(customPage) >
                                                        buildPages.length
                                                ) {
                                                    setCustomPage('...')
                                                    return
                                                }

                                                setCurrentPage(
                                                    Number(customPage) - 1,
                                                )
                                                setCustomPage('...')
                                            } else if (e.key === 'Escape') {
                                                e.currentTarget.blur()
                                                setCustomPage('...')
                                            }
                                        }}
                                    >
                                        {customPage}
                                    </div>
                                </li>,
                            )

                        toRender.push(
                            <li key={`button-${index}`}>
                                <div
                                    role={'button'}
                                    className={`px-3 py-2 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-dark-100 dark:border-dark-200 dark:text-gray-400 dark:hover:bg-dark-200 dark:hover:text-white ${(!_ ? buildPages.length - 1 : index) === currentPage ? 'z-10 text-blue-600 bg-blue-50 dark:bg-dark-200 dark:text-white' : 'text-gray-500 bg-white'}`}
                                    onClick={() =>
                                        setCurrentPage(
                                            !_ ? buildPages.length - 1 : index,
                                        )
                                    }
                                >
                                    {!_ ? buildPages.length : index + 1}
                                </div>
                            </li>,
                        )

                        return toRender
                    })
                    .flat()}
                <li>
                    <div
                        role={'button'}
                        onClick={() =>
                            currentPage < buildPages.length - 1 &&
                            setCurrentPage(currentPage + 1)
                        }
                        className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-dark-100 dark:border-dark-200 dark:text-gray-400 dark:hover:bg-dark-200 dark:hover:text-white"
                    >
                        <span className="sr-only">Next</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </li>
            </ul>
        </nav>
    )
}
