import { BrowserRouter } from "react-router-dom";
import Theme from "src/Theme";
import Ubuntu from "src/Ubuntu";
import React, { useMemo } from "react";
import createWebuntuTheme from "src/theme/theme";
import { ThemeProvider } from "@mui/material";
import { useAppSelector } from "src/hooks/storeHooks";


function Providers() {

  const personalisationState = useAppSelector((state) => state.settings);

  const webuntuTheme = useMemo(() => {
    return createWebuntuTheme("dark", personalisationState.accentColor);
  }, [personalisationState.accentColor]);

  return (
    <ThemeProvider theme={webuntuTheme}>
      <BrowserRouter>
        <Theme />
        <Ubuntu />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Providers;