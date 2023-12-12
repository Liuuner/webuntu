import "./App.css";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

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
    top: 0,
    left: 0,
    height: initialSize.height,
    width: initialSize.width
  });

  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current?.getBoundingClientRect();
      setArea({
        ...area,
        top: window.innerHeight / 2 - rect.height / 2,
        left: window.innerWidth / 2 - rect.width / 2
      });
    }
  }, [ref]);

  function draggable(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (isFullScreen) return;
    e.preventDefault();

    const target = e.currentTarget;
    const offsetLeft = e.clientX - target.getBoundingClientRect().left;
    const offsetTop = e.clientY - target.getBoundingClientRect().top;

    document.onmousemove = drag;
    document.onmouseup = clear;

    function drag(e: MouseEvent) {
      e.preventDefault();

      const newX = e.clientX - offsetLeft;
      const newY = e.clientY - offsetTop;

      setArea({
        ...area,
        top:
          Math.min(
            window.innerHeight - area.height,
            Math.max(infoBarHeight, newY)
          ),
        left:
          Math.min(
            window.innerWidth - area.width,
            Math.max(appBarWidth, newX)
          )
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
                ),
              height: Math.max(minimumSize.height, heightTop)
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
                ),
              width: Math.max(minimumSize.width, widthLeft)
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
                ),
              height: Math.max(minimumSize.height, heightTop)
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
                ),
              height: Math.max(minimumSize.height, heightTop)
            }));
          }
          if (
            boundingClientRect.right + widthRight - boundingClientRect.width <
            window.innerWidth
          ) {
            setArea((prev) => ({
              ...prev,
              width: Math.max(minimumSize.width, widthRight)
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
              width: Math.max(minimumSize.width, widthRight)
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
              width: Math.max(minimumSize.width, widthRight)
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
              height: Math.max(minimumSize.height, heightBottom)
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
              height: Math.max(minimumSize.height, heightBottom)
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
              height: Math.max(minimumSize.height, heightBottom)
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
                ),
              width: Math.max(minimumSize.width, widthLeft)
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
                ),
              width: Math.max(minimumSize.width, widthLeft)
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

  const areaMapper = ({ top, left, height, width }: Area) => ({
    top: `${top}px`,
    left: `${left}px`,
    height: `${height}px`,
    width: `${width}px`
  });

  return (
    <div
      className={isFullScreen ? "fullscreenApp" : "app"}
      style={isFullScreen ? { height: "100%", width: "100%" } : areaMapper(area)}
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
