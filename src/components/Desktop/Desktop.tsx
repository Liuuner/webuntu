import App from "./App/App.tsx";
import "./Desktop.css";
import { useState } from "react";
import { AppConfigType } from "./AppConfigType.ts";


function Desktop() {
  const [isFullscreenPreview, setIsFullscreenPreview] = useState<boolean>(false);

  const [openedAppConfigs, setOpenedAppConfigs] = useState<AppConfigType[]>([
    { applicationTitle: "Application Title 1" },
    { applicationTitle: "Application Title 2" }
  ]);

  const handleSelectApp = (index: number) => {
    const updatedOpenedApps = [...openedAppConfigs];

    const removedApp = updatedOpenedApps.splice(index, 1)[0];

    updatedOpenedApps.push(removedApp);

    setOpenedAppConfigs(updatedOpenedApps);
  };

  return (
    <main id={"desktop"}>
      <div id={"fullscreenPreview"} className={isFullscreenPreview ? "active" : ""} />

      {
        openedAppConfigs.map((appConfig, i) => (
          <App index={i} applicationTitle={appConfig.applicationTitle}
               onSelectApp={handleSelectApp}
               setIsFullscreenPreview={setIsFullscreenPreview}>
            <div />
          </App>
        ))
      }

    </main>
  );
}

export default Desktop;
