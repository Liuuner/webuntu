import "./App.css";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

type Area = {
  top: string;
  left: string;
  height: string;
  width: string;
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
};

const App = ({
               applicationTitle = "Application",
               minimumSize = { height: 250, width: 400 },
               initialSize = { height: 300, width: 550 },
               appBarWidth = 70,
               infoBarHeight = 23,
               children = "content"
             }: PropsWithChildren<AppProps>) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [area, setArea] = useState<Area>({
    top: "0px",
    left: "0px",
    height: initialSize?.height + "px",
    width: initialSize?.width + "px"
  });

  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current?.getBoundingClientRect();
      setArea({
        ...area,
        top: window.innerHeight / 2 - rect.height / 2 + "px",
        left: window.innerWidth / 2 - rect.width / 2 + "px"
      });
    }
  }, [ref]);

  function draggable(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (isFullScreen) return;
    e.preventDefault();

    let pos3 = e.clientX;
    let pos4 = e.clientY;

    document.onmousemove = drag;
    document.onmouseup = clear;

    function drag(e: MouseEvent) {
      e.preventDefault();

      let pos1 = pos3 - e.clientX;
      let pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      //TODO: better?
      if (e.clientX <= appBarWidth) {
        pos1 = 0;
      }
      if (e.clientY <= infoBarHeight) {
        pos2 = 0;
      }

      const boundingClientRect = ref.current?.getBoundingClientRect();
      if (!boundingClientRect) return;

      setArea({
        ...area,
        top:
          Math.min(
            window.innerHeight - boundingClientRect.height,
            Math.max(infoBarHeight, boundingClientRect.top - pos2)
          ) + "px",
        left:
          Math.min(
            window.innerWidth - boundingClientRect.width,
            Math.max(appBarWidth, boundingClientRect.left - pos1)
          ) + "px"
      });
    }

    function clear() {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }

  function resizable(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    direction: Direction
  ) {
    e.preventDefault();

    const element = ref.current;

    if (!element) return;

    const original_width = element.getBoundingClientRect().width;
    const original_height = element.getBoundingClientRect().height;
    const original_mouse_x = e.pageX;
    const original_mouse_y = e.pageY;

    document.onmousemove = resize;
    document.onmouseup = clear;

    function resize(e: MouseEvent) {
      if (!element) return;
      const widthRight = original_width + (e.pageX - original_mouse_x);
      const widthLeft = original_width - (e.pageX - original_mouse_x);
      const heightBottom = original_height + (e.pageY - original_mouse_y);
      const heightTop = original_height - (e.pageY - original_mouse_y);
      const boundingClientRect = element?.getBoundingClientRect();

      switch (direction) {
        case Direction.TOP_LEFT:
          if (
            boundingClientRect.top - heightTop + boundingClientRect.height >
            infoBarHeight &&
            heightTop > minimumSize.height
          ) {
            setArea((prev) => ({
              ...prev,
              top:
                Math.max(
                  infoBarHeight,
                  boundingClientRect.top -
                  heightTop +
                  boundingClientRect.height
                ) + "px",
              height: Math.max(minimumSize.height, heightTop) + "px"
            }));
          }
          if (
            boundingClientRect.left - widthLeft + boundingClientRect.width >
            appBarWidth &&
            widthLeft > minimumSize.width
          ) {
            setArea((prev) => ({
              ...prev,
              left:
                Math.max(
                  appBarWidth,
                  boundingClientRect.left -
                  widthLeft +
                  boundingClientRect.width
                ) + "px",
              width: Math.max(minimumSize.width, widthLeft) + "px"
            }));
          }
          break;

        case Direction.TOP:
          if (
            boundingClientRect.top - heightTop + boundingClientRect.height >
            infoBarHeight &&
            heightTop > minimumSize.height
          ) {
            setArea((prev) => ({
              ...prev,
              top:
                Math.max(
                  infoBarHeight,
                  boundingClientRect.top -
                  heightTop +
                  boundingClientRect.height
                ) + "px",
              height: Math.max(minimumSize.height, heightTop) + "px"
            }));
          }
          break;

        case Direction.TOP_RIGHT:
          if (
            boundingClientRect.top - heightTop + boundingClientRect.height >
            infoBarHeight &&
            heightTop > minimumSize.height
          ) {
            setArea((prev) => ({
              ...prev,
              top:
                Math.max(
                  infoBarHeight,
                  boundingClientRect.top -
                  heightTop +
                  boundingClientRect.height
                ) + "px",
              height: Math.max(minimumSize.height, heightTop) + "px"
            }));
          }
          if (
            boundingClientRect.right + widthRight - boundingClientRect.width <
            window.innerWidth
          ) {
            setArea((prev) => ({
              ...prev,
              width: Math.max(minimumSize.width, widthRight) + "px"
            }));
          }
          break;

        case Direction.RIGHT:
          if (
            boundingClientRect.right + widthRight - boundingClientRect.width <
            window.innerWidth
          ) {
            setArea((prev) => ({
              ...prev,
              width: Math.max(minimumSize.width, widthRight) + "px"
            }));
          }
          break;

        case Direction.BOTTOM_RIGHT:
          if (
            boundingClientRect.right + widthRight - boundingClientRect.width <
            window.innerWidth
          ) {
            setArea((prev) => ({
              ...prev,
              width: Math.max(minimumSize.width, widthRight) + "px"
            }));
          }
          if (
            boundingClientRect.bottom +
            heightBottom -
            boundingClientRect.height <
            window.innerHeight
          ) {
            setArea((prev) => ({
              ...prev,
              height: Math.max(minimumSize.height, heightBottom) + "px"
            }));
          }
          break;

        case Direction.BOTTOM:
          if (
            boundingClientRect.bottom +
            heightBottom -
            boundingClientRect.height <
            window.innerHeight
          ) {
            setArea((prev) => ({
              ...prev,
              height: Math.max(minimumSize.height, heightBottom) + "px"
            }));
          }
          break;

        case Direction.BOTTOM_LEFT:
          if (
            boundingClientRect.bottom +
            heightBottom -
            boundingClientRect.height <
            window.innerHeight
          ) {
            setArea((prev) => ({
              ...prev,
              height: Math.max(minimumSize.height, heightBottom) + "px"
            }));
          }
          if (
            boundingClientRect.left - widthLeft + boundingClientRect.width >
            appBarWidth &&
            widthLeft > minimumSize.width
          ) {
            setArea((prev) => ({
              ...prev,
              left:
                Math.max(
                  appBarWidth,
                  boundingClientRect.left -
                  widthLeft +
                  boundingClientRect.width
                ) + "px",
              width: Math.max(minimumSize.width, widthLeft) + "px"
            }));
          }
          break;

        case Direction.LEFT:
          if (
            boundingClientRect.left - widthLeft + boundingClientRect.width >
            appBarWidth &&
            widthLeft > minimumSize.width
          ) {
            setArea((prev) => ({
              ...prev,
              left:
                Math.max(
                  appBarWidth,
                  boundingClientRect.left -
                  widthLeft +
                  boundingClientRect.width
                ) + "px",
              width: Math.max(minimumSize.width, widthLeft) + "px"
            }));
          }
          break;
      }
    }

    function clear() {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }

  return (
    <div
      className={isFullScreen ? "fullscreenApp" : "app"}
      style={isFullScreen ? { height: "100%", width: "100%" } : area}
      ref={ref}
    >
      <div
        className={"appMenuBar"}
        onMouseDown={draggable}
        onDoubleClick={() => setIsFullScreen((prev) => !prev)}
      >
        {" "}
        {applicationTitle}
      </div>
      <div className={"appContent"}>{children}</div>
      {!isFullScreen && <Resizers resizable={resizable} />}
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

export default App;
