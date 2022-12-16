import express from "express";
import cors from "cors";
import path from "path";
import { Server } from "http";
import { Server as ioServer } from "socket.io";
import {
  findRoom,
  joinRoom,
  startRoomTimer,
} from "./services/room/roomService";
import { apiRouter } from "./apiRouter";

export const PORT = 3000;

const app = express();
const server = new Server(app);
const io = new ioServer(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.static(path.join(__dirname, "view")));

app.get("/", (_, res) => {
  res.sendFile("/view/index.html");
});

app.use("/api", apiRouter);

io.on("connection", (socket) => {
  socket.on("room:join", (roomId) => {
    const room = findRoom(roomId);
    if (room) {
      joinRoom(room, socket);
    } else {
      io.emit("room:error", "Room was not found");
    }
  });

  socket.on("room:startTimer", (roomId) => {
    const room = findRoom(roomId);
    if (room) {
      startRoomTimer(room, io);
    } else {
      socket.emit("room:error", "Room was not found");
    }
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
