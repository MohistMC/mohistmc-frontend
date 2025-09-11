import {GitHubLink} from "@/utils/LinkUtil";

export type AuthorList = {
    id: string
    name: string
}

export default function CommunityTeamCard({ id, name }: AuthorList) {
    return (
        <div className="flex flex-wrap relative">
            <a href={GitHubLink.as(id)} className="group">
                <div className="avatar">
                    <div className="w-15 rounded-full">
                        <img src={GitHubLink.asPng(id)}  alt="Rounded avatar"/>
                    </div>
                </div>
                {/* 提示框 */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-3 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900 text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap pointer-events-none">
                    {name}
                </div>
            </a>
        </div>
    )
}
