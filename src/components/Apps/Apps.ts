import { JSX } from "react";
import Settings from "./Settings/Settings.tsx";
import DefaultApp from "./Default/DefaultApp.tsx";
import MfTest from "src/components/Apps/MicrofrontendTest/MfTest.tsx";
import FileExplorer from "src/components/Apps/FileExplorer/FileExplorer.tsx";
import FileManager from "src/components/Apps/FileManager/FileManager.tsx";
import Terminator from "src/components/Apps/Terminator/Terminator.tsx";

export const APPS: { [key: string]: () => JSX.Element } = {
  defaultApp: DefaultApp,
  settings: Settings,
  fileExplorer: FileExplorer,
  fileManager: FileManager,
  terminal: Terminator,
  mfTest: MfTest
};

export type AppKey = keyof typeof APPS;
