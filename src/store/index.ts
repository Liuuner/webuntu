import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { settingsInitialState, settingsSliceReducer } from "src/store/personalisation/SettingsSlice.ts";
import storage from "redux-persist/lib/storage";

const persistConfigSettings = {
  key: "settings",
  version: 1,
  storage: storage
};

const persistedPersonalisationReducer = persistReducer(persistConfigSettings, settingsSliceReducer);

const rootReducer = combineReducers({
  settings: persistedPersonalisationReducer
});

export const preloadedState = {
  settings: settingsInitialState
};

export const setupStore = (preloadedState: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState
  });

const store = setupStore(preloadedState);

export default store;

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
