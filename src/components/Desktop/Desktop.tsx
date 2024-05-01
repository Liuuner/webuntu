import "src/components/Desktop/Desktop.css";
import React, { memo, useState } from "react";
import { useAppSelector } from "src/hooks/storeHooks.ts";
import App from "src/components/Desktop/App/App.tsx";
import DesktopSelect from "src/components/Desktop/DesktopSelect.tsx";

/*type DesktopProps = {
  openedAppConfigs: OpenedAppModel[],
  setOpenedAppConfigs: React.Dispatch<React.SetStateAction<OpenedAppModel[]>>
}*/

type DesktopSelectPos = {
  x: number;
  y: number;
  height: number;
  width: number;
}

function Desktop(/*{ openedAppConfigs, setOpenedAppConfigs }: DesktopProps*/) {
  const { infoBarHeight, appBarWidth } = useAppSelector(state => state.settings);
  const [isFullscreenPreview, setIsFullscreenPreview] = useState<boolean>(false);
  const [desktopSelectPos, setDesktopSelectPos] = useState<DesktopSelectPos>({
    x: -1,
    y: -1,
    height: 0,
    width: 0
  });

  const openedApps = useAppSelector(state => state.apps.openedApps);

  function startDesktopSelect(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();

    const startDesktopSelectPos = [e.clientY, e.clientX];
    document.onmousemove = update;
    document.onmouseup = clear;

    function update(e: MouseEvent) {
      e.stopPropagation();
      e.preventDefault();

      if (startDesktopSelectPos) {
        setDesktopSelectPos(desktopSelectPos => {
          const tmp = { ...desktopSelectPos };
          if (e.clientY < startDesktopSelectPos[0]) {
            tmp.y = Math.max(e.clientY, infoBarHeight);
            tmp.height = Math.min(startDesktopSelectPos[0] - e.clientY, startDesktopSelectPos[0] - infoBarHeight);
          } else {
            tmp.y = startDesktopSelectPos[0];
            tmp.height = Math.min(e.clientY - startDesktopSelectPos[0], window.innerHeight - startDesktopSelectPos[0]);
          }
          if (e.clientX < startDesktopSelectPos[1]) {
            tmp.x = Math.max(e.clientX, appBarWidth);
            tmp.width = Math.min(startDesktopSelectPos[1] - e.clientX, startDesktopSelectPos[1] - appBarWidth);
          } else {
            tmp.x = startDesktopSelectPos[1];
            tmp.width = Math.min(e.clientX - startDesktopSelectPos[1], window.innerWidth - startDesktopSelectPos[1]);
          }
          return tmp;
        });
      }
    }

    function clear() {
      document.onmousemove = null;
      document.onmouseup = null;
      setDesktopSelectPos({ x: -1, y: -1, height: 0, width: 0 });
    }
  }

  return (
    <main id={"desktop"}
          onMouseDown={e => startDesktopSelect(e)}>
      <div id={"fullscreenPreview"} className={isFullscreenPreview ? "active" : ""} />
      <div id={"desktopSelect"} style={{
        top: (desktopSelectPos.y + "px"),
        left: (desktopSelectPos.x + "px"),
        height: (desktopSelectPos.height + "px"),
        width: (desktopSelectPos.width + "px"),
        display: (desktopSelectPos.width + desktopSelectPos.height > 0 ? "block" : "none")
      }} />

      {
        openedApps.map((appConfig) => (
          <App
            key={appConfig.id}
            appObject={appConfig}
            setIsFullscreenPreview={setIsFullscreenPreview}
          />
        ))
      }
    </main>
  );
}

const MemoDesktopSelect = memo(DesktopSelect);

export default Desktop;
