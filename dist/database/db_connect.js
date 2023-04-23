"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const { configDb } = require('./config_db');
exports.sequelize = new sequelize_1.Sequelize(configDb.database, configDb.username, configDb.password, {
    host: configDb.host,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 5000
    }
});
