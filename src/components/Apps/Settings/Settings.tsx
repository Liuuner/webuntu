import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { setAppBarWidth, setInfoBarHeight, setInfoBarTimeFormat } from "../../../features/personalisation/PersonalisationSlice.ts";


function Settings() {
  const dispatch = useAppDispatch();

  const [originalValue, setOriginalValue] = useState(
    useAppSelector((state) => state.personalisation)
  );

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
    </>
  );
}

export default Settings;
