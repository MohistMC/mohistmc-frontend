import {AppState} from "@/util/redux/Store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ThemeState {
    isDark: boolean;
}

const initialState: ThemeState = {
    isDark: false,
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setDark: (state, action: PayloadAction<boolean>) => {
            state.isDark = action.payload;
        }
    },
});

export const { setDark } = themeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: AppState) => state.theme.isDark;

export default themeSlice.reducer;