import { Server, Socket } from "socket.io";

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
  timerId: NodeJS.Timer | undefined;
  timer: number;
  currentTime: number;
  bidders: Bidder[];
  currentBidder: number;
};

const rooms: Room[] = [
  {
    id: "1",
    timerId: undefined,
    timer: 120,
    currentTime: 120,
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
  {
    id: "2",
    timerId: undefined,
    timer: 120,
    currentTime: 120,
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

export const getRooms = () => {
  return rooms;
};

export const findRoom = (roomId: string) => {
  return rooms.find((room) => room.id === roomId);
};

export const joinRoom = (room: Room, socket: Socket) => {
  socket.join(room.id);

  socket.emit("room:bidders", room.bidders);
  socket.emit("room:currentBidder", room.currentBidder);
};

export const startRoomTimer = (room: Room, io: Server) => {
  clearInterval(room.timerId);
  room.timerId = setInterval(() => {
    room.currentTime--;

    if (room.currentTime < 0) {
      room.currentTime = room.timer;

      if (room.currentBidder + 1 > room.bidders.length - 1) {
        room.currentBidder = 0;
      } else {
        room.currentBidder++;
      }
      io.to(room.id).emit("room:currentBidder", room.currentBidder);
    }
    io.to(room.id).emit("room:timerUpdate", room.currentTime);
  }, 1000);
};
