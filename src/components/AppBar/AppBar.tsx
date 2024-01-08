import "./AppBar.css";
import { AppModel } from "../../model/AppModel.ts";
import { useAppSelector } from "../../app/hooks.ts";
import IMAGES from "./Images.ts";

type AppBarProps = {
  apps: AppModel[];
  onOpenApp: (app: AppModel) => void;
};

const AppBar = ({ apps, onOpenApp }: AppBarProps) => {
  const appBarWidth = useAppSelector(
    (state) => state.personalisation.appBarWidth
  );

  return (
    <aside id={"appBar"}>
      <div id={"apps"}>
        {apps.map((app, index) => (
          <div onClick={() => onOpenApp(app)} key={index} className={"appIcon"}>
            <img src={app.icon} alt={app.name} />
          </div>
        ))}
      </div>
      <div id={"menuIcon"}>
        <img src={IMAGES.menu} alt="Menu" />
      </div>
    </aside>
  );
};

export default AppBar;
