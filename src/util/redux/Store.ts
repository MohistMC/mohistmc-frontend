import { configureStore } from '@reduxjs/toolkit'
import { translatorSlice } from '@/features/i18n/TranslatorSlice'
import { createWrapper } from 'next-redux-wrapper'
import { themeSlice } from '@/features/theme/ThemeSlice'
import { userSlice } from '@/features/user/UserSlice'

let store: ReturnType<typeof configStore>

const configStore = () =>
    configureStore({
        reducer: {
            translator: translatorSlice.reducer,
            theme: themeSlice.reducer,
            user: userSlice.reducer,
        },
    })

export const getStore = () => {
    if (!store) store = configStore()
    return store
}

export type AppStore = ReturnType<typeof getStore>
export type AppState = ReturnType<AppStore['getState']>

export const wrapper = createWrapper<AppStore>(getStore)
