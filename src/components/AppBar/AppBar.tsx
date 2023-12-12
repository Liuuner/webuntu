import "./AppBar.css";
import { AppModel } from "../../model/AppModel.ts";
import { useAppSelector } from "../../app/hooks.ts";

type AppBarProps = {
  apps: AppModel[];
};

const AppBar = ({ apps }: AppBarProps) => {
  const appBarWidth = useAppSelector(
    (state) => state.personalisation.appBarWidth
  );

  return (
    <aside id={"appBar"}>
      <div id={"apps"}>
        {apps.map((app, index) => (
          <div key={index} className={"appIcon"}>
            <img src={app.icon} alt={app.name} />
          </div>
        ))}
      </div>
      <div id={"menuIcon"}>
        <img src="/app-icons/menu-icon.png" alt="Menu" />
      </div>
    </aside>
  );
};

export default AppBar;
