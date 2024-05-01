import { useState } from "react";
import AccentColorSelection from "src/components/Apps/Settings/AccentColorSelection.tsx";
import { Button, Stack } from "@mui/material";
import { AccentColor } from "src/theme/AccentColors.ts";
import { settingsSliceActions, SettingsState } from "src/store/personalisation/SettingsSlice.ts";
import { useAppDispatch, useAppSelector } from "src/hooks/storeHooks.ts";


function Settings() {
  const dispatch = useAppDispatch();
  const personalisationState = useAppSelector((state) => state.settings);

  const [originalSettings, setOriginalSettings] = useState<SettingsState>(personalisationState);

  const handleChangeAppBarWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(settingsSliceActions.setAppBarWidth(e.target.valueAsNumber));
  };
  const handleChangeInfoBarHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(settingsSliceActions.setInfoBarHeight(e.target.valueAsNumber));
  };
  const handleChangeTimeFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(settingsSliceActions.setTimeFormat(e.target.value));
  };
  const handleChangeAccentColor = (color: AccentColor) => {
    dispatch(settingsSliceActions.setAccentColor(color));
  };
  const handleRevert = () => {
    dispatch(settingsSliceActions.setPersonalisation(originalSettings));
  };

  return (
    <>
      <p>AppBarWidth</p>
      <input
        type="number"
        value={personalisationState.appBarWidth}
        onChange={handleChangeAppBarWidth}
      />
      <p>InfoBarHeight</p>
      <input
        type="number"
        value={personalisationState.infoBarHeight}
        onChange={handleChangeInfoBarHeight}
      />
      <p>TimeFormat (use <a target={"_blank"} href="https://day.js.org/docs/en/display/format">this format</a>)
      </p>
      <input
        type="text"
        value={personalisationState.timeFormat}
        onChange={handleChangeTimeFormat}
      />
      <AccentColorSelection
        accentColor={personalisationState.accentColor}
        onChange={handleChangeAccentColor} />

      <Stack direction={"row"} spacing={2}>
        <Button variant={"contained"} onClick={() => setOriginalSettings(personalisationState)}>Apply</Button>
        <Button variant={"contained"} onClick={handleRevert}>Revert</Button>
      </Stack>
    </>
  );
}

export default Settings;
