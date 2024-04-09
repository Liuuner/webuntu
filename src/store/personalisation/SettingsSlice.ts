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
    },
    setInfoBarHeight: (state, action: PayloadAction<number>) => {
      state.infoBarHeight = action.payload;
    },
    setTimeFormat: (state, action: PayloadAction<string>) => {
      state.timeFormat = action.payload;
    },
    setAccentColor: (state, action: PayloadAction<AccentColor>) => {
      state.accentColor = action.payload;
    },
    setPersonalisation: (state, action: PayloadAction<SettingsState>) => {
      // state = { ...action.payload };

      state.timeFormat = action.payload.timeFormat;
      state.accentColor = action.payload.accentColor;
      state.infoBarHeight = action.payload.infoBarHeight;
      state.appBarWidth = action.payload.appBarWidth;
    }
  }
});
export const settingsSliceActions = settingsSlice.actions;

export const settingsSliceReducer = settingsSlice.reducer;
