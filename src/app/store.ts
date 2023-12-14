import { configureStore } from "@reduxjs/toolkit";
import personalisationReducer from "../features/personalisation/PersonalisationSlice.ts";

export const store = configureStore({
  reducer: {
    personalisation: personalisationReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
