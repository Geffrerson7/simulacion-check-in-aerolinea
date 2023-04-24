"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failure = exports.success = void 0;
function success({ res, status = 200, data, message }) {
    return res.status(status).json({
        code: status,
        data,
        message,
    });
}
exports.success = success;
function failure({ res, status = 400, message }) {
    return res.status(status).json({
        code: status,
        errors: message,
    });
}
exports.failure = failure;
