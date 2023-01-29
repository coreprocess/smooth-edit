import React from "react";
import { createRoot } from "react-dom/client";
import { setSmoothEditDebugMode } from "smooth-edit";
import App from "./App";
import "./index.css";

setSmoothEditDebugMode(true);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
