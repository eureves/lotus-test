import { Router } from "express";
import { getRooms } from "./services/room/roomService";

export const apiRouter = Router({});

apiRouter.get("/rooms", (_, res) => {
  res.json(getRooms());
});
