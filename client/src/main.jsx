import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GameContextProvider } from "./contexts/GameContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
