"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize(process.env.NAME_DB, process.env.USER_DB, process.env.PASS_DB, {
    host: process.env.HOST_DB,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 5000
    }
});
exports.default = db;
