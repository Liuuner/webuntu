import "./InfoBar.css";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useAppSelector } from "src/hooks/storeHooks.ts";
import useBattery from "src/hooks/useBattery.ts";
import BatteryInfo from "src/components/BatteryInfo/BatteryInfo.tsx";

function InfoBar() {
  const timeFormat = useAppSelector(
    (state) => state.settings.timeFormat
  );
  const intervalId = useRef<null | number>(null)

  const [time, setTime] = useState(dayjs().format(timeFormat));

  const batteryInfo = useBattery();

  useEffect(() => {
    if (intervalId.current){
      clearInterval(intervalId.current)
    }
    intervalId.current = setInterval(() => setTime(dayjs().format(timeFormat)), 1000);
  }, [timeFormat]);

  return (
    <header id={"infoBar"}>
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
      <BatteryInfo />
    </header>
  );
}

export default InfoBar;
