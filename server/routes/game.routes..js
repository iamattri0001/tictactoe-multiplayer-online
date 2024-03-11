import express from "express";
import {
  createGame,
  joinGame,
  makeMove,
  reconnectGame,
} from "../controllers/game.controller.js";

const router = express.Router();

router.get("/create", createGame);
router.post("/move", makeMove);
router.post("/join", joinGame);
router.post("/reconnect", reconnectGame);

export default router;
