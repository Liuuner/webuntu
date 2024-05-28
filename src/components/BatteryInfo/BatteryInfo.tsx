import { styled, Tooltip } from "@mui/material";
import useBattery from "src/hooks/useBattery.ts";
import Battery from "src/components/BatteryInfo/Battery.tsx";

function BatteryInfo() {
  const batteryInfo = useBattery();

  /*const [level, setLevel] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for increasing, -1 for decreasing

  useEffect(() => {
    const interval = setInterval(() => {
      if (level === 100 && direction === 1) {
        // If count reaches 100 and direction is increasing, switch direction
        setDirection(-1);
      } else if (level === 0 && direction === -1) {
        // If count reaches 0 and direction is decreasing, switch direction
        setDirection(1);
      } else {
        // Otherwise, increment or decrement count based on direction
        setLevel(prevCount => prevCount + direction);
      }
    }, 100); // Update every 100 milliseconds (increase speed by reducing this value)

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [level, direction]);*/


  if (!batteryInfo.supported) return;

  return (
    <Tooltip
      title={`Battery Status: ${batteryInfo.levelFormatted} remaining`}
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
        <Battery level={batteryInfo.level} isCharging={batteryInfo.charging} />
      </StyledBatteryInfoDiv>
    </Tooltip>
  );
}


const StyledBatteryInfoDiv = styled("div")(() => ({
  backgroundColor: "black",
  height: "70%",
  display: "flex"
}));

export default BatteryInfo;