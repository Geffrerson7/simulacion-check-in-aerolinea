"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passenger = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("./database.config"));
class Passenger extends sequelize_1.Model {
}
exports.Passenger = Passenger;
Passenger.init({
    passengerId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'passenger_id'
    },
    dni: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    name: sequelize_1.DataTypes.STRING,
    age: sequelize_1.DataTypes.INTEGER,
    country: sequelize_1.DataTypes.STRING
}, {
    sequelize: database_config_1.default,
    tableName: 'passenger'
});
// Passenger.hasMany(BoardingPass, {
//   foreignKey: 'passenger'
// });
// BoardingPass.belongsTo(Passenger, {
//   foreignKey: 'passenger',
//   as: 'Passenger'
// })
// class Purchase extends Model { }
// Purchase.init({
//   purchaseId: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     field: 'purchase_id'
//   },
//   purchaseDate: {
//     type: DataTypes.INTEGER,
//     field: 'purchase_date'
//   }
// }, {
//   sequelize,
//   modelName: 'Purchase',
//   tableName: 'purchase'
// });
// class Seat extends Model { }
// Seat.init({
//   seatId: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     field: 'seat_id'
//   },
//   seatColumn: {
//     type: DataTypes.STRING,
//     field: 'seat_column'
//   },
//   seatRow: {
//     type: DataTypes.INTEGER,
//     field: 'seat_row'
//   },
//   seatTypeId: {
//     type: DataTypes.INTEGER,
//     field: 'seat_type_id'
//   },
//   airplaneId: {
//     type: DataTypes.INTEGER,
//     field: 'airplane_id'
//   }
// }, {
//   sequelize,
//   modelName: 'Seat',
//   tableName: 'seat'
// });
// class SeatType extends Model { }
// SeatType.init({
//   seatTypeId: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     field: 'seat_type_id'
//   },
//   name: DataTypes.STRING
// }, {
//   sequelize,
//   modelName: 'SeatType',
//   tableName: 'seat_type'
// });
// class Airplane extends Model { }
// Airplane.init({
//   airplaneId: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     field: 'airplane_id'
//   },
//   name: DataTypes.STRING
// }, {
//   sequelize,
//   modelName: 'Airplane',
//   tableName: 'airplane'
// });
// class Flight extends Model { }
// Flight.init({
//   flightId: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     field: 'flight_id'
//   },
//   takeoffDateTime: {
//     type: DataTypes.INTEGER,
//     field: 'takeoff_date_time'
//   },
//   takeoffAirport: {
//     type: DataTypes.STRING,
//     field: 'takeoff_airport'
//   },
//   landingDateTime: {
//     type: DataTypes.INTEGER,
//     field: 'landing_date_time'
//   },
//   landingAirport: {
//     type: DataTypes.STRING,
//     field: 'landing_airport'
//   },
//   airplaneId: {
//     type: DataTypes.INTEGER,
//     field: 'airplane_id'
//   }
// }, {
//   sequelize,
//   modelName: 'Flight',
//   tableName: 'flight'
// });
// class BoardingPass extends Model { }
// BoardingPass.init({
//   boardingPassId: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     field: 'boarding_pass_id'
//   },
//   passengerId: {
//     type: DataTypes.INTEGER,
//     field: 'passenger_id'
//   },
//   purchaseId: {
//     type: DataTypes.INTEGER,
//     field: 'purchase_id'
//   },
//   seatTypeId: {
//     type: DataTypes.INTEGER,
//     field: 'seat_type_id'
//   },
//   seatId: {
//     type: DataTypes.INTEGER,
//     field: 'seat_id'
//   },
//   flightId: {
//     type: DataTypes.INTEGER,
//     field: 'flight_id'
//   },
// });
