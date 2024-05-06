import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Providers from "src/Providers.tsx";
import store, { persistor } from "src/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Providers />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
