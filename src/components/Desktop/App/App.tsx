import "./App.css";
import React, { PropsWithChildren, useRef, useState } from "react";
import { WindowRoundedIcon } from "./WindowRoundedIcon.tsx";
import { IconClose } from "../../../icons";
import MinimiseBar from "../../../icons/icons/MinimiseBar.tsx";
import MaximiseBar from "../../../icons/icons/MaximiseBar.tsx";

type Area = {
  top: number;
  left: number;
  height: number;
  width: number;
};

enum Direction {
  TOP_LEFT,
  TOP,
  TOP_RIGHT,
  RIGHT,
  BOTTOM_RIGHT,
  BOTTOM,
  BOTTOM_LEFT,
  LEFT,
}

type AppProps = {
  applicationTitle?: string;
  minimumSize?: { height: number; width: number };
  initialSize?: { height: number; width: number };
  appBarWidth?: number;
  infoBarHeight?: number;
  setIsFullscreenPreview: (value: boolean) => void;
};

const App = ({
               applicationTitle = "Application",
               minimumSize = { height: 250, width: 400 },
               initialSize = { height: 300, width: 550 },
               appBarWidth = 70,
               infoBarHeight = 23,
               children = "content",
               setIsFullscreenPreview
             }: PropsWithChildren<AppProps>) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const isPrepareFullscreenRef = useRef<boolean>(false);

  const [area, setArea] = useState<Area>({
    top: window.innerHeight / 2 - initialSize.height / 2,
    left: window.innerWidth / 2 - initialSize.width / 2,
    height: initialSize.height,
    width: initialSize.width
  });

  // TODO in store
  const APP_MENUBAR_HEIGHT = 35;

  function draggable(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault(); //not working

    const originalClientY = e.clientY;

    const target = e.currentTarget;
    const offsetLeft = isFullScreen ? (e.clientX - appBarWidth) / (window.innerWidth - appBarWidth) * area.width + appBarWidth :
      e.clientX - target.getBoundingClientRect().left + appBarWidth;
    const offsetTop =
      e.clientY - target.getBoundingClientRect().top + infoBarHeight;

    document.onmousemove = drag;
    document.onmouseup = clear;

    function drag(e: MouseEvent) {
      e.preventDefault();

      if (isFullScreen && Math.abs(originalClientY - e.clientY) > 10) {
        // 10 is the tolerance until the app exits fullscreen (how much the mouse has to move)
        setIsFullScreen(false);
      }

      const newX = e.clientX - offsetLeft;
      const newY = e.clientY - offsetTop;

      isPrepareFullscreenRef.current = newY < 0;
      setIsFullscreenPreview(newY < 0);

      setArea({
        ...area,
        top: Math.min(
          window.innerHeight - infoBarHeight - APP_MENUBAR_HEIGHT,
          Math.max(0, newY)
        ),
        left: Math.min(
          window.innerWidth - appBarWidth - area.width,
          Math.max(0, newX)
        )
      });
    }

    function clear() {
      if (isPrepareFullscreenRef.current) {
        setIsFullScreen(true);
        isPrepareFullscreenRef.current = false;
        setIsFullscreenPreview(false);
      }
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }

  function resizable(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    direction: Direction
  ) {
    e.preventDefault();

    const originalX = e.clientX - appBarWidth;
    const originalY = e.clientY - infoBarHeight;

    document.onmousemove = resize;
    document.onmouseup = clear;

    function resize(e: MouseEvent) {
      const newX = Math.min(
        window.innerWidth - appBarWidth,
        Math.max(e.clientX - appBarWidth, 0)
      );
      const newY = Math.min(
        window.innerHeight - infoBarHeight,
        Math.max(e.clientY - infoBarHeight, 0)
      );

      const calcResizeBottom = (
        area: Area,
        newY: number,
        originalY: number
      ) => ({
        height: Math.max(minimumSize?.height, area.height + newY - originalY)
      });
      const calcResizeRight = (
        area: Area,
        newX: number,
        originalX: number
      ) => ({
        width: Math.max(minimumSize?.width, area.width + newX - originalX)
      });
      const calcResizeTop = (area: Area, newY: number, originalY: number) => ({
        top: newY,
        height: Math.max(minimumSize?.height, area.height + originalY - newY)
      });
      const calcResizeLeft = (area: Area, newX: number, originalX: number) => ({
        left: newX,
        width: Math.max(minimumSize?.width, area.width + originalX - newX)
      });

      switch (direction) {
        case Direction.TOP_LEFT:
          setArea(() => ({
            ...calcResizeTop(area, newY, originalY),
            ...calcResizeLeft(area, newX, originalX)
          }));
          break;

        case Direction.TOP:
          setArea((prev) => ({
            ...prev,
            ...calcResizeTop(area, newY, originalY)
          }));
          break;

        case Direction.TOP_RIGHT:
          setArea((prev) => ({
            ...prev,
            ...calcResizeTop(area, newY, originalY),
            ...calcResizeRight(area, newX, originalX)
          }));
          break;

        case Direction.RIGHT:
          setArea((prev) => ({
            ...prev,
            ...calcResizeRight(area, newX, originalX)
          }));
          break;

        case Direction.BOTTOM_RIGHT:
          setArea((prev) => ({
            ...prev,
            ...calcResizeBottom(area, newY, originalY),
            ...calcResizeRight(area, newX, originalX)
          }));
          break;

        case Direction.BOTTOM:
          setArea((prev) => ({
            ...prev,
            ...calcResizeBottom(area, newY, originalY)
          }));
          break;

        case Direction.BOTTOM_LEFT:
          setArea((prev) => ({
            ...prev,
            ...calcResizeBottom(area, newY, originalY),
            ...calcResizeLeft(area, newX, originalX)
          }));
          break;

        case Direction.LEFT:
          setArea((prev) => ({
            ...prev,
            ...calcResizeLeft(area, newX, originalX)
          }));
          break;
      }
    }

    function clear() {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }

  const areaMapper = ({ top, left, height, width }: Area) => ({
    top: `${top}px`,
    left: `${left}px`,
    height: `${height}px`,
    width: `${width}px`
  });

  return (
    <>
      <style>
        {
          `
@keyframes exit_fullscreen {
  0% {height: 100%; width: 100%; top: 0; left: 0;}
  100% {height: ${area.height}px; width: ${area.width}px; top: ${area.top}px; left: ${area.left}px;}
}
          `
        }
      </style>
      <div
        className={isFullScreen ? "fullscreenApp" : "app"}
        style={isFullScreen ? {} : areaMapper(area)}
      >
        <div
          className={"appMenuBar"}
          onMouseDown={draggable}
          onDoubleClick={() => setIsFullScreen((prev) => !prev)}
        >
          <div className="applicationTitle">
            {applicationTitle}
          </div>
          <div className="appBarIcons">
            <WindowRoundedIcon onClose={(e) => e.stopPropagation()}>
              <MinimiseBar />
            </WindowRoundedIcon>
            <WindowRoundedIcon onClose={() => setIsFullScreen(!isFullScreen)}>
              <MaximiseBar />
            </WindowRoundedIcon>
            <WindowRoundedIcon onClose={() => console.log("closed")}>
              <IconClose color={"#FFF"} />
            </WindowRoundedIcon>
          </div>
        </div>
        <div className={"appContent"}>{children}</div>
        {!isFullScreen && <Resizers resizable={resizable} />}
      </div>
    </>
  );
};

type ResizersProps = {
  resizable: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    direction: Direction
  ) => void;
};

function Resizers({ resizable }: ResizersProps) {
  return (
    <div className={"resizers"}>
      <div
        onMouseDown={(e) => resizable(e, Direction.TOP_LEFT)}
        className={"resizer round top-left"}
      />
      <div
        onMouseDown={(e) => resizable(e, Direction.TOP_RIGHT)}
        className={"resizer round top-right"}
      />
      <div
        onMouseDown={(e) => resizable(e, Direction.BOTTOM_LEFT)}
        className={"resizer round bottom-left"}
      />
      <div
        onMouseDown={(e) => resizable(e, Direction.BOTTOM_RIGHT)}
        className={"resizer round bottom-right"}
      />

      <div
        onMouseDown={(e) => resizable(e, Direction.LEFT)}
        className={"resizer line left"}
      />
      <div
        onMouseDown={(e) => resizable(e, Direction.RIGHT)}
        className={"resizer line right"}
      />
      <div
        onMouseDown={(e) => resizable(e, Direction.TOP)}
        className={"resizer line top"}
      />
      <div
        onMouseDown={(e) => resizable(e, Direction.BOTTOM)}
        className={"resizer line bottom"}
      />
    </div>
  );
}

export default App;
