"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startRoomTimer = exports.joinRoom = exports.findRoom = exports.getRooms = void 0;
const rooms = [
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
const getRooms = () => {
    return rooms;
};
exports.getRooms = getRooms;
const findRoom = (roomId) => {
    return rooms.find((room) => room.id === roomId);
};
exports.findRoom = findRoom;
const joinRoom = (room, socket) => {
    socket.join(room.id);
    socket.emit("room:bidders", room.bidders);
    socket.emit("room:currentBidder", room.currentBidder);
};
exports.joinRoom = joinRoom;
const startRoomTimer = (room, io) => {
    clearInterval(room.timerId);
    room.timerId = setInterval(() => {
        room.currentTime--;
        if (room.currentTime < 0) {
            room.currentTime = room.timer;
            if (room.currentBidder + 1 > room.bidders.length - 1) {
                room.currentBidder = 0;
            }
            else {
                room.currentBidder++;
            }
            io.to(room.id).emit("room:currentBidder", room.currentBidder);
        }
        io.to(room.id).emit("room:timerUpdate", room.currentTime);
    }, 1000);
};
exports.startRoomTimer = startRoomTimer;
