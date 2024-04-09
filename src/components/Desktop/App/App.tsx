import "./App.css";
import React, { PropsWithChildren, useRef, useState } from "react";
import { WindowRoundedIcon } from "./WindowRoundedIcon.tsx";
import { IconClose } from "../../../icons";
import MinimiseBar from "../../../icons/icons/MinimiseBar.tsx";
import MaximiseBar from "../../../icons/icons/MaximiseBar.tsx";
import { AppModel } from "../../../model/AppModel.ts";

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
  LEFT
}

type AppProps = {
  minimumSize?: { height: number; width: number };
  initialSize?: { height: number; width: number };
  setIsFullscreenPreview: (value: boolean) => void;
  zIndex: number;
  onSelectApp: () => void;
  onCloseApp: () => void;
  app: AppModel;
};

// TODO in index
const APP_MENUBAR_HEIGHT = 35;
const APP_BAR_WIDTH = 70;
const INFO_BAR_HEIGHT = 23;

const App: React.FC<PropsWithChildren<AppProps>> = ({
                                                      minimumSize = { height: 250, width: 400 },
                                                      initialSize = { height: 300, width: 550 },
                                                      setIsFullscreenPreview,
                                                      zIndex,
                                                      onSelectApp,
                                                      onCloseApp,
                                                      app
                                                    }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const isPrepareFullscreenRef = useRef<boolean>(false);

  const [area, setArea] = useState<Area>({
    top: window.innerHeight / 2 - initialSize.height / 2,
    left: window.innerWidth / 2 - initialSize.width / 2,
    height: initialSize.height,
    width: initialSize.width
  });

  const handleClickApp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onSelectApp();
  };


  const calcRelativeCoords = (coordinate: number, direction: "X" | "Y") => {
    if (direction === "X") {
      return coordinate - APP_BAR_WIDTH;
    } else {
      return coordinate - INFO_BAR_HEIGHT;
    }
  };

  const calcAbsoluteCoords = (coordinate: number, direction: "X" | "Y") => {
    if (direction === "X") {
      return coordinate + APP_BAR_WIDTH;
    } else {
      return coordinate + INFO_BAR_HEIGHT;
    }
  };

  function draggable(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault(); //not working

    const originalClientY = e.clientY;

    const target = e.currentTarget;
    const offsetLeft = isFullScreen ? (e.clientX - APP_BAR_WIDTH) / (window.innerWidth - APP_BAR_WIDTH) * area.width + APP_BAR_WIDTH :
      e.clientX - target.getBoundingClientRect().left + APP_BAR_WIDTH;
    const offsetTop =
      e.clientY - target.getBoundingClientRect().top + INFO_BAR_HEIGHT;

    document.onmousemove = drag;
    document.onmouseup = clear;

    function drag(e: MouseEvent) {
      e.stopPropagation();
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
        top: calcAbsoluteCoords(
          Math.min(
            calcRelativeCoords(window.innerHeight, "Y") - APP_MENUBAR_HEIGHT,
            Math.max(0, newY)
          ), "Y"),
        left: calcAbsoluteCoords(
          Math.min(
            calcRelativeCoords(window.innerWidth, "X") - area.width,
            Math.max(0, newX)
          ), "X")
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
    e.stopPropagation();
    e.preventDefault();

    const originalX = e.clientX - APP_BAR_WIDTH;
    const originalY = e.clientY - INFO_BAR_HEIGHT;

    document.onmousemove = resize;
    document.onmouseup = clear;

    function resize(e: MouseEvent) {
      const newX = Math.min(
        window.innerWidth - APP_BAR_WIDTH,
        Math.max(e.clientX - APP_BAR_WIDTH, 0)
      );
      const newY = Math.min(
        window.innerHeight - INFO_BAR_HEIGHT,
        Math.max(e.clientY - INFO_BAR_HEIGHT, 0)
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
        top: newY + INFO_BAR_HEIGHT,
        height: Math.max(minimumSize?.height, area.height + originalY - newY)
      });
      const calcResizeLeft = (area: Area, newX: number, originalX: number) => ({
        left: newX + APP_BAR_WIDTH,
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
          /*`
@keyframes exit_fullscreen {
  0% {height: 100%; width: 100%; top: 0; left: 0;}
  100% {height: ${area.height}px; width: ${area.width}px; top: ${area.top}px; left: ${area.left}px;}
}
          `*/
        }
      </style>
      <div
        className={isFullScreen ? "fullscreenApp" : "app"}
        style={{ ...(isFullScreen ? {} : areaMapper(area)), zIndex: zIndex }}
        onMouseDown={(e) => handleClickApp(e)}
      >
        <div
          className={"appMenuBar"}
          onMouseDown={(e) => {
            handleClickApp(e);
            draggable(e);
          }}
          onDoubleClick={() => setIsFullScreen((b) => !b)}
        >
          <div className="applicationTitle">
            {app.name}
          </div>
          <div className="appBarIcons">
            <WindowRoundedIcon onClose={(e) => e.stopPropagation()}>
              <MinimiseBar />
            </WindowRoundedIcon>
            <WindowRoundedIcon onClose={() => setIsFullScreen(!isFullScreen)}>
              <MaximiseBar />
            </WindowRoundedIcon>
            <WindowRoundedIcon onClose={onCloseApp}>
              <IconClose color={"#FFF"} />
            </WindowRoundedIcon>
          </div>
        </div>
        <div className={"appContent"}>{app.app()}</div>
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
