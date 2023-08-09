import {Avatar, Button, CustomFlowbiteTheme, Dropdown, Flowbite} from 'flowbite-react';
import React, {ReactElement} from "react";
import {useSelector} from "react-redux";
import {selectTheme} from "@/features/theme/ThemeSlice";
import {deleteCookie} from "cookies-next";
import {HiBan, HiDocumentReport, HiLogout, HiUserRemove, HiViewGrid} from "react-icons/hi";

interface UserDropdownItemProps {
    username: string;
    avatarUrl: string;
    setUserDropdownState: (state: ReactElement | undefined) => void;
}

const customTheme: CustomFlowbiteTheme = {
    avatar: {
        "root": {
            "base": "flex justify-center items-center space-x-4 rounded ml-3",
            "bordered": "p-1 ring-2",
            "rounded": "rounded-full",
            "color": {
                "dark": "ring-gray-800 dark:ring-gray-800",
                "failure": "ring-red-500 dark:ring-red-700",
                "gray": "ring-gray-500 dark:ring-gray-400",
                "info": "ring-cyan-400 dark:ring-cyan-800",
                "light": "ring-gray-300 dark:ring-gray-500",
                "purple": "ring-purple-500 dark:ring-purple-600",
                "success": "ring-green-500 dark:ring-green-500",
                "warning": "ring-yellow-300 dark:ring-yellow-500",
                "pink": "ring-pink-500 dark:ring-pink-500"
            },
            "img": {
                "off": "relative overflow-hidden bg-gray-100 dark:bg-gray-600",
                "on": "",
                "placeholder": "absolute w-auto h-auto text-gray-400 -bottom-1"
            },
            "size": {
                "xs": "w-6 h-6",
                "sm": "w-8 h-8",
                "md": "w-10 h-10",
                "lg": "w-20 h-20",
                "xl": "w-36 h-36"
            },
            "stacked": "ring-2 ring-gray-300 dark:ring-gray-500",
            "statusPosition": {
                "bottom-left": "-bottom-1 -left-1",
                "bottom-center": "-bottom-1 center",
                "bottom-right": "-bottom-1 -right-1",
                "top-left": "-top-1 -left-1",
                "top-center": "-top-1 center",
                "top-right": "-top-1 -right-1",
                "center-right": "center -right-1",
                "center": "center center",
                "center-left": "center -left-1"
            },
            "status": {
                "away": "bg-yellow-400",
                "base": "absolute h-3.5 w-3.5 rounded-full border-2 border-white dark:border-dark-300",
                "busy": "bg-red-400",
                "offline": "bg-gray-400",
                "online": "bg-green-400"
            },
            "initials": {
                "text": "font-medium text-gray-600 dark:text-gray-300",
                "base": "inline-flex overflow-hidden relative justify-center items-center bg-gray-100 dark:bg-gray-600"
            }
        },
        "group": {
            "base": "flex -space-x-4"
        },
        "groupCounter": {
            "base": "relative flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full ring-2 ring-gray-300 hover:bg-gray-600 dark:ring-gray-500"
        }
    },
    dropdown: {
        "arrowIcon": "h-4 w-4 dark:text-gray-300",
        "content": "py-1 focus:outline-none",
        "floating": {
            "animation": "transition-opacity",
            "arrow": {
                "base": "absolute z-10 h-2 w-2 rotate-45",
                "style": {
                    "dark": "bg-gray-900 dark:bg-dark-200",
                    "light": "bg-white",
                    "auto": "bg-white dark:bg-dark-200"
                },
                "placement": "-4px"
            },
            "base": "z-10 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none",
            "content": "py-1 text-sm text-gray-700 dark:text-gray-200",
            "divider": "my-1 h-px bg-gray-100 dark:bg-gray-600",
            "header": "block py-2 px-4 text-sm text-gray-700 dark:text-gray-200",
            "hidden": "invisible opacity-0",
            "item": {
                "base": "flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-300 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
                "icon": "mr-2 h-4 w-4"
            },
            "style": {
                "dark": "bg-gray-900 text-white dark:bg-dark-200",
                "light": "border border-gray-200 bg-white text-gray-900",
                "auto": "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-dark-200 dark:text-white"
            },
            "target": "w-fit"
        },
        "inlineWrapper": "flex items-center"
    }
}

const UserDropdown = ({username, avatarUrl, setUserDropdownState}: UserDropdownItemProps) => {
    const isDark = useSelector(selectTheme)

    const signOut = () => {
        deleteCookie('auth')
        setUserDropdownState(undefined)
    }

    return (
        <Flowbite theme={{theme: customTheme, dark: isDark}}>
            <Dropdown inline label={<Avatar alt="User settings" img={avatarUrl} rounded/>}>
                <Dropdown.Header>
        <span className="block text-sm">
          {username}
        </span>
                    <span className="block truncate text-sm font-medium">
          Logged-in via GitHub
        </span>
                </Dropdown.Header>
                <Dropdown.Item>
                    <HiDocumentReport className="mr-2"/>
                    Report an issue
                </Dropdown.Item>
                <Dropdown.Item>
                    <HiViewGrid className="mr-2"/>
                    Manage issues
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={signOut}>
                    <HiLogout className="mr-2"/>
                    Sign out
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item>
                    <HiUserRemove className="mr-2"/>
                    <span className="font-medium text-red-600 dark:text-red-400">
                    Delete my account
                    </span>
                </Dropdown.Item>
            </Dropdown>
        </Flowbite>
    )
}

export default UserDropdown;