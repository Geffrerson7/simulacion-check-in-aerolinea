"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupSeatsByTypeAndRow = void 0;
function groupSeatsByTypeAndRow(seatTypes) {
    if (!Array.isArray(seatTypes)) {
        throw new Error('groupSeatsByTypeAndRow: seatTypes is not an array');
    }
    const seatGroups = {};
    for (const seatType of seatTypes) {
        const typeName = seatType.name;
        if (!seatGroups[typeName]) {
            seatGroups[typeName] = {};
        }
        for (const seat of seatType.seats) {
            const seatRow = seat.seatRow.toString();
            if (!seatGroups[typeName][seatRow]) {
                seatGroups[typeName][seatRow] = [];
            }
            seatGroups[typeName][seatRow].push(seat);
        }
    }
    return seatGroups;
}
exports.groupSeatsByTypeAndRow = groupSeatsByTypeAndRow;
