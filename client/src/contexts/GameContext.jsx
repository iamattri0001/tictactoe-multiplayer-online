import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [gameId, setGameId] = useState(null);
  const [name, setName] = useState(null);
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("state")) {
      const { gameId, name } = JSON.parse(localStorage.getItem("state"));
      if (gameId && name) {
        // try to reconnect
      }
    }
  }, []);

  const handleCreate = async ({ name }) => {
    if (!name) {
      toast.error("Please provide a name to join");
      return;
    }

    try {
      const res = await fetch(`/api/game/create?name=${name}`);
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const { gameId, game } = data;
      if (!gameId || !game) {
        toast.error("Something went wrong");
        return;
      }

      setGame(game);
      setGameId(gameId);
      setName(name);

      toast.success("Room created");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <GameContext.Provider value={{ game, name, gameId, handleCreate }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error(
      "useGameContext can be called only inside GameContextProvider"
    );
  }
  return context;
};
