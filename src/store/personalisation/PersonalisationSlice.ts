import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PersonalisationState {
  appBarWidth: number;
  infoBarHeight: number;
}

const initialState: PersonalisationState = {
  appBarWidth: 70,
  infoBarHeight: 23
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
    }
  }
});
export const { setAppBarWidth, setInfoBarHeight } =
  personalisationSlice.actions;

export default personalisationSlice.reducer;
