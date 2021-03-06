import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import DemystifyVisualiser from "./components/DemystifyVisualiser";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Main render point for the DemystifyVisualiser.
 */
ReactDOM.render(
  <React.StrictMode>
    <DemystifyVisualiser />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
