import { useState } from "react";
import { AppModel } from "./model/AppModel.ts";
import InfoBar from "./components/InfoBar/InfoBar.tsx";
import AppBar from "./components/AppBar/AppBar.tsx";
import Desktop from "./components/Desktop/Desktop.tsx";
import IMAGES from "./components/AppBar/Images.ts";
import { AppConfigType } from "./components/Desktop/AppConfigType.ts";

function Ubuntu() {
  const [apps, setApps] = useState<AppModel[]>([
    { name: "Firefox", icon: IMAGES.firefox },
    { name: "LibreOffice", icon: IMAGES.libreOffice },
    { name: "Rhythmbox", icon: IMAGES.rhythmBox },
    { name: "Settings", icon: IMAGES.settings },
    { name: "Help", icon: IMAGES.help }
  ]);

  const [openedAppConfigs, setOpenedAppConfigs] = useState<AppConfigType[]>([]);

  const handleOpenApp = (app: AppModel) => {
    let newId = Math.max(...openedAppConfigs.map(config => config.id)) + 1;
    let newZIndex = Math.max(...openedAppConfigs.map(config => config.zIndex)) + 1;

    if (openedAppConfigs.length <= 0) {
      newId = 1;
      newZIndex = 1;
    }

    setOpenedAppConfigs(oldVal => {
      return [...oldVal, { id: newId, zIndex: newZIndex, app: app }];
    });
  };

  // TODO: Fullscreen
  // TODO: Theming => https://css-tricks.com/theming-and-theme-switching-with-react-and-styled-components/

  return (
    <>
      <InfoBar />
      <AppBar apps={apps} onOpenApp={handleOpenApp} />
      <Desktop openedAppConfigs={openedAppConfigs} setOpenedAppConfigs={setOpenedAppConfigs} />
    </>
  );
}

export default Ubuntu;
