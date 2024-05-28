import { JSX } from "react";
import Settings from "./Settings/Settings.tsx";
import DefaultApp from "./Default/DefaultApp.tsx";
import MfTest from "src/components/Apps/MicrofrontendTest/MfTest.tsx";
import FileExplorer from "src/components/Apps/FileExplorer/FileExplorer.tsx";
import FileManager from "src/components/Apps/FileManager/FileManager.tsx";
import Shelly from "src/components/Apps/Shelly/Shelly.tsx";

export const APPS: { [key: string]: () => JSX.Element } = {
  defaultApp: DefaultApp,
  settings: Settings,
  fileExplorer: FileExplorer,
  fileManager: FileManager,
  terminal: Shelly,
  mfTest: MfTest
};

export type AppKey = keyof typeof APPS;
