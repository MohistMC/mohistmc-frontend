import {Avatar, CustomFlowbiteTheme, Dropdown, Flowbite} from 'flowbite-react';
import React, {ReactElement, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectTheme} from "@/features/theme/ThemeSlice";
import {HiDocumentReport, HiLogout, HiUserRemove, HiViewGrid} from "react-icons/hi";
import {useAppSelector} from "@/util/redux/Hooks";
import {logout, selectUser} from "@/features/user/UserSlice";
import {customTheme} from "@/util/Theme";

const UserDropdown = () => {
    // React state
    const [userDropdownState, setUserDropdownState] = useState<ReactElement | undefined>();

    const isDark = useSelector(selectTheme)
    const user = useAppSelector(selectUser)
    const dispatch = useDispatch()

    const signOut = () => {
        dispatch(logout())
    }

    useEffect(() => {
        if(!user.isLogged)
            setUserDropdownState(undefined)
    }, [user]);

    return (
        <Flowbite theme={{theme: customTheme, dark: isDark}}>
            <Dropdown inline label={<Avatar alt="User settings" img={user.avatarUrl} rounded/>}>
                <Dropdown.Header>
        <span className="block text-sm">
          {user.username}
        </span>
                    <span className="block truncate text-sm font-medium">
          Logged-in via {user.loggedVia === 'github' ? 'GitHub' : 'Discord'}
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