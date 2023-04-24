import { Router } from "express";
import * as Controller from "./controller";

const redirectRouter = Router();

redirectRouter.get("/", Controller.findSimulation)

export default redirectRouter;