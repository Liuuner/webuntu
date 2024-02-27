import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { setAppBarWidth, setInfoBarHeight } from "../../../store/personalisation/PersonalisationSlice.ts";
import { AccentColor, accentColorMap } from "../../../theme/AccentColors.ts";
import AccentColorButton from "./AccentColorButton.tsx";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { setAppBarWidth, setInfoBarHeight, setInfoBarTimeFormat } from "../../../features/personalisation/PersonalisationSlice.ts";


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
      <p>InfoBarTimeFormat (use <a target={"_blank"} href="https://day.js.org/docs/en/display/format">this format</a>)</p>
      <input
        type="text"
        value={useAppSelector((state) => state.personalisation.infoBarTimeFormat)}
        onChange={(e) => dispatch(setInfoBarTimeFormat(e.target.value))}
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
