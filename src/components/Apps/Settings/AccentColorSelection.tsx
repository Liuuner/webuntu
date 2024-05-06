import { AccentColor, accentColorMap } from "src/theme/AccentColors.ts";
import { Radio, Stack, styled } from "@mui/material";
import { useMemo } from "react";

type AccentColorSelectionProps = {
  onChange: (color: AccentColor) => void;
  accentColor: AccentColor;
}

type StyledRadioProps = {
  radioColor: string;
}

const StyledRadio = styled(Radio,
  { shouldForwardProp: (propName) => propName !== "radioColor" })<StyledRadioProps>(({ radioColor }) => ({
  color: radioColor,
  "&.Mui-checked": {
    color: radioColor
  },
  "&:hover": {
    backgroundColor: radioColor + "0A"
  }
}));

function AccentColorSelection({ accentColor, onChange }: AccentColorSelectionProps) {

  return useMemo(() => (
    <Stack direction={"row"} spacing={1}>
      {
        Object.entries(accentColorMap).map(([key, value]) => {
          return (
            <StyledRadio
              radioColor={value}
              onChange={(e) => onChange(e.target.value as AccentColor)}
              value={key}
              key={key}
              checked={accentColor == key}
            />
          );
        })
      }
    </Stack>
  ), [accentColor, onChange]);
}

export default AccentColorSelection;