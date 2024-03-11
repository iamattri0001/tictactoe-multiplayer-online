import React from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { TbOval } from "react-icons/tb";
import { useGameContext } from "../contexts/GameContext";
const Board = () => {
  const { game, name, gameId, handleMakeMove} = useGameContext();
  const { board, turn } = game;
  const sym = game.symbol[name];

  const boardIndices = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ];
  
  return (
    <div className="grid-cols-3 grid gap-5">
      {boardIndices.map(([x, y], i) => (
        <div
          onClick={() => {
            if (board[x][y]) {
              return;
            }
            handleMakeMove({ x, y });
          }}
          x={x}
          y={y}
          key={i}
          className={`h-16 w-16 ring-2 transition-all rounded flex items-center justify-center ${
            board[x][y]
              ? `${
                  board[x][y] === sym ? `ring-primary-400` : `ring-accent-400`
                }`
              : ` ring-primary-300/30 hover:ring-primary-400 cursor-pointer`
          }`}
        >
          {board[x][y] === "X" && (
            <MdClose
              className={`${
                sym === board[x][y] ? `text-primary-300` : `text-accent-300`
              } text-5xl`}
            />
          )}
          {board[x][y] === "O" && (
            <TbOval
              className={`${
                sym === board[x][y] ? `text-primary-300` : `text-accent-300`
              } text-5xl`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Board;
