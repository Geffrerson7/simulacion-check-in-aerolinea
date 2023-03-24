import { Router } from "express";
import * as Controller from "./controller";

const flightRouter = Router();

flightRouter.get("/:id/:passengers", Controller.findOne)

export default flightRouter;