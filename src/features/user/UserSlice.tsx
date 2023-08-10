import {AppState} from "@/util/redux/Store";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {deleteCookie, getCookie} from "cookies-next";
import {getAPIEndpoint} from "@/util/Environment";
import {ToastLogger} from "@/util/Logger";
import {User} from "@/interfaces/User";

export interface UserState extends User {
    isLogged: boolean;
    serverError: boolean;
    isFirstLogin: boolean;
}

const initialState: UserState = {
    username: "",
    avatarUrl: "",
    isLogged: false,
    serverError: false,
    isFirstLogin: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setState: (state, action: PayloadAction<UserState>) => {
            return {
                ...state,
                ...action.payload
            }
        },
        logout: (state) => {
            console.log("aaaa")
            deleteCookie('auth')
            ToastLogger.info('You have been signed out')

            return {
                ...state,
                isLogged: false,
                isFirstLogin: false,
                username: "",
                avatarUrl: "",
            }
        },
    },
});

export const {setState, logout} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: AppState) => state.user;

export default userSlice.reducer;

export const loginUserAsync = async (dispatch: Dispatch, isFirstLogin: boolean = false) => {
    const newState = {...initialState};
    newState.isFirstLogin = isFirstLogin;

    try {
        const response = await fetch(`${getAPIEndpoint()}/user`, {
            method: 'GET',
            headers: {
                'authorization': getCookie('auth')!.toString() || '',
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const {username, avatarUrl} = await response.json() as User;

            ToastLogger.info('You are logged in.');
            dispatch(setState({
                ...newState,
                username,
                avatarUrl,
                isLogged: true
            }));
        } else {
            deleteCookie('auth');
            ToastLogger.error(`Login failed, probably wrong token.`);
            dispatch(setState({
                ...newState,
                serverError: true
            }));
        }
    } catch (error) {
        deleteCookie('auth');
        ToastLogger.error(`Could not join the server. Please try again later.`);
        dispatch(setState({
            ...newState,
            serverError: true
        }));
    }
}