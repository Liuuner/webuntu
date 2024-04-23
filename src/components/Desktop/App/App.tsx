import "./App.css";
import React, { PropsWithChildren, useRef, useState } from "react";
import { WindowRoundedIcon } from "./WindowRoundedIcon.tsx";
import { IconClose } from "../../../icons";
import MinimiseBar from "../../../icons/icons/MinimiseBar.tsx";
import MaximiseBar from "../../../icons/icons/MaximiseBar.tsx";
import { Area, OpenedApp } from "src/model/AppModel.ts";
import { useAppDispatch, useAppSelector } from "src/hooks/storeHooks.ts";
import { APPS, appsSliceActions } from "src/store/apps/AppsSlice.ts";

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
  /*minimumSize?: { height: number; width: number };
  initialSize?: { height: number; width: number };
  zIndex: number;
  onSelectApp: () => void;
  onCloseApp: () => void;
  app: App;*/
  setIsFullscreenPreview: (value: boolean) => void;
  appObject: OpenedApp
};

// TODO in index
const APP_MENUBAR_HEIGHT = 35;

const App: React.FC<PropsWithChildren<AppProps>> = ({
                                                      /*minimumSize = { height: 250, width: 400 },
                                                      initialSize = { height: 300, width: 550 },
                                                      zIndex,
                                                      onSelectApp,
                                                      onCloseApp,*/
                                                      setIsFullscreenPreview,
                                                      appObject
                                                    }) => {
  // const [isFullScreen, setIsFullScreen] = useState(false);
  const dispatch = useAppDispatch();
  const isPrepareFullscreenRef = useRef<boolean>(false);
  const { infoBarHeight, appBarWidth } = useAppSelector((state) => state.settings);
  const { app, area, zIndex, isFullscreen, id } = appObject;

  const minimumSize = { height: 250, width: 400 };
  // const initialSize = { height: 300, width: 550 };

  const [tempArea, setTempArea] = useState<Area>(area);

  const setIsFullscreen = (b: boolean) => {
    dispatch(appsSliceActions.setAppIsFullscreen({ id, isFullscreen: b }));

  };

  const handleClickApp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(appsSliceActions.selectApp(id));
    // onSelectApp();
  };


  const calcRelativeCoords = (coordinate: number, direction: "X" | "Y") => {
    if (direction === "X") {
      return coordinate - appBarWidth;
    } else {
      return coordinate - infoBarHeight;
    }
  };

  const calcAbsoluteCoords = (coordinate: number, direction: "X" | "Y") => {
    if (direction === "X") {
      return coordinate + appBarWidth;
    } else {
      return coordinate + infoBarHeight;
    }
  };

  function draggable(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();

    const originalClientY = e.clientY;

    const target = e.currentTarget;
    const offsetLeft = isFullscreen ? (e.clientX - appBarWidth) / (window.innerWidth - appBarWidth) * area.width + appBarWidth :
      e.clientX - target.getBoundingClientRect().left + appBarWidth;
    const offsetTop =
      e.clientY - target.getBoundingClientRect().top + infoBarHeight;

    document.onmousemove = drag;
    document.onmouseup = clear;

    function drag(e: MouseEvent) {
      e.stopPropagation();
      e.preventDefault();

      if (isFullscreen && Math.abs(originalClientY - e.clientY) > 10) {
        // 10 is the tolerance until the app exits fullscreen (how much the mouse has to move)
        setIsFullscreen(false);
      }

      const newX = e.clientX - offsetLeft;
      const newY = e.clientY - offsetTop;

      isPrepareFullscreenRef.current = newY < 0;
      setIsFullscreenPreview(newY < 0);

      setTempArea((prevArea) => ({
        ...prevArea,
        top: calcAbsoluteCoords(
          Math.min(
            calcRelativeCoords(window.innerHeight, "Y") - APP_MENUBAR_HEIGHT,
            Math.max(0, newY)
          ), "Y"),
        left: calcAbsoluteCoords(
          Math.min(
            calcRelativeCoords(window.innerWidth, "X") - prevArea.width,
            Math.max(0, newX)
          ), "X")
      }));
    }

    function clear() {
      if (isPrepareFullscreenRef.current) {
        setIsFullscreen(true);
        isPrepareFullscreenRef.current = false;
        setIsFullscreenPreview(false);
      }
      dispatch(appsSliceActions.setAppArea({ id, area: tempArea }));
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

    const originalX = e.clientX - appBarWidth;
    const originalY = e.clientY - infoBarHeight;

    document.onmousemove = resize;
    document.onmouseup = clear;

    function resize(e: MouseEvent) {
      e.stopPropagation();
      e.preventDefault();

      const newX = Math.min(
        window.innerWidth - appBarWidth,
        Math.max(e.clientX - appBarWidth, 0)
      );
      const newY = Math.min(
        window.innerHeight - infoBarHeight,
        Math.max(e.clientY - infoBarHeight, 0)
      );

      const calcResizeBottom = (
        propArea: Area,
        newY: number,
        originalY: number
      ) => ({
        height: Math.max(minimumSize?.height, propArea.height + newY - originalY)
      });
      const calcResizeRight = (
        propArea: Area,
        newX: number,
        originalX: number
      ) => ({
        width: Math.max(minimumSize?.width, propArea.width + newX - originalX)
      });
      const calcResizeTop = (propArea: Area, newY: number, originalY: number) => ({
        top: newY + infoBarHeight,
        height: Math.max(minimumSize?.height, propArea.height + originalY - newY)
      });
      const calcResizeLeft = (propArea: Area, newX: number, originalX: number) => ({
        left: newX + appBarWidth,
        width: Math.max(minimumSize?.width, propArea.width + originalX - newX)
      });

      switch (direction) {
        case Direction.TOP_LEFT:
          setTempArea((prevArea) => ({
            ...calcResizeTop(prevArea, newY, originalY),
            ...calcResizeLeft(prevArea, newX, originalX)
          }));
          break;

        case Direction.TOP:
          setTempArea((prevArea) => ({
            ...prevArea,
            ...calcResizeTop(prevArea, newY, originalY)
          }));
          break;

        case Direction.TOP_RIGHT:
          setTempArea((prevArea) => ({
            ...prevArea,
            ...calcResizeTop(prevArea, newY, originalY),
            ...calcResizeRight(prevArea, newX, originalX)
          }));
          break;

        case Direction.RIGHT:
          setTempArea((prevArea) => ({
            ...prevArea,
            ...calcResizeRight(prevArea, newX, originalX)
          }));
          break;

        case Direction.BOTTOM_RIGHT:
          setTempArea((prevArea) => ({
            ...prevArea,
            ...calcResizeBottom(prevArea, newY, originalY),
            ...calcResizeRight(prevArea, newX, originalX)
          }));
          break;

        case Direction.BOTTOM:
          setTempArea((prevArea) => ({
            ...prevArea,
            ...calcResizeBottom(prevArea, newY, originalY)
          }));
          break;

        case Direction.BOTTOM_LEFT:
          setTempArea((prevArea) => ({
            ...prevArea,
            ...calcResizeBottom(prevArea, newY, originalY),
            ...calcResizeLeft(prevArea, newX, originalX)
          }));
          break;

        case Direction.LEFT:
          setTempArea((prevArea) => ({
            ...prevArea,
            ...calcResizeLeft(prevArea, newX, originalX)
          }));
          break;
      }
    }

    function clear() {
      document.onmousemove = null;
      document.onmouseup = null;
      // dispatch(appsSliceActions.setAppArea({ id, area: tempArea }));
    }
  }

  const areaMapper = ({ top, left, height, width }: Area) => ({
    top: `${top}px`,
    left: `${left}px`,
    height: `${height}px`,
    width: `${width}px`
  });

  return (
    <div
      className={isFullscreen ? "fullscreenApp" : "app"}
      style={{ ...(isFullscreen ? {} : areaMapper(tempArea)), zIndex: zIndex }}
      onMouseDown={(e) => handleClickApp(e)}
    >
      <div
        className={"appMenuBar"}
        onMouseDown={(e) => {
          handleClickApp(e);
          draggable(e);
        }}
        onDoubleClick={() => setIsFullscreen(!isFullscreen)}
      >
        <div className="applicationTitle">
          {app.name}
        </div>
        <div className="appBarIcons">
          <WindowRoundedIcon onClose={(e) => e.stopPropagation()}>
            <MinimiseBar />
          </WindowRoundedIcon>
          <WindowRoundedIcon onClose={(e) => e.stopPropagation()}>
            <MaximiseBar />
          </WindowRoundedIcon>
          <WindowRoundedIcon onClose={() => dispatch(appsSliceActions.closeApp(id))}>
            <IconClose color={"#FFF"} />
          </WindowRoundedIcon>
        </div>
      </div>
      <div className={"appContent"}>{
        APPS[app.appKey]()
      }</div>
      {!isFullscreen && <Resizers resizable={resizable} />}
    </div>
  );
};

type ResizersProps = {
  resizable: (
    _e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    _direction: Direction
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
