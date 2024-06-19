// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SciChartSurface } from "scichart";

SciChartSurface.loadWasmFromCDN(); // Load WASM from CDN

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
