"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = void 0;
const responses_1 = require("../../responses");
const service_1 = require("../../service");
const findOne = async (req, res) => {
    try {
        const flightId = Number(req.params.id);
        const data = await (0, service_1.seats_distribution)(flightId);
        if (data == null) {
            return (0, responses_1.success)({ res, status: 404, data: {} });
        }
        return (0, responses_1.success)({ res, data });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: "could not connect to db" });
    }
};
exports.findOne = findOne;
