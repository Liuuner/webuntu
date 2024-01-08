import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { setAppBarWidth, setInfoBarHeight } from "../../../features/personalisation/PersonalisationSlice.ts";


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
    </>
  );
}

export default Settings;
