import Link from "next/link";
import {Build} from "@/interfaces/Build";

interface NavigationTableElementProps {
    buildPages: Build[][];
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export default function NavigationTableElement({buildPages, currentPage, setCurrentPage}: NavigationTableElementProps) {
    return (
        <nav className="flex items-center md:justify-between justify-center md:gap-0 gap-2 pt-4 flex-wrap"
             aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span
                        className="font-semibold text-gray-900 dark:text-white">{buildPages.length ? 1 : 0}-{buildPages.length}</span> of <span
                        className="font-semibold text-gray-900 dark:text-white">{buildPages.reduce((acc, val) => acc + val.length, 0)}</span></span>
            <ul className="inline-flex items-center -space-x-px">
                <li>
                    <Link href="#"
                          className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-dark-100 dark:border-dark-200 dark:text-gray-400 dark:hover:bg-dark-200 dark:hover:text-white">
                        <span className="sr-only">Previous</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </Link>
                </li>
                {
                    buildPages.map((_, index) => {
                        return (
                            <li key={index}>
                                <Link href="#"
                                      className={`px-3 py-2 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-dark-100 dark:border-dark-200 dark:text-gray-400 dark:hover:bg-dark-200 dark:hover:text-white ${index === currentPage ? "z-10 text-blue-600 bg-blue-50 dark:bg-dark-200 dark:text-white" : "text-gray-500 bg-white"}`}
                                      onClick={() => setCurrentPage(index)}>{index + 1}</Link>
                            </li>
                        )
                    })
                }
                <li>
                    <Link href="#"
                          className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-dark-100 dark:border-dark-200 dark:text-gray-400 dark:hover:bg-dark-200 dark:hover:text-white">
                        <span className="sr-only">Next</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}