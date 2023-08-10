import {configureStore} from '@reduxjs/toolkit'
import {translatorSlice} from "@/features/i18n/TranslatorSlice";
import {createWrapper} from "next-redux-wrapper";
import {themeSlice} from "@/features/theme/ThemeSlice";
import {userSlice} from "@/features/user/UserSlice";

const makeStore = () =>
    configureStore({
        reducer: {
            translator: translatorSlice.reducer,
            theme: themeSlice.reducer,
            user: userSlice.reducer,
        }
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore);