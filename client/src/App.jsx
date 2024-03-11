import React from "react";
import { useGameContext } from "./contexts/GameContext";
import { Navigate, Route, Routes, redirect } from "react-router-dom";
import Create from "./components/Create";
import Lobby from "./components/Lobby";
import { Toaster } from "react-hot-toast";
import Join from "./components/Join";

const App = () => {
  const { gameId } = useGameContext();

  return (
    <section className="min-h-screen bg-background-950 text-text-50 p-3 flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={gameId ? <Lobby /> : <Navigate to="/create" />}
        />
        <Route
          path="/create"
          element={!gameId ? <Create /> : <Navigate to="/" />}
        />
        <Route
          path="/join"
          element={!gameId ? <Join /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default App;
