import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
const Join = () => {
  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");
  const { handleJoin } = useGameContext();
  return (
    <div className="flex flex-col items-center justify-center space-y-5 bg-background-900 px-5 py-5 ring-1 ring-secondary-700 rounded-md">
      <h3 className="text-center text-3xl font-semibold text-accent-300">
        Join a Room
      </h3>
      <div className="flex gap-y-4 flex-col">
        <input
          autoComplete="off"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          type="text"
          id="name"
          placeholder="Enter room ID"
          className="bg-transparent ring-2 w-[240px] ring-primary-600 focus:ring-primary-400 p-1.5 outline-none rounded-sm transition-all"
        />
        <input
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="name"
          placeholder="Choose a name"
          className="bg-transparent ring-2 w-[240px] ring-primary-600 focus:ring-primary-400 p-1.5 outline-none rounded-sm transition-all"
        />

        <button
          onClick={() => handleJoin({ name: name })}
          className="bg-primary-400 px-2 py-1 rounded hover:bg-primary-400/80 transition-all"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Join;
