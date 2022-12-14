import express from "express";
import { Server } from "http";
import { Server as ioServer, Socket } from "socket.io";

type Bidder = {
  id: string;
  hisTurn: boolean;
  parameters: string;
  boostStandards: boolean;
  timeToExecute: number;
  warranty: number;
  payment: number;
  price: number;
};

type Room = {
  id: string;
  counter: number;
  timerId: NodeJS.Timer | undefined;
  currentTime: number;
  bidders: Bidder[];
  currentBidder: number;
};

const PORT = 8080;
const rooms: Room[] = [
  {
    id: "1",
    counter: 0,
    timerId: undefined,
    currentTime: 10,
    currentBidder: 0,
    bidders: [
      {
        id: "1",
        hisTurn: false,
        parameters: "User 1",
        boostStandards: false,
        timeToExecute: 80,
        warranty: 24,
        payment: 30,
        price: 3700000,
      },
      {
        id: "2",
        hisTurn: false,
        parameters: "User 2",
        boostStandards: false,
        timeToExecute: 50,
        warranty: 26,
        payment: 40,
        price: 5700000,
      },
    ],
  },
];

const app = express();
const server = new Server(app);
const io = new ioServer(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  console.log("get /");
  res.send("welcome");
});

io.on("connection", (socket) => {
  socket.on("room:join", (roomId) => {
    console.log(`connecting to ${roomId}`);

    const room = rooms.find((room) => room.id === roomId);

    if (room) {
      socket.join(room.id);

      socket.emit("room:bidders", room.bidders);
      socket.emit("room:currentBidder", room.currentBidder);
    } else {
      io.emit("room:error", "Room was not found");
    }
  });

  socket.on("room:startTimer", (roomId) => {
    const room = rooms.find((room) => room.id === roomId);

    if (room) {
      room.timerId = setInterval(() => {
        room.currentTime--;

        if (room.currentTime < 0) {
          room.currentTime = 10;

          if (room.currentBidder + 1 > room.bidders.length - 1) {
            room.currentBidder = 0;
          } else {
            room.currentBidder++;
          }
          io.sockets.in(room.id).emit("room:currentBidder", room.currentBidder);
        }
        io.sockets.in(room.id).emit("timerUpdate", room.currentTime);
      }, 1000);
    } else {
      io.in(socket.id).emit("room:error", "Room was not found");
    }
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
