import App from "./App/App.tsx";
import { TicTacToe } from "./App/Apps/TicTacToe/TicTacToe.tsx";
import "./Desktop.css";
import { useEffect, useState } from "react";
import { AppConfigType } from "./AppConfigType.ts";

type DesktopProps = {
  openedAppConfigs: AppConfigType[],
  setOpenedAppConfigs: React.Dispatch<React.SetStateAction<AppConfigType[]>>
}

function Desktop({ openedAppConfigs, setOpenedAppConfigs }: DesktopProps) {
  const [isFullscreenPreview, setIsFullscreenPreview] = useState<boolean>(false);

  useEffect(() => {
    console.log(openedAppConfigs);
  }, [openedAppConfigs]);

  const getMaxZIndex = () => {
    return Math.max(...openedAppConfigs.map(config => config.zIndex));
  };

  const handleSelectApp = (index: number) => {
    const newArray = [...openedAppConfigs];

    let newZIndex = getMaxZIndex();

    if (newZIndex != newArray[index].zIndex) {
      newZIndex++;
    }

    newArray[index] = {
      ...newArray[index],
      zIndex: newZIndex
    };

    setOpenedAppConfigs(newArray);
  };

  const handleCloseApp = (index: number) => {
    setOpenedAppConfigs(oldValues => {
      return oldValues.filter((_, i) => i !== index);
    });
  };

  return (
    <main id={"desktop"}>
      <div id={"fullscreenPreview"} className={isFullscreenPreview ? "active" : ""} />
      {
        openedAppConfigs.map((appConfig, i) => (
          <App key={appConfig.id}
               zIndex={appConfig.zIndex}
               app={appConfig.app}
               onSelectApp={() => handleSelectApp(i)}
               onCloseApp={() => handleCloseApp(i)}
               setIsFullscreenPreview={setIsFullscreenPreview}>
          </App>
        ))
      }
    </main>
  );
}

export default Desktop;
