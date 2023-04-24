import type { Request, Response } from "express";
import { success, failure } from "../../responses";
import { seats_distribution } from "../../service";
import { FlightData } from "../../interface";

export const findOne = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const flightId = Number(req.params.id)

        const data: FlightData = await seats_distribution(flightId)

        if (data == null) {
            return success({ res, status: 404, data: {} })
        }

        return success({ res, data });
    } catch (error) {
        console.log(error)
        return failure({ res, message: "could not connect to db" });
    }
}
