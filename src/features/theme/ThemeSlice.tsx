import {AppState} from "@/util/redux/Store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
// @ts-ignore
import {ThemeMode} from "flowbite-react/lib/esm/hooks/use-theme-mode";

export interface ThemeState {
    mode: ThemeMode;
}

const initialState: ThemeState = {
    mode: 'dark',
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload;
        }
    },
});

export const { setMode } = themeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: AppState) => state.theme.mode;

export default themeSlice.reducer;