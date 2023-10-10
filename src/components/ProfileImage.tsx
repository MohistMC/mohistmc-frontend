import {getInitials} from "@/util/String";

const ProfileImage = ({name, githubUrl, size}: {name: string, githubUrl: string, size: number}): JSX.Element => {
    const githubUsername = githubUrl?.split('/')?.pop()

    if (githubUsername) {
        return (
            <img className={`w-${size || 14} h-${size || 14} rounded-full`} src={`https://github.com/${githubUsername}.png`} alt="Rounded avatar"></img>
        )
    } else {
        return (
            <div
                className={`relative inline-flex items-center justify-center w-${size || 14} h-${size || 14} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
                <span className="font-medium text-gray-600 dark:text-gray-400">{getInitials(name)}</span>
            </div>
        )
    }
}

export default ProfileImage