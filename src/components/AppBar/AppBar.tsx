import "./AppBar.css";
import IMAGES from "./Images.ts";
import { AppModel } from "src/model/AppModel.ts";
import { useAppDispatch, useAppSelector } from "src/hooks/storeHooks.ts";
import { appsSliceActions } from "src/store/apps/AppsSlice.ts";
import AppIcon from "src/components/AppBar/AppIcon.tsx";

const AppBar = () => {
  const dispatch = useAppDispatch();
  const taskbarApps = useAppSelector((state) => state.apps.taskbarApps);

  const handleOpenApp = (app: AppModel) => {
    dispatch(appsSliceActions.openApp(app));
  };

  return (
    <aside id={"appBar"}>
      <div id={"apps"}>
        {taskbarApps.map((app, index) => (
          <AppIcon app={app} handleOpenApp={handleOpenApp} key={index} />
        ))}
      </div>
      <div className={"icon"}>
        <img src={IMAGES.menu} alt="Menu" />
      </div>
    </aside>
  );
};

export default AppBar;
