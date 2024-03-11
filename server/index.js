import express from "express";
import { server, app } from "./socket.js";
import gameRoutes from "./routes/game.routes..js";

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.json({ active: true }).status(200);
});

app.use(express.json());
app.use("/api/game", gameRoutes);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
