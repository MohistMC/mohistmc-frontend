import Link from "next/link";

type TeamCardProps = {
    name: string,
    role: string,
    pageUrl: string
}

export default function TeamCard({ name, role, pageUrl }: TeamCardProps) {
    const githubUsername = pageUrl.split('/').pop()

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-dark-100 dark:border-dark-300 hover:bg-gray-100 dark:hover:bg-dark-200">
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 mt-6 rounded-full shadow-lg"
                     src={`https://github.com/${githubUsername}.png`} alt={`${name}'s profile image`}/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{role}</span>
                <Link href={pageUrl} target="_blank" rel="noreferrer" className="inline-flex mt-5 items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Visit profile</Link>
            </div>
        </div>
    )
}