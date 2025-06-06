import { AppKey } from "src/components/Apps/Apps.ts";

export type AppModel = {
  name: string;
  icon: string;
  minimumSize?: { height: number; width: number };
  initialSize?: { height: number, width: number };
  url?: string;
  appKey: AppKey;
};

export type OpenedApp = {
  readonly id: string;
  readonly app: Readonly<AppModel>;
  zIndex: number;
  area: Area;
  isFullscreen: boolean;
  previewData?: string;
}

export type Area = {
  top: number;
  left: number;
  height: number;
  width: number;
};
