import { useEffect, useState } from "react";

declare global {
  interface Navigator {
    getBattery?(): Promise<Battery>;
  }
}

type BatteryInfo = {
  level: number;
  levelFormatted: string;
  charging: boolean;
  supported: boolean;
}

type Battery = {
  level: number;
  charging: boolean;
  addEventListener(event: string, callback: () => void): void
}

const initialBatteryInfo: BatteryInfo = { level: 0, levelFormatted: "0%", charging: false, supported: true };

const useBattery = (): BatteryInfo => {
  const [batteryInfo, setBatteryInfo] = useState<BatteryInfo>(initialBatteryInfo);

  const updateBatteryInfo = (battery: Battery) => {
    const { level, charging } = battery;
    setBatteryInfo({ level, levelFormatted: `${(level * 100).toFixed(0)}%`, charging, supported: true });
  };

  useEffect(() => {
    const checkBatteryAPIAndSetup = async () => {
      if (navigator.getBattery) {
        try {
          const battery = await navigator.getBattery();
          updateBatteryInfo(battery);

          battery.addEventListener("chargingchange", () => updateBatteryInfo(battery));
          battery.addEventListener("levelchange", () => updateBatteryInfo(battery));
        } catch (error) {
          console.info("Battery status is not supported.");
          setBatteryInfo((prev) => ({ ...prev, supported: false }));
        }
      } else {
        console.info("Battery status is not supported.");
        setBatteryInfo((prev) => ({ ...prev, supported: false }));
      }
    };

    checkBatteryAPIAndSetup();
  }, []);

  return batteryInfo;
};

export default useBattery;