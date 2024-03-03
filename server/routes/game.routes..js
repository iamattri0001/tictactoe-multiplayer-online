import express from "express";
import {
  createGame,
  joinGame,
  makeMove,
} from "../controllers/game.controller.js";

const router = express.Router();

router.get("/create", createGame);
router.get("/move/:gameId", makeMove);
router.get("/join/:gameId", joinGame);

export default router;
