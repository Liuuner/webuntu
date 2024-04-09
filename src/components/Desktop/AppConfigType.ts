import { AppModel } from "../../model/AppModel.ts";

export type AppConfigType = {
  id: number;
  app: AppModel;
  zIndex: number;
  minimumSize?: { height: number; width: number };
  initialSize?: { height: number, width: number };
}