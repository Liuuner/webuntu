import { AppModel } from "src/model/AppModel.ts";
import { Tooltip } from "@mui/material";

type AppIconProps = {
  app: AppModel;
  handleOpenApp: (_app: AppModel) => void;
}

const AppIcon = ({ app, handleOpenApp }: AppIconProps) => {
  return (
    <Tooltip
      title={app.name}
      placement={"right"}
      /*slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -10]
              }
            }
          ]
        }
      }}*/>
      <div onClick={() => handleOpenApp(app)} className={"icon"}>
        <img src={app.icon} alt={app.name} />
      </div>
    </Tooltip>
  );
};

export default AppIcon;