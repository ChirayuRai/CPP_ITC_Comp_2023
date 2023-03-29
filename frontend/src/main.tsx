import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Switch, Route } from "react-router-dom";
//import "./styles/tailwind.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
