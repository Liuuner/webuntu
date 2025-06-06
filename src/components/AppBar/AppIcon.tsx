import { AppModel } from "src/model/AppModel.ts";
import { Tooltip } from "@mui/material";

type AppIconProps = {
  app: AppModel;
  handleOpenApp: (_app: AppModel) => void;
  previewData?: string;
}

const AppIcon = ({ app, handleOpenApp, previewData }: AppIconProps) => {

  return previewData ?
    (
      <div onClick={() => handleOpenApp(app)} className={"icon"} style={{ background: "#FFF" }}>
        <img src={app.icon} alt={app.name} />
        <div className={"appPreview"}>
          <p>{app.name}</p>
          <img src={previewData} alt={app.name} />
        </div>
      </div>
    )
    :
    (
      <Tooltip
        title={app.name}
        placement={"right"}>
        <div onClick={() => handleOpenApp(app)} className={"icon"}>
          <img src={app.icon} alt={app.name} />
        </div>
      </Tooltip>
    );
};

export default AppIcon;