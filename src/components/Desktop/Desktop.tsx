import App from "./App/App.tsx";
import "./Desktop.css";
import React, { useEffect, useState } from "react";
import { AppConfigType } from "./AppConfigType.ts";

type DesktopProps = {
  openedAppConfigs: AppConfigType[],
  setOpenedAppConfigs: React.Dispatch<React.SetStateAction<AppConfigType[]>>
}

type DesktopSelectPos = {
  x: number;
  y: number;
  height: number;
  width: number;
}

function Desktop({ openedAppConfigs, setOpenedAppConfigs }: DesktopProps) {
  const [isFullscreenPreview, setIsFullscreenPreview] = useState<boolean>(false);
  const [startDesktopSelectPos, setStartDesktopSelectPos] = useState<number[] | undefined>()
  const [desktopSelectPos, setDesktopSelectPos] = useState<DesktopSelectPos>({
    x: -1,
    y: -1,
    height: 0,
    width: 0
  });

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

  const startDesktopSelect = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setStartDesktopSelectPos([e.clientY, e.clientX])
  };

  const updateDesktopSelect = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (startDesktopSelectPos){
      setDesktopSelectPos(desktopSelectPos => {
        const tmp = {...desktopSelectPos}
        if (e.clientY < startDesktopSelectPos[0]){
          tmp.y = e.clientY
          tmp.height = startDesktopSelectPos[0] - e.clientY
        }
        else {
          tmp.y = startDesktopSelectPos[0]
          tmp.height = e.clientY - startDesktopSelectPos[0]
        }
        if (e.clientX < startDesktopSelectPos[1]){
          tmp.x = e.clientX
          tmp.width = startDesktopSelectPos[1] - e.clientX
        }
        else {
          tmp.x = startDesktopSelectPos[1]
          tmp.width = e.clientX - startDesktopSelectPos[1]
        }
        return tmp
      });
    }
  };

  const endDesktopSelect = () => {
    setStartDesktopSelectPos(undefined)
    setDesktopSelectPos({ x: -1, y: -1, height: 0, width: 0 });
  };

  return (
    <main id={"desktop"}
          onMouseDown={e => startDesktopSelect(e)}
          onMouseMove={e => updateDesktopSelect(e)}
          onMouseUp={endDesktopSelect}>
      <div id={"fullscreenPreview"} className={isFullscreenPreview ? "active" : ""} />
      <div id={"desktopSelect"} style={{
        top: (desktopSelectPos.y + "px"),
        left: (desktopSelectPos.x + "px"),
        height: (desktopSelectPos.height + "px"),
        width: (desktopSelectPos.width + "px"),
        display: (desktopSelectPos.width + desktopSelectPos.height > 0 ? "block" : "none")
      }} />

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
