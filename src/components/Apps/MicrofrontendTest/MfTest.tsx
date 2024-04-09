import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function MfTest() {
  const [url, setUrl] = useState("https://raw.githubusercontent.com/Liuuner/mftest/master/index-DC6-4Ocw.js");
  const [rootId, setRootId] = useState("testroot");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (load) {
      // Load script dynamically
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.onload = () => {
        // React app is loaded, render it into the specified container
        ReactDOM.createRoot(
          window.MfTestApp(), // Assuming the loaded script exposes a function named MfTestApp
          document.getElementById(rootId)
        );
      };
      document.body.appendChild(script);

      return () => {
        // Unmount React app when component is unmounted
        ReactDOM.(document.getElementById(rootId));
      };
    }
  }, [load, url, rootId]);

  return (
    <>
      <TextField label={"ScriptUrl"} value={url} onChange={(e) => setUrl(e.target.value)} />
      <TextField label={"RootId"} value={rootId} onChange={(e) => setRootId(e.target.value)} />

      <Button onClick={() => setLoad(true)} variant={"contained"}>Mount</Button>
      <Button onClick={() => setLoad(false)} variant={"contained"}>Unmount</Button>

      <div id={rootId} />
    </>
  );
}

export default MfTest;