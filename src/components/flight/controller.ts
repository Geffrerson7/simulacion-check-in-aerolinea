import type { Request, Response } from "express";
import { success, failure } from "../../responses";
import prisma from "../../datasource";

export const findOne = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id = Number(req.params.id)
        
        const flight = await prisma.flight.findUnique({ 
            where: { flightId:id }, 
            include:{boardingPasses:true}
            });

        if (!flight){
            return success({ res, status:404, data: {}});
        }
        
        return success({ res, data: flight});
    } catch (error) {
        return failure({ res, message: "could not connect to db" });
    }
}
