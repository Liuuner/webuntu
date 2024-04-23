import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { settingsInitialState, settingsSliceReducer } from "src/store/personalisation/SettingsSlice.ts";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import { appsInitialState, appsSliceReducer } from "src/store/apps/AppsSlice.ts";

const persistConfigSettings = {
  key: "settings",
  version: 1,
  storage: storage
};

const persistConfigApps = {
  key: "apps",
  version: 1,
  storage: storageSession
};

const persistedSettingsReducer = persistReducer(persistConfigSettings, settingsSliceReducer);
const persistedAppsReducer = persistReducer(persistConfigApps, appsSliceReducer);

const rootReducer = combineReducers({
  settings: persistedSettingsReducer,
  apps: persistedAppsReducer
});

export const preloadedState = {
  settings: settingsInitialState,
  apps: appsInitialState
};

export const setupStore = (preloadedState: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
  });

const store = setupStore(preloadedState);

export default store;

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
