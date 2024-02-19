import React from "react";
import ReactDOM from "react-dom/client";
import Ubuntu from "./Ubuntu.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Theme from "./Theme.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Theme />
        <Ubuntu />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
