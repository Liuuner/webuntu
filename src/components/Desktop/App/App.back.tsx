import "./App.css";
import React, { useEffect, useRef, useState } from "react";

type Position = {
  top: string;
  left: string;
};

const AppBarWidth = 70;
const InfoBarHeight = 23;

function AppBack() {
  const [position, setPosition] = useState<Position>({
    top: "0px",
    left: "0px"
  });

  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current?.getBoundingClientRect();
      setPosition({
        top: window.innerHeight / 2 - rect.height / 2 + "px",
        left: window.innerWidth / 2 - rect.width / 2 + "px"
      });
    }
  }, [ref]);

  function draggable(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();

    let pos3 = e.clientX;
    let pos4 = e.clientY;

    document.onmouseup = clear;
    document.onmousemove = drag;

    function drag(e: MouseEvent) {
      e.preventDefault();

      const pos1 = pos3 - e.clientX;
      const pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      const boundingClientRect = ref.current?.getBoundingClientRect();
      if (!boundingClientRect) return;

      setPosition({
        top:
            Math.min(
                window.innerHeight - boundingClientRect.height,
                Math.max(InfoBarHeight, boundingClientRect.top - pos2)
            ) + "px",
        left:
            Math.min(
                window.innerWidth - boundingClientRect.width,
                Math.max(AppBarWidth, boundingClientRect.left - pos1)
            ) + "px"
      });
    }

    function clear() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  return (
      <div className={"app"} style={position} ref={ref}>
        <div className={"appMenuBar"} onMouseDown={draggable}>
          {" "}
          Application
        </div>
        <div className={"appContent"}>Content</div>
      </div>
  );
}

export default AppBack;
