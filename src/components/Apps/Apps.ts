import { JSX } from "react";
import Settings from "./Settings/Settings.tsx";
import DefaultApp from "./Default/DefaultApp.tsx";
import MfTest from "src/components/Apps/MicrofrontendTest/MfTest.tsx";
import PeerTacToe from "src/components/Apps/TicTacToe/PeerTacToe.tsx";

export const APPS: { [key: string]: () => JSX.Element } = {
  defaultApp: DefaultApp,
  settings: Settings,
  mfTest: MfTest,
  peerTacToe: PeerTacToe
};

export type AppKey = keyof typeof APPS;
