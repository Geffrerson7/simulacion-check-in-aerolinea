"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardingPass = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../../database/database.config"));
class BoardingPass extends sequelize_1.Model {
}
exports.BoardingPass = BoardingPass;
BoardingPass.init({
    boardingPassId: {
        type: sequelize_1.DataTypes.UUIDV4,
        autoIncrement: true,
        primaryKey: true,
        field: 'boarding_pass_id'
    },
    passengerId: {
        type: sequelize_1.DataTypes.UUIDV4,
        field: 'passenger_id'
    },
}, {
    sequelize: database_config_1.default,
    tableName: 'boarding_pass'
});
