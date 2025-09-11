import Link from 'next/link'
import {GitHubLink} from "@/utils/LinkUtil";

export type AuthorDetails = {
    id: string
    name: string
    role: string
}

export default function TeamCard({ id, name, role }: AuthorDetails) {
    return (
        <div className="w-full max-w-sm border border-gray-200 rounded-md shadow">
            <div className="flex flex-col items-center pb-10">
                <div className="avatar">
                    <div className="w-24 h-24 mb-3 mt-6 rounded-full shadow-md">
                        <img src={GitHubLink.asPng(id)}  alt="Rounded avatar"/>
                    </div>
                </div>
                <h2 className="mb-1 text-xl font-medium">
                    {name}
                </h2>
                <span className="text-sm">
                    {role}
                </span>
                <Link
                    href={GitHubLink.as(id)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex mt-5 items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    查看简介
                </Link>
            </div>
        </div>
    )
}
