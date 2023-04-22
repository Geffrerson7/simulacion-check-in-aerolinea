import type { Request, Response } from "express";
import { success, failure } from "../../responses";
import { flightData } from "../../service";
import { FlightData } from "../../interface";

export const findOne = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const flightId = Number(req.params.id)

        const data: FlightData = await flightData(flightId)

        if (data == null) {
            return success({ res, status: 404, data: {} })
        }

        return success({ res, data });
    } catch (error) {
        return failure({ res, message: "could not connect to db" });
    }
}
