import "./InfoBar.css";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useAppSelector } from "../../app/hooks.ts";

function InfoBar() {
  const infoBarHeight = useAppSelector(
    (state) => state.personalisation.infoBarHeight
  );
  const infoBarTimeFormat = useAppSelector(
    (state) => state.personalisation.infoBarTimeFormat
  );
  const intervalId = useRef<null | number>(null)

  const [time, setTime] = useState(dayjs().format("DD MMM HH:mm"));

  useEffect(() => {
    if (intervalId.current){
      clearInterval(intervalId.current)
    }
    intervalId.current = setInterval(() => setTime(dayjs().format(infoBarTimeFormat)), 1000);
  }, [infoBarTimeFormat]);

  return (
    <header id={"infoBar"} style={{ height: infoBarHeight }}>
      <div id={"time"}>
        <p>{time}</p>
      </div>
      {/*<div id={"leftButtonGroup"}>
                <div className={"infoBarButton"}>
                    <p>Activities</p>
                </div>
                <div className={"infoBarButton"}>
                    <img src="/app-icons/settings-icon.png" alt="Settings"/>
                    <p>Settings</p>
                </div>
            </div>
            <div id={"time"}>
                <p>{time}</p>
            </div>
            <div id={"rightButtonGroup"}>
                <img style={{filter: "invert(100%)"}} src="/info-bar-icons/network-icon.png" alt="Network"/>
                <img src="/info-bar-icons/volume_icon.png" alt="Volume"/>
                <img style={{filter: "invert(100%)"}} src="/info-bar-icons/power-icon.png" alt="Power"/>
            </div>*/}
    </header>
  );
}

export default InfoBar;
