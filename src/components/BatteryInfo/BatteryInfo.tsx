import { styled } from "@mui/material";
import useBattery from "src/hooks/useBattery.ts";

function BatteryInfo() {
  const batteryInfo = useBattery();

  return (
    <StyledBatteryInfoDiv className={batteryInfo.charging ? "charging" : ""}>
      {batteryInfo.levelFormatted}
    </StyledBatteryInfoDiv>
  );
}

const StyledBatteryInfoDiv = styled("div")(({ theme }) => ({
  backgroundColor: "red",


  "&.charging": {
    backgroundColor: "green"
  }
}));

export default BatteryInfo;