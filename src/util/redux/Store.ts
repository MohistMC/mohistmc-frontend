import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
import {translatorSlice} from "@/features/i18n/TranslatorSlice";
import {createWrapper} from "next-redux-wrapper";
import {themeSlice} from "@/features/theme/ThemeSlice";

const makeStore = () =>
    configureStore({
        reducer: {
            translator: translatorSlice.reducer,
            theme: themeSlice.reducer,
        },
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);