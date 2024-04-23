import { BrowserRouter } from "react-router-dom";
import Ubuntu from "src/Ubuntu";
import React, { useMemo } from "react";
import createWebuntuTheme from "src/theme/theme";
import { ThemeProvider } from "@mui/material";
import { useAppSelector } from "src/hooks/storeHooks";


function Providers() {

  const { accentColor } = useAppSelector((state) => state.settings);

  const webuntuTheme = useMemo(() => {
    return createWebuntuTheme("dark", accentColor);
  }, [accentColor]);

  return (
    <ThemeProvider theme={webuntuTheme}>
      <BrowserRouter>
        <Ubuntu />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Providers;