import { useState } from "react";
import { AppModel } from "./model/AppModel.ts";
import InfoBar from "./components/InfoBar/InfoBar.tsx";
import AppBar from "./components/AppBar/AppBar.tsx";
import Desktop from "./components/Desktop/Desktop.tsx";

function Ubuntu() {
  const [apps, setApps] = useState<AppModel[]>([
    { name: "Firefox", icon: "/app-icons/firefox-icon.png" },
    { name: "LibreOffice", icon: "/app-icons/libre-office-icon.png" },
    { name: "Rhythmbox", icon: "/app-icons/rhythmbox-icon.png" },
    { name: "Settings", icon: "/app-icons/settings-icon.png" },
    { name: "Help", icon: "/app-icons/help-icon.png" }
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
