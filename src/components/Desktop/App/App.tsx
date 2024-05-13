import "./App.css";
import React, { memo, useEffect, useRef } from "react";
import { Area, OpenedApp } from "src/model/AppModel.ts";
import { useAppDispatch, useAppSelector } from "src/hooks/storeHooks.ts";
import { appsSliceActions } from "src/store/apps/AppsSlice.ts";
import { APPS } from "src/components/Apps/Apps.ts";
import MaximiseBar from "src/icons/icons/MaximiseBar.tsx";
import { WindowRoundedIcon } from "src/components/Desktop/App/WindowRoundedIcon.tsx";
import { IconClose } from "src/icons";
import MinimiseBar from "src/icons/icons/MinimiseBar.tsx";
import { FullscreenPreview } from "src/components/Desktop/Desktop.tsx";

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
  fullscreenPreview: FullscreenPreview;
  appObject: OpenedApp
};

// TODO in index
const APP_MENUBAR_HEIGHT = 35;

export const UnmemorizedApp = ({ fullscreenPreview, appObject }: AppProps) => {
  const dispatch = useAppDispatch();
  const isPrepareFullscreenRef = useRef<boolean>(false);
  const { infoBarHeight, appBarWidth } = useAppSelector((state) => state.settings);
  const { app, area, zIndex, isFullscreen, id } = appObject;
  const appElem = useRef<HTMLDivElement | null>(null);


  const minimumSize = { height: 250, width: 400 };

  const tempArea = useRef<Area>(area);

  useEffect(() => {
    setCssArea(area);
  }, []);

  const setIsFullscreen = (b: boolean) => {
    dispatch(appsSliceActions.setAppIsFullscreen({ id, isFullscreen: b }));
  };

  const handleClickApp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(appsSliceActions.selectApp(id));
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

  const setCssArea = (area: Partial<Area>) => {
    if (area.top) {
      appElem.current?.style.setProperty("--top", `${area.top}px`);
    }
    if (area.left) {
      appElem.current?.style.setProperty("--left", `${area.left}px`);
    }
    if (area.width) {
      appElem.current?.style.setProperty("--width", `${area.width}px`);
    }
    if (area.height) {
      appElem.current?.style.setProperty("--height", `${area.height}px`);
    }
  };

  function draggable(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();

    const { setArea, setIsActive, clearFullscreenPreview } = fullscreenPreview;

    const w = Number(appElem.current?.style.getPropertyValue("--width").replace("px", ""));
    const h = Number(appElem.current?.style.getPropertyValue("--height").replace("px", ""));

    const originalClientY = e.clientY;
    const originalArea = { ...area, width: w, height: h };
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    const target = e.currentTarget;
    const offsetLeft = isFullscreen ? (e.clientX - appBarWidth) / (innerWidth - appBarWidth) * area.width + appBarWidth :
      e.clientX - target.getBoundingClientRect().left + appBarWidth;
    const offsetTop =
      e.clientY - target.getBoundingClientRect().top + infoBarHeight;


    setArea(originalArea);

    document.onmousemove = (e) => {
      const result = drag(e);

      setCssArea(result);
      setArea(result);
    };
    document.onmouseup = (e) => {
      clear(e);
    };

    let localIsFullscreen = isFullscreen;
    let localIsFullscreenBefore = false;

    function drag(e: MouseEvent, postMouseUp?: boolean): Partial<Area> {
      e.stopPropagation();
      e.preventDefault();

      if (!postMouseUp && localIsFullscreen && Math.abs(originalClientY - e.clientY) > 10) {
        // 10 is the tolerance until the app exits fullscreen (how much the mouse has to move)
        localIsFullscreen = false;
        setIsFullscreen(false);
      }

      const newX = e.clientX - offsetLeft;
      const newY = e.clientY - offsetTop;

      const tempIsFullscreenPreview = newY < 0;
      isPrepareFullscreenRef.current = tempIsFullscreenPreview;
      if (localIsFullscreenBefore !== tempIsFullscreenPreview) {
        setIsActive(tempIsFullscreenPreview);
        localIsFullscreenBefore = tempIsFullscreenPreview;
      }

      return {
        top: calcAbsoluteCoords(
          Math.min(
            calcRelativeCoords(innerHeight, "Y") - APP_MENUBAR_HEIGHT,
            Math.max(0, newY)
          ), "Y"),
        left: calcAbsoluteCoords(
          Math.min(
            calcRelativeCoords(innerWidth, "X") - originalArea.width,
            Math.max(0, newX)
          ), "X")
      };

    }

    function clear(e: MouseEvent) {
      document.onmousemove = null;
      document.onmouseup = null;

      const newArea = { ...tempArea.current, ...drag(e, true) };

      dispatch(appsSliceActions.setAppArea({ id, area: newArea }));
      tempArea.current = newArea;

      clearFullscreenPreview();
      if (isPrepareFullscreenRef.current) {
        setIsFullscreen(true);
        isPrepareFullscreenRef.current = false;
      }
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
    const originalArea = { ...tempArea.current };
    const originalBottomAnchorY = originalArea.top + originalArea.height; // evtl. auch originalArea.top anstatt e.cli... nehmen
    const originalRightAnchorX = originalArea.left + originalArea.width; // evtl. auch originalArea.left anstatt e.cli... nehmen
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    document.onmousemove = (e) => setCssArea(resize(e));
    document.onmouseup = clear;

    function resize(e: MouseEvent): Partial<Area> {
      e.stopPropagation();
      e.preventDefault();

      const newX = Math.min(
        innerWidth - appBarWidth,
        Math.max(e.clientX - appBarWidth, 0)
      );
      const newY = Math.min(
        innerHeight - infoBarHeight,
        Math.max(e.clientY - infoBarHeight, 0)
      );

      const calcResizeBottom = (
        newY: number,
        originalY: number
      ) => ({
        height: Math.max(minimumSize?.height, originalArea.height + newY - originalY)
      });
      const calcResizeRight = (
        newX: number,
        originalX: number
      ) => ({
        width: Math.max(minimumSize?.width, originalArea.width + newX - originalX)
      });
      const calcResizeTop = (newY: number) => {
        const newTop = Math.min(originalBottomAnchorY - minimumSize.height,
          newY + infoBarHeight);
        return {
          top: newTop,
          height: originalBottomAnchorY - newTop
        };
      };
      const calcResizeLeft = (newX: number) => {
        const newLeft = Math.min(originalRightAnchorX - minimumSize.width,
          newX + appBarWidth);
        return {
          left: newLeft,
          width: originalRightAnchorX - newLeft
        };
      };

      switch (direction) {
        case Direction.TOP_LEFT:
          return {
            ...calcResizeTop(newY),
            ...calcResizeLeft(newX)
          };

        case Direction.TOP:
          return {
            ...calcResizeTop(newY)
          };

        case Direction.TOP_RIGHT:
          return {
            ...calcResizeTop(newY),
            ...calcResizeRight(newX, originalX)
          };

        case Direction.RIGHT:
          return {
            ...calcResizeRight(newX, originalX)
          };

        case Direction.BOTTOM_RIGHT:
          return {
            ...calcResizeBottom(newY, originalY),
            ...calcResizeRight(newX, originalX)
          };

        case Direction.BOTTOM:
          return {
            ...calcResizeBottom(newY, originalY)
          };

        case Direction.BOTTOM_LEFT:
          return {
            ...calcResizeBottom(newY, originalY),
            ...calcResizeLeft(newX)
          };

        case Direction.LEFT:
          return {
            ...calcResizeLeft(newX)
          };
      }
    }

    function clear(e: MouseEvent) {
      document.onmousemove = null;
      document.onmouseup = null;

      const newArea = { ...tempArea.current, ...resize(e) };

      dispatch(appsSliceActions.setAppArea({ id, area: newArea }));
      tempArea.current = newArea;
    }
  }

  const AppContent = memo(APPS[app.appKey], () => true);

  return (
    <div
      className={isFullscreen ? "fullscreenApp" : "app"}
      style={{ zIndex: zIndex }}
      onMouseDown={(e) => handleClickApp(e)}
      ref={appElem}
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
          <WindowRoundedIcon onClose={(e) => {
            e.stopPropagation();
            setIsFullscreen(!isFullscreen);
          }}>
            <MaximiseBar />
          </WindowRoundedIcon>
          <WindowRoundedIcon onClose={() => dispatch(appsSliceActions.closeApp(id))}>
            <IconClose color={"#FFF"} />
          </WindowRoundedIcon>
        </div>
      </div>
      <div className={"appContent"}>
        <AppContent />
      </div>
      {!isFullscreen && <Resizers resizable={resizable} />}
    </div>
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

const App = memo(UnmemorizedApp, (prevProps, nextProps) =>
  prevProps.appObject.zIndex == nextProps.appObject.zIndex &&
  prevProps.appObject.isFullscreen == nextProps.appObject.isFullscreen
);

export default App;