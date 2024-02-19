import { configureStore } from "@reduxjs/toolkit";
import personalisationReducer from "./personalisation/PersonalisationSlice.ts";
import viewConfigReducer from "./viewConfig/ViewConfigSlice.ts";

export const store = configureStore({
  reducer: {
    personalisation: personalisationReducer,
    viewConfig: viewConfigReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
