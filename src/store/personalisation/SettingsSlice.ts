import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccentColor } from "src/theme/AccentColors.ts";

export interface SettingsState {
  appBarWidth: number;
  infoBarHeight: number;
  timeFormat: string;
  accentColor: AccentColor;
  _persist: any;
}

export const settingsInitialState: SettingsState = {
  appBarWidth: 70,
  infoBarHeight: 23,
  timeFormat: "DD MMM HH:mm",
  accentColor: "default",
  _persist: ""
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: settingsInitialState,
  reducers: {
    setAppBarWidth: (state, action: PayloadAction<number>) => {
      state.appBarWidth = action.payload;
      document.querySelector("html")?.style.setProperty("--app-bar-width", `${action.payload}px`);
    },
    setInfoBarHeight: (state, action: PayloadAction<number>) => {
      state.infoBarHeight = action.payload;
      document.querySelector("html")?.style.setProperty("--info-bar-height", `${action.payload}px`);
    },
    setTimeFormat: (state, action: PayloadAction<string>) => {
      state.timeFormat = action.payload;
    },
    setAccentColor: (state, action: PayloadAction<AccentColor>) => {
      state.accentColor = action.payload;
    },
    setPersonalisation: (state, action: PayloadAction<SettingsState>) => {
      const { timeFormat, accentColor, infoBarHeight, appBarWidth } = action.payload;
      state.timeFormat = timeFormat;
      state.accentColor = accentColor;

      const html = document.querySelector("html");

      html?.style.setProperty("--info-bar-height", `${infoBarHeight}px`);
      state.infoBarHeight = infoBarHeight;
      html?.style.setProperty("--app-bar-width", `${appBarWidth}px`);
      state.appBarWidth = appBarWidth;
    }
  }
});
export const settingsSliceActions = settingsSlice.actions;

export const settingsSliceReducer = settingsSlice.reducer;
