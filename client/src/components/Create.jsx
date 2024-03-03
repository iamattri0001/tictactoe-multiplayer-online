import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useGameContext } from "../contexts/GameContext";
const Create = () => {
  const [input, setInput] = useState("");
  const { handleCreate } = useGameContext();
  return (
    <div className="flex flex-col items-center justify-center space-y-5 bg-background-900 px-5 py-5 ring-1 ring-secondary-700 rounded-md">
      <h3 className="text-center text-3xl font-semibold text-accent-300">
        Create a Room
      </h3>
      <div className="flex gap-x-3">
        <input
          autoComplete="off"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          id="name"
          placeholder="Choose a name"
          className="bg-transparent ring-2 w-[240px] ring-primary-600 focus:ring-primary-400 p-1.5 outline-none rounded-sm transition-all"
        />
        <button
          onClick={() => handleCreate({ name: input })}
          className="bg-primary-400 px-2 py-1 rounded hover:bg-primary-400/80 transition-all"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Create;
