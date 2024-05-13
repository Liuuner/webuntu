import { createTheme } from "@mui/material";
import getAccentColor, { AccentColor } from "./AccentColors.ts";

export type ThemeMode = "light" | "dark";

function createWebuntuTheme(themeMode: ThemeMode, accentColorName: AccentColor) {
  const accentColor = getAccentColor(accentColorName);
  return createTheme({
    typography: {
      fontFamily: [
        "Ubuntu"
      ].join(",")
    },
    palette: {
      mode: themeMode,
      primary: {
        main: accentColor
      }
    }
  });
}

export default createWebuntuTheme;

