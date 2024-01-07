import App from "./App/App.tsx";
import "./Desktop.css";
import { useState } from "react";
import { PeerCall } from "./App/Apps/PeerCall/peerCall.tsx";

function Desktop() {
  const [isFullscreenPreview, setIsFullscreenPreview] = useState<boolean>(false);

  return (
    <main id={"desktop"}>
      <div id={"fullscreenPreview"} className={isFullscreenPreview ? "active" : ""} />
      <App applicationTitle={"Application Title"} setIsFullscreenPreview={setIsFullscreenPreview}>
        <PeerCall/>
      </App>
    </main>
  );
}

export default Desktop;
