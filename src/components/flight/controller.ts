import type { Request, Response } from "express";
import { success, failure } from "../../responses";
import { flightData } from "../../service";

export const findOne = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const flightId = Number(req.params.id)
        let data = {}
        data = await flightData(flightId)

        if (data==null){
            return success({ res, status:404 ,data:{}})
        }

        return success({ res, data });
    } catch (error) {
        return failure({ res, message: "could not connect to db" });
    }
}
