import { JSX } from "react";


export type AppModel = {
  name: string;
  icon: string;
  minimumSize?: { height: number; width: number };
  initialSize?: { height: number, width: number };
  url?: string;
  app: () => JSX.Element
};
