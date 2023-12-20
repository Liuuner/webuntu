import App from "./App/App.tsx";
import "./Desktop.css";
import { useState } from "react";

function Desktop() {
  const [isFullscreenPreview, setIsFullscreenPreview] = useState<boolean>(false);

  return (
    <main id={"desktop"}>
      <div id={"fullscreenPreview"} className={isFullscreenPreview ? "active" : ""} />
      <App applicationTitle={"Application Title"} setIsFullscreenPreview={setIsFullscreenPreview}>
        <div />
      </App>
    </main>
  );
}

export default Desktop;
