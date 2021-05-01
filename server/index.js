import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import connectDB from "./configs/database.js";
import { addUser, removeUser, getUser } from "./helper.js";
import RoomModel from "./models/Room.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

connectDB();

const app = express();
const server = http.createServer(app);

app.get("/api", (req, res) => {
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
  console.log("a user connected", socket.id);

  socket.on("create-room", async newRoom => {
    // console.log(room, "server");
    try {
      const room = new RoomModel({ name: newRoom });
      const result = await room.save();
      io.emit("room-creted", result);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("join", ({ name, room_id, user_id }) => {
    const { error, user } = addUser({
      socket_id: socket.id,
      name,
      room_id,
      user_id,
    });

    socket.join(room_id);

    if (error) {
      console.log("error :", error);
      return;
    }

    console.log("Join success", user);
  });

  socket.on("send-message", ({ message, room_id }, callback) => {
    const user = getUser(socket.id);
    const msgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: message,
    };

    console.log(msgToStore, "<==  Message");
    io.to(room_id).emit("message", msgToStore);
    callback && callback();
    socket.on("disconnect", () => {
      const user = removeUser(socket.id);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
