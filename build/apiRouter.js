"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const roomService_1 = require("./services/room/roomService");
exports.apiRouter = (0, express_1.Router)({});
exports.apiRouter.get("/rooms", (_, res) => {
    res.json((0, roomService_1.getRooms)());
});
