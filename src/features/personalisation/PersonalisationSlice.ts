import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ThemeType from "./ThemeType.ts";

interface PersonalisationState {
  appBarWidth: number;
  infoBarHeight: number;
  infoBarTimeFormat: string;
  theme: ThemeType;
}

const initialState: PersonalisationState = {
  appBarWidth: 70,
  infoBarHeight: 23,
  infoBarTimeFormat: "DD MMM HH:mm",
  theme: {
    fontColor: "#FFF",
    firstColor: "#2c2c2c",
    secondColor: "#222222",
    accentColor: "#77216F"
  },
};

const personalisationSlice = createSlice({
  name: "personalisation",
  initialState,
  reducers: {
    setAppBarWidth: (state, action: PayloadAction<number>) => {
      state.appBarWidth = action.payload;
    },
    setInfoBarHeight: (state, action: PayloadAction<number>) => {
      state.infoBarHeight = action.payload;
    },
    setInfoBarTimeFormat: (state, action: PayloadAction<string>) => {
      state.infoBarTimeFormat = action.payload;
    },
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
  },
});
export const { setAppBarWidth, setInfoBarHeight, setTheme, setInfoBarTimeFormat } =
  personalisationSlice.actions;

export default personalisationSlice.reducer;
