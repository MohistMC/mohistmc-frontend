import {getInitials} from "@/util/String";

interface AvatarProps {
    name: string,
    avatar: string,
}

export default function Avatar({ name, avatar }: AvatarProps) {
    return (
        avatar ?
            <img className="w-14 h-14 rounded-full" src={avatar} alt="Rounded avatar"></img>
            :
            <div
                className="relative inline-flex items-center justify-center w-14 h-14 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">{getInitials(name)}</span>
            </div>
    )
}