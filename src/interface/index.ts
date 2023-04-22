export interface FlightData {
    flightId: number;
    takeoffDateTime: number;
    takeoffAirport: string;
    landingDateTime: number;
    landingAirport: string;
    airplaneId: number;
    passengers: Passenger[];
}

export interface Passenger {
    passengerId: number;
    dni: number;
    name: string;
    age: number;
    country: string;
    boardingPassId: number;
    purchaseId: number;
    seatTypeId: number;
    seatId: number | null;
}
