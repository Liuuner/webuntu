export type AppModel = {
  readonly name: string;
  readonly icon: string;
  readonly minimumSize?: { height: number; width: number };
  readonly initialSize?: { height: number, width: number };
  readonly url?: string;
  readonly appKey: string;
};

export type OpenedApp = {
  readonly id: string;
  readonly app: AppModel;
  zIndex: number;
  area: Area;
  isFullscreen: boolean;
}

export type Area = {
  top: number;
  left: number;
  height: number;
  width: number;
};
