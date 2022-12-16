"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const roomService_1 = require("./services/room/roomService");
const apiRouter_1 = require("./apiRouter");
exports.PORT = 3000;
const app = (0, express_1.default)();
const server = new http_1.Server(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "view")));
app.get("/", (_, res) => {
    res.sendFile("/view/index.html");
});
app.use("/api", apiRouter_1.apiRouter);
io.on("connection", (socket) => {
    socket.on("room:join", (roomId) => {
        const room = (0, roomService_1.findRoom)(roomId);
        if (room) {
            (0, roomService_1.joinRoom)(room, socket);
        }
        else {
            io.emit("room:error", "Room was not found");
        }
    });
    socket.on("room:startTimer", (roomId) => {
        const room = (0, roomService_1.findRoom)(roomId);
        if (room) {
            (0, roomService_1.startRoomTimer)(room, io);
        }
        else {
            socket.emit("room:error", "Room was not found");
        }
    });
});
server.listen(exports.PORT, () => {
    console.log(`listening on ${exports.PORT}`);
});
