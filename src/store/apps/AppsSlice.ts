import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { AppModel, Area, OpenedApp } from "src/model/AppModel.ts";
import IMAGES from "src/components/AppBar/Images.ts";
import { DefaultApp, Settings } from "src/components/Apps/Apps.ts";
import MfTest from "src/components/Apps/MicrofrontendTest/MfTest.tsx";
import { JSX } from "react";

export const APPS: { [key: string]: () => JSX.Element } = {
  defaultApp: DefaultApp,
  settings: Settings,
  mfTest: MfTest
};

export interface AppsState {
  installedApps: AppModel[],
  taskbarApps: AppModel[],
  openedApps: OpenedApp[],
  _persist: any;
}

export const appsInitialState: AppsState = {
  installedApps: [],
  taskbarApps: [
    { name: "Firefox", icon: IMAGES.firefox, appKey: "defaultApp" },
    { name: "LibreOffice", icon: IMAGES.libreOffice, appKey: "defaultApp" },
    { name: "Rhythmbox", icon: IMAGES.rhythmBox, appKey: "defaultApp" },
    { name: "Settings", icon: IMAGES.settings, appKey: "settings" },
    { name: "Help", icon: IMAGES.help, appKey: "defaultApp" },
    { name: "MfTest", icon: IMAGES.components, appKey: "mfTest" }
  ],
  openedApps: [],
  _persist: ""
};

const appsSlice = createSlice({
  name: "apps",
  initialState: appsInitialState,
  reducers: {
    installApp: (state, action: PayloadAction<AppModel>) => {
      state.installedApps.push(action.payload);
    },
    uninstallApp: (state, action: PayloadAction<AppModel>) => {
      state.installedApps = state.installedApps.filter(app => app.name !== action.payload.name);
      state.taskbarApps = state.taskbarApps.filter(app => app.name !== action.payload.name);
    },
    addAppToTaskbar: (state, action: PayloadAction<AppModel>) => {
      state.taskbarApps.push(action.payload);
    },
    removeAppFromTaskbar: (state, action: PayloadAction<AppModel>) => {
      state.taskbarApps = state.taskbarApps.filter(app => app.name !== action.payload.name);
    },
    openApp: (state, action: PayloadAction<AppModel>) => {
      const newId = nanoid();
      let newZIndex = 1;

      if (state.openedApps.length > 0) {
        newZIndex = Math.max(...state.openedApps.map(config => config.zIndex)) + 1;
      }

      state.openedApps.push({
        app: action.payload,
        id: newId,
        zIndex: newZIndex,
        isFullscreen: false,
        area: {
          top: window.innerHeight / 2 - (action.payload.initialSize?.height || 300) / 2,
          left: window.innerWidth / 2 - (action.payload.initialSize?.width || 550) / 2,
          height: action.payload.initialSize?.height || 300,
          width: action.payload.initialSize?.width || 550
        }
      });
    },
    closeApp: (state, action: PayloadAction<string>) => {
      state.openedApps = state.openedApps.filter(app => app.id !== action.payload);
    },
    selectApp: (state, action: PayloadAction<string>) => {
      const newZIndex = Math.max(...state.openedApps.map(config => config.zIndex)) + 1;
      const index = state.openedApps.findIndex((app) => app.id === action.payload);
      state.openedApps[index].zIndex = newZIndex;
    },
    setAppArea: (state, action: PayloadAction<{ id: string, area: Area }>) => {
      console.log("setAppArea", action.payload);

      const { id, area } = action.payload;
      const index = state.openedApps.findIndex((app) => app.id === id);
      state.openedApps[index].area = area;
    },
    setAppIsFullscreen: (state, action: PayloadAction<Pick<OpenedApp, "id" | "isFullscreen">>) => {
      const { id, isFullscreen } = action.payload;
      const index = state.openedApps.findIndex((app) => app.id === id);
      state.openedApps[index].isFullscreen = isFullscreen;
    }
  }
});
export const appsSliceActions = appsSlice.actions;

export const appsSliceReducer = appsSlice.reducer;
