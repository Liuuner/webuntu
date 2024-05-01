import { memo } from "react";
import InfoBar from "./components/InfoBar/InfoBar.tsx";
import AppBar from "./components/AppBar/AppBar.tsx";
import Desktop from "./components/Desktop/Desktop.tsx";
import { styled } from "@mui/material";
import { useAppSelector } from "src/hooks/storeHooks.ts";

function Ubuntu() {
  // const [apps, setApps] = useState<AppModel[]>();

  // const [openedAppConfigs, setOpenedAppConfigs] = useState<OpenedAppModel[]>([]);

  /*const handleOpenApp = useCallback((app: App) => {
    const newId = nanoid();
    let newZIndex = 1;

    if (openedAppConfigs.length > 0) {
      newZIndex = Math.max(...openedAppConfigs.map(config => config.zIndex)) + 1;
    }

    setOpenedAppConfigs(oldVal => {
      return [...oldVal, { id: newId, zIndex: newZIndex, app: app, minimumSize: app.minimumSize }];
    });
  }, [openedAppConfigs]);*/

  return (
    <UbuntuWrapper id={"ubuntu"}>
      <MemoInfoBar />
      <MemoAppBar />{/*apps={apps} onOpenApp={handleOpenApp}*/}
      <Desktop />{/*openedAppConfigs={openedAppConfigs} setOpenedAppConfigs={setOpenedAppConfigs}*/}
    </UbuntuWrapper>
  );
}

const UbuntuWrapper = styled("div")(() => {
  const { infoBarHeight, appBarWidth } = useAppSelector((state) => state.settings);

  return {
    display: "grid",
    height: "100%",
    width: "100%",
    gridTemplate:
      `"infoBar infoBar" ${infoBarHeight}px
      "appBar desktop" auto / ${appBarWidth}px 1fr`
  };
});
const MemoInfoBar = memo(InfoBar);
const MemoAppBar = memo(AppBar);

export default Ubuntu;
