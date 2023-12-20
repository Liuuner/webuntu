import { useState } from "react";
import { AppModel } from "./model/AppModel.ts";
import InfoBar from "./components/InfoBar/InfoBar.tsx";
import AppBar from "./components/AppBar/AppBar.tsx";
import Desktop from "./components/Desktop/Desktop.tsx";
import IMAGES from "./components/AppBar/Images.ts";

function Ubuntu() {
  const [apps, setApps] = useState<AppModel[]>([
    { name: "Firefox", icon: IMAGES.firefox },
    { name: "LibreOffice", icon: IMAGES.libreOffice },
    { name: "Rhythmbox", icon: IMAGES.rhythmBox },
    { name: "Settings", icon: IMAGES.settings },
    { name: "Help", icon: IMAGES.help }
  ]);

  // TODO: Fullscreen
  // TODO: Theming => https://css-tricks.com/theming-and-theme-switching-with-react-and-styled-components/

  return (
    <>
      <InfoBar />
      <AppBar apps={apps} />
      <Desktop />
    </>
  );
}

export default Ubuntu;
