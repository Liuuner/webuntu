import React, { RefObject, useEffect, useState } from "react";
import { useAppSelector } from "src/hooks/storeHooks.ts";
import { Area } from "src/model/AppModel.ts";

function DesktopSelect({ desktopRef }: { desktopRef: RefObject<HTMLDivElement> }) {
  const { infoBarHeight, appBarWidth } = useAppSelector(state => state.settings);

  const [area, setArea] = useState<Area>({
    left: -1,
    top: -1,
    height: 0,
    width: 0
  });

  const startDesktopSelect = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const startDesktopSelectPos = [e.clientY, e.clientX];

    document.onmousemove = update;
    document.onmouseup = clear;

    function update(e: MouseEvent) {
      e.stopPropagation();
      e.preventDefault();
      if (startDesktopSelectPos) {

        setArea(desktopSelectPos => {
          const tmp = { ...desktopSelectPos };
          if (e.clientY < startDesktopSelectPos[0]) {
            tmp.top = Math.max(e.clientY, infoBarHeight);
            tmp.height = Math.min(startDesktopSelectPos[0] - e.clientY, startDesktopSelectPos[0] - infoBarHeight);
          } else {
            tmp.top = startDesktopSelectPos[0];
            tmp.height = Math.min(e.clientY - startDesktopSelectPos[0], window.innerHeight - startDesktopSelectPos[0]);
          }
          if (e.clientX < startDesktopSelectPos[1]) {
            tmp.left = Math.max(e.clientX, appBarWidth);
            tmp.width = Math.min(startDesktopSelectPos[1] - e.clientX, startDesktopSelectPos[1] - appBarWidth);
          } else {
            tmp.left = startDesktopSelectPos[1];
            tmp.width = Math.min(e.clientX - startDesktopSelectPos[1], window.innerWidth - startDesktopSelectPos[1]);
          }
          return tmp;
        });
      }
    }

    function clear() {

      document.onmousemove = null;
      document.onmouseup = null;
      setArea({ left: -1, top: -1, height: 0, width: 0 });
    }
  };

  useEffect(() => {
    const current = desktopRef.current;
    if (current) current.onmousedown = startDesktopSelect;
    return () => {
      if (current) current.onmousedown = null;
    };
  }, [desktopRef]);

  return (
    <div id={"desktopSelect"} style={{
      top: (area.top + "px"),
      left: (area.left + "px"),
      height: (area.height + "px"),
      width: (area.width + "px"),
      display: (area.width + area.height > 0 ? "block" : "none")
    }} />
  );
}

export default DesktopSelect;