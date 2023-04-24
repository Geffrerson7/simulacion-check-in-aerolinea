import type { Request, Response } from "express";

export const findSimulation = (_req: Request,res: Response) => {
    res.redirect('/flights/1/passengers');
}