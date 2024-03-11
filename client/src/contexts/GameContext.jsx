import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [gameId, setGameId] = useState(null);
  const [name, setName] = useState(null);
  const [game, setGame] = useState(null);

  useEffect(() => {
    const handleReconnect = async () => {
      try {
        if (localStorage.getItem("state")) {
          const { gameId, name } = JSON.parse(localStorage.getItem("state"));
          if (gameId && name) {
            const res = await fetch("/api/game/join", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, gameId }),
            });

            const data = await res.json();
            if (data.error) {
              throw new Error(data.error);
            }

            const game = data.game;
            if (!game) {
              toast.error("Could not reconnect");
            }

            setGame(game);
            setGameId(gameId);
            setName(name);
          }
        }
      } catch (err) {
        toast.error(err.message);
      }
    };
    handleReconnect();
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
      localStorage.setItem("state", JSON.stringify({ name, gameId }));
      toast.success("Room created");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleMakeMove = async ({ x, y }) => {
    if (game?.turn !== name) {
      toast.error("Not your turn");
      return;
    }
    try {
      const res = await fetch("/api/game/move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ x, y, name, gameId }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setGame(data.game);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <GameContext.Provider
      value={{ game, name, gameId, handleCreate, handleMakeMove }}
    >
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
