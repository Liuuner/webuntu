import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccentColor } from "../../theme/AccentColors.ts";
import { ThemeMode } from "../../theme/theme.ts";

interface ViewConfigState {
  hasCustomBackground: boolean;
  themeMode: ThemeMode;
  accentColor: AccentColor;
}

const getInitialThemeMode = (): ThemeMode => {
  const themeMode = localStorage.getItem("themeMode");
  if (themeMode && ["light", "dark"].includes(themeMode)) {
    return themeMode as ThemeMode;
  }

  const preferred = window.matchMedia("(prefers-color-scheme: light)");
  return preferred.matches ? "dark" : "light";
};

const initialState: ViewConfigState = {
  hasCustomBackground: false,
  themeMode: getInitialThemeMode(),
  accentColor: "default"
};

const viewConfigSlice = createSlice({
  name: "viewConfig",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      localStorage.setItem("themeMode", action.payload);
      state.themeMode = action.payload;
    },
    setAccentColor: (state, action: PayloadAction<AccentColor>) => {
      state.accentColor = action.payload;
    }
  }
});

export const { setThemeMode, setAccentColor } = viewConfigSlice.actions;

export default viewConfigSlice.reducer;

