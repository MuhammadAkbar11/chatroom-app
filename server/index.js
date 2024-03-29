import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import connectDB from "./configs/database.js";
import { addUser, removeUser, getUser } from "./helper.js";
import { errorHandlerMiddleware } from "./middleware/error.middleware.js";
import MessageModel from "./models/Message.js";
import RoomModel from "./models/Room.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

connectDB();

const app = express();
const server = http.createServer(app);

const io = new SocketServer(server, {
  cors: true,
  origins: ["http://localhost:3000"],
});

import authRoutes from "./routes/authRoutes.js";

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).json({
    status: true,
    message: "welcome to Bae Chatroom API",
  });
});

app.use("/api/auth", authRoutes);
app.use(errorHandlerMiddleware);

io.on("connection", socket => {
  console.log("a user connected", socket.id);

  // socket.on("load-room-messages", ({ room_id }, callback) => {
  //   MessageModel.find({
  //     room_id,
  //   })
  //     .then(msgs => {
  //       callback && callback(msgs);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // });

  RoomModel.find()
    .then(result => {
      socket.emit("output-rooms", result);
    })
    .catch(err => console.log(err));

  socket.on("create-room", data => {
    const room = new RoomModel({
      name: data.room,
      admin: [data.user_id],
      creator: data.user_id,
    });
    return room
      .save()
      .then(result => {
        io.emit("room-created", result);
      })
      .catch(error => {
        console.log(error);
      });
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

    const msgModel = new MessageModel(msgToStore);

    msgModel
      .save()
      .then(result => {
        io.to(room_id).emit("message", result);
        callback && callback();
      })
      .catch(err => console.log(err));

    socket.on("disconnect", () => {
      const user = removeUser(socket.id);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
