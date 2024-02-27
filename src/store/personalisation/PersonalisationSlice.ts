import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PersonalisationState {
  appBarWidth: number;
  infoBarHeight: number;
  infoBarTimeFormat: string;
}

const initialState: PersonalisationState = {
  appBarWidth: 70,
  infoBarHeight: 23,
  infoBarTimeFormat: "DD MMM HH:mm",
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
    }
  },
});
export const { setAppBarWidth, setInfoBarHeight, setInfoBarTimeFormat } =
  personalisationSlice.actions;

export default personalisationSlice.reducer;
