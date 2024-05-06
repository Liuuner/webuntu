import { memo } from "react";
import InfoBar from "./components/InfoBar/InfoBar.tsx";
import AppBar from "./components/AppBar/AppBar.tsx";
import Desktop from "./components/Desktop/Desktop.tsx";
import { styled } from "@mui/material";
import { useAppSelector } from "src/hooks/storeHooks.ts";

function Ubuntu() {

  return (
    <UbuntuWrapper id={"ubuntu"}>
      <MemoInfoBar />
      <MemoAppBar />
      <Desktop />
    </UbuntuWrapper>
  );
}

const UbuntuWrapper = styled("div")(() => {
  const { infoBarHeight, appBarWidth } = useAppSelector((state) => state.settings);

  return {
    display: "grid",
    height: "100%",
    width: "100%",
    gridTemplate:
      `"infoBar infoBar" ${infoBarHeight}px
      "appBar desktop" auto / ${appBarWidth}px 1fr`
  };
});
const MemoInfoBar = memo(InfoBar);
const MemoAppBar = memo(AppBar);

export default Ubuntu;
