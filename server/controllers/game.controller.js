import { v4 as uuidV4 } from "uuid";

const activeGames = {};
const cleanupTimeouts = {};
const reconnectonTime = 5 * 60 * 1000;

const createCleanup = (gameId) => {
  if (cleanupTimeouts[gameId]) {
    clearTimeout(cleanupTimeouts[gameId]);
  }
  const timeoutId = setTimeout(() => {
    console.log("deleted ", gameId);
    delete activeGames[gameId];
  }, reconnectonTime);

  cleanupTimeouts[gameId] = timeoutId;
};

const checkWin = (board, sym) => {
  // check rows
  for (let i = 0; i < 3; i++) {
    let flag = true;
    for (let j = 0; j < 3; j++) {
      if (board[i][j] !== sym) {
        flag = false;
        break;
      }
    }
    if (flag) {
      return "r" + i;
    }
  }

  // check cols
  for (let j = 0; j < 3; j++) {
    let flag = true;
    for (let i = 0; i < 3; i++) {
      if (board[i][j] !== sym) {
        flag = false;
        break;
      }
    }

    if (flag) {
      return "c" + j;
    }
  }

  // check left diagnol
  let flag = true;
  for (let i = 0; i < 3; i++) {
    if (board[i][i] !== sym) {
      flag = false;
      break;
    }
  }
  if (flag) {
    return "dl";
  }

  // check right diagnol
  flag = true;
  for (let i = 0; i < 3; i++) {
    if (board[i][2 - i] !== sym) {
      flag = false;
      break;
    }
  }

  if (flag) {
    return "dr";
  }

  return null;
};

export const createGame = (req, res) => {
  try {
    const name = req.query?.name;
    if (!name) {
      return res.json({ error: "provide a name" }).status(400);
    }
    const gameId = uuidV4();
    const game = {
      players: [name],
      symbol: { [name]: "O" },
      board: Array.from({ length: 3 }, () => new Array(3).fill(null)),
      turn: name,
    };

    activeGames[gameId] = game;

    createCleanup(gameId);
    return res.json({ gameId, game }).status(300);
  } catch (err) {
    console.error("error in /api/game/create", err.message);
    return res.json({ error: "Internal server error" }).status(500);
  }
};

export const makeMove = (req, res) => {
  try {
    let { x, y, name, gameId } = req.body;
    if (!gameId || !activeGames[gameId]) {
      return res.json({ error: "Invalid gameId" }).status(400);
    }
    x = parseInt(x);
    y = parseInt(y);

    if (
      typeof x === "undefined" ||
      typeof y == "undefined" ||
      !name ||
      x > 2 ||
      y > 2 ||
      x < 0 ||
      y < 0
    ) {
      return res.json({ error: "Invalid move" }).status(400);
    }

    const game = activeGames[gameId];
    if (game.players.length < 2) {
      return res.json({ error: "Opponent is offline" });
    }

    if (game.turn !== name) {
      return res.json({ error: "Not your turn" }).status(400);
    }

    if (game.board[x][y]) {
      return res.json({ error: "Invalid move" }).status(400);
    }

    game.board[x][y] = game.symbol[name];
    game.turn = game.players[0] === name ? game.players[1] : game.players[0];
    createCleanup(gameId);

    const winType = checkWin(game.board, game.symbol[name]);
    if (winType) {
      game.board = Array.from({ length: 3 }, () => new Array(3).fill(null));
      return res.json({ win: true, winType });
    }

    return res.json({ game });
  } catch (error) {
    console.error("error in /api/game/move", error.message);
    return res.json({ error: "Internal server error" }).status(500);
  }
};

export const joinGame = (req, res) => {
  try {
    const { name, gameId } = req.body;
    console.log(name, gameId);
    if (!name) {
      return res.json({ error: "provide a name" }).status(400);
    }

    if (!gameId || !activeGames[gameId]) {
      return res.json({ error: "Invalid gameId" }).status(400);
    }

    const game = activeGames[gameId];

    if (game.players.length === 2) {
      return res.json({ error: "Room is full" }).status(400);
    }

    let symbol = "X";
    if (game.players.length === 1) {
      const player1 = game.players[0];
      if (player1 === name) {
        return res.json({ error: "Choose a differnt name" }).status(400);
      }

      if (game.symbol[player1] === symbol) {
        symbol = "O";
      }
    }

    game.players.push(name);
    game.symbol[name] = symbol;
    createCleanup(gameId);

    return res.json({ gameId, game: activeGames[gameId] }).status(200);
  } catch (error) {
    console.error("error in /api/game/join", error.message);
    return res.json({ error: "Internal server error" }).status(500);
  }
};

export const reconnectGame = (req, res) => {
  
}