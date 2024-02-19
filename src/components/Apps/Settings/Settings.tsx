import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { setAppBarWidth, setInfoBarHeight } from "../../../store/personalisation/PersonalisationSlice.ts";
import { AccentColor, accentColorMap } from "../../../theme/AccentColors.ts";
import AccentColorButton from "./AccentColorButton.tsx";


function Settings() {
  const dispatch = useAppDispatch();

  const [originalValue, setOriginalValue] = useState(
    useAppSelector((state) => state.personalisation)
  );

  const [selectedAccentColor, setSelectedAccentColor] = useState<AccentColor>("default");

  const handleSelectAccentColor = (accentColor: AccentColor) => {
    setSelectedAccentColor(accentColor);
  };

  return (
    <>
      <p>AppBarWidth</p>
      <input
        type="number"
        value={useAppSelector((state) => state.personalisation.appBarWidth)}
        onChange={(e) => dispatch(setAppBarWidth(e.target.valueAsNumber))}
      />
      <p>InfoBarHeight</p>
      <input
        type="number"
        value={useAppSelector((state) => state.personalisation.infoBarHeight)}
        onChange={(e) => dispatch(setInfoBarHeight(e.target.valueAsNumber))}
      />
      <br />
      <br />
      <br />
      <div>
        {
          Object.entries(accentColorMap).map(([key, value], index) => (
            <AccentColorButton
              accentColor={key}
              color={value}
              onClick={handleSelectAccentColor}
              key={index}
              selected={selectedAccentColor === key}
            />
          ))
        }
      </div>
    </>
  );
}

export default Settings;
