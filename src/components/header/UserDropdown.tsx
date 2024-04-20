import {Avatar, Dropdown, Flowbite} from 'flowbite-react';
import React, {ReactElement, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectTheme} from "@/features/theme/ThemeSlice";
import {HiDocumentReport, HiLogout, HiUserRemove, HiViewGrid} from "react-icons/hi";
import {useAppSelector} from "@/util/redux/Hooks";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";
import {logout, selectUser} from "@/features/user/UserSlice";
import {customTheme} from "@/util/Theme";

const UserDropdown = () => {
    // React state
    const [userDropdownState, setUserDropdownState] = useState<ReactElement | undefined>();

    const mode = useSelector(selectTheme)
    const user = useAppSelector(selectUser)
    const dispatch = useDispatch()
    const strings = useAppSelector(selectTranslations);

    const signOut = () => {
        dispatch(logout())
    }

    useEffect(() => {
        if(!user.isLogged)
            setUserDropdownState(undefined)
    }, [user]);

    return (
        <Flowbite theme={{theme: customTheme, mode}}>
            <Dropdown inline label={<Avatar alt="User settings" img={user.avatarUrl} rounded/>}>
                <Dropdown.Header>
        <span className="block text-sm">
          {user.username}
        </span>
        <span className="block truncate text-sm font-medium">
          {strings['loginmodal.logged.via'] } + {user.loggedVia === 'github' ? 'GitHub' : 'Discord'}
        </span>
                </Dropdown.Header>
                <Dropdown.Item>
                    <HiDocumentReport className="mr-2"/>
                    {strings['report.issue.title']}
                </Dropdown.Item>
                <Dropdown.Item>
                    <HiViewGrid className="mr-2"/>
                    {strings['report.issue.manage']}
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={signOut}>
                    <HiLogout className="mr-2"/>
                    {strings['loginmodal.logged.signout']}
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item>
                    <HiUserRemove className="mr-2"/>
                    <span className="font-medium text-red-600 dark:text-red-400">
                    {strings['loginmodal.user.delete']}
                    </span>
                </Dropdown.Item>
            </Dropdown>
        </Flowbite>
    )
}

export default UserDropdown;