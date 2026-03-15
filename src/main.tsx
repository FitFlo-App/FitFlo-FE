import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import "antd/dist/reset.css";

// Check for hostname redirection
const webHost = import.meta.env.VITE_WEB_HOST;
const webUrl = import.meta.env.VITE_WEB_URL;
const currentHost = window.location.hostname;

if (
  webHost &&
  currentHost !== webHost &&
  currentHost !== "localhost" &&
  currentHost !== "127.0.0.1"
) {
  // Use replace to avoid keeping the incorrect host in history
  window.location.replace(
    `${webUrl}${window.location.pathname}${window.location.search}`
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
