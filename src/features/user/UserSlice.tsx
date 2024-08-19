import { AppState, getStore } from '@/util/redux/Store'
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { deleteCookie, getCookie, hasCookie } from 'cookies-next'
import { getAPIEndpoint } from '@/util/Environment'
import { ToastLogger } from '@/util/Logger'
import { User } from '@/interfaces/User'
import { getCurrentLocale } from '@/i18n/Language'

export interface UserState extends User {
    isLogged: boolean
    serverError: boolean
    isFirstLogin: boolean
    isBeingLogged: boolean
}

const initialState: UserState = {
    username: '',
    avatarUrl: '',
    loggedVia: '',
    isLogged: false,
    serverError: false,
    isFirstLogin: false,
    isBeingLogged: true,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setState: (state, action: PayloadAction<Partial<UserState>>) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        logout: (state) => {
            deleteCookie('auth')
            ToastLogger.info(getCurrentLocale().strings['toast.logged.signout'])

            return {
                ...state,
                isLogged: false,
                isFirstLogin: false,
                username: '',
                avatarUrl: '',
                loggedVia: '',
            }
        },
    },
})

export const { setState, logout } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: AppState) => state.user

export default userSlice.reducer

export const loginUserAsync = async (isFirstLogin: boolean = false) => {
    const strings = getCurrentLocale().strings
    const dispatch: Dispatch = getStore().dispatch

    if (!hasCookie('auth')) {
        dispatch(
            setState({
                ...initialState,
                isBeingLogged: false,
            }),
        )
        return
    }

    const newState = { ...initialState }
    newState.isFirstLogin = isFirstLogin

    try {
        const response = await fetch(`${getAPIEndpoint()}/user`, {
            method: 'GET',
            headers: {
                authorization: getCookie('auth')!.toString() || '',
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            const { username, avatarUrl, loggedVia } =
                (await response.json()) as User

            ToastLogger.info(strings['toast.logged.success'])
            dispatch(
                setState({
                    ...newState,
                    username,
                    avatarUrl,
                    loggedVia,
                    isLogged: true,
                    isBeingLogged: false,
                }),
            )
        } else {
            deleteCookie('auth')
            ToastLogger.error(strings['toast.logged.failed'])
            dispatch(
                setState({
                    ...newState,
                    serverError: true,
                    isBeingLogged: false,
                }),
            )
        }
    } catch (error) {
        deleteCookie('auth')
        ToastLogger.error(strings['toast.logged.servererror'])
        dispatch(
            setState({
                ...newState,
                serverError: true,
                isBeingLogged: false,
            }),
        )
    }
}
