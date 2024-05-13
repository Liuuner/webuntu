import { Button, TextField } from "@mui/material";
import { useState } from "react";

function MfTest() {
  const [url, setUrl] = useState("https://raw.githubusercontent.com/Liuuner/mftest/master/index-DC6-4Ocw.js");
  const [containerId, setContainerId] = useState("testroot");
  const [load, setLoad] = useState(false);

  return (
    <>
      <TextField label={"ScriptUrl"} value={url} onChange={(e) => setUrl(e.target.value)} />
      <TextField label={"RootId"} value={containerId} onChange={(e) => setContainerId(e.target.value)} />

      <Button onClick={() => setLoad(true)} variant={"contained"}>Mount</Button>
      <Button onClick={() => setLoad(false)} variant={"contained"}>Unmount</Button>

      {
        load &&
        <div style={{ height: "100%", width: "100%" }}>
          <div style={{ height: "100%", width: "100%" }} id={containerId} />
          <script type={"module"} src={url} />
        </div>
      }
    </>
  );
}

export default MfTest;