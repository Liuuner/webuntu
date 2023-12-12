import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ThemeType from "./ThemeType.ts";

interface PersonalisationState {
  appBarWidth: number;
  infoBarHeight: number;
  theme: ThemeType;
}

const initialState: PersonalisationState = {
  appBarWidth: 70,
  infoBarHeight: 23,
  theme: {
    fontColor: "#FFF",
    firstColor: "#2c2c2c",
    secondColor: "#222222",
    accentColor: "#77216F"
  }
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
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    }
  }
});
export const { setAppBarWidth, setInfoBarHeight, setTheme } =
  personalisationSlice.actions;

export default personalisationSlice.reducer;
