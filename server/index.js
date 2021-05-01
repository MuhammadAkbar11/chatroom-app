import dotenv from "dotenv";
import express from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "welcome to Bae Chatroom API",
  });
});

const io = new SocketServer(server, {
  cors: true,
  origins: ["http://localhost:3000"],
});

io.on("connection", socket => {
  console.log("a user connected");
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
