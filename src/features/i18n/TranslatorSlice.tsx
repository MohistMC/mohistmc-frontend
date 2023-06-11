import {AppState} from "@/util/redux/Store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {locales} from "@/i18n/Language";

export interface LocaleState {
    name: string;
    initials: string;
    strings: Record<string, string>;
}

const initialState: LocaleState = locales.current;

export const translatorSlice = createSlice({
    name: 'translations',
    initialState,
    reducers: {
        setLocale: (state, action: PayloadAction<LocaleState>) => {
            return action.payload;
        }
    },
});

export const { setLocale } = translatorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTranslations = (state: AppState) => state.translator.strings;

export default translatorSlice.reducer;