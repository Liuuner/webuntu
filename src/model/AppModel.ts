import { JSX } from "react";


export type AppModel = {
  name: string;
  icon: string;
  url?: string;
  app: () => JSX.Element
};
