import { styled, Tooltip } from "@mui/material";
import useBattery from "src/hooks/useBattery.ts";
import Battery from "src/components/BatteryInfo/Battery.tsx";

function BatteryInfo() {
  const { level, levelFormatted, charging, supported } = useBattery();

  if (!supported) return;

  return (
    <Tooltip
      title={`Battery Status: ${levelFormatted} remaining`}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -10]
              }
            }
          ]
        }
      }}>
      <StyledBatteryInfoDiv>
        <Battery level={level} isCharging={charging} />
      </StyledBatteryInfoDiv>
    </Tooltip>
  );
}


const StyledBatteryInfoDiv = styled("div")(() => ({
  height: "70%"
}));

export default BatteryInfo;