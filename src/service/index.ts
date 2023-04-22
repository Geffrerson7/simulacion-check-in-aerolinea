import prisma from "../datasource";
import { Seat } from "@prisma/client";
import { Passenger, FlightData } from "../interface";

export async function flightData(flightId: number): Promise<FlightData | null> {
    // Función que recibe el id del vuelo y retorna los datos del vuelo en formato CamelCase.
    const flight = await prisma.flight.findUnique({
        where: {
            flightId: flightId
        }
    });

    if (!flight) {
        return null;
    }

    const boardingPasses = await prisma.boardingPass.findMany({
        where: {
            flightId: flight.flightId
        },
        include: {
            passenger: true
        },
        orderBy: [
            {
                purchaseId: "asc"
            },
            {
                passenger: {
                    age: "asc"
                }
            }
        ]
    });

    if (boardingPasses.length === 0) {
        return null;
    }

    const data: FlightData = {
        flightId: flight.flightId,
        takeoffDateTime: flight.takeoffDateTime,
        takeoffAirport: flight.takeoffAirport,
        landingDateTime: flight.landingDateTime,
        landingAirport: flight.landingAirport,
        airplaneId: flight.airplaneId,
        passengers: []
    };

    for (const boardingPass of boardingPasses) {
        const passenger = boardingPass.passenger;
        data.passengers.push({
            passengerId: passenger.passenger_id,
            dni: parseInt(passenger.dni),
            name: passenger.name,
            age: passenger.age,
            country: passenger.country,
            boardingPassId: boardingPass.boardingPassId,
            purchaseId: boardingPass.purchaseId,
            seatTypeId: boardingPass.seatTypeId,
            seatId: boardingPass.seatId
        });
    }

    return data;
}

export async function seatsList(): Promise<Seat[]> {
    // Función que devuelve una lista de todas las sillas ordenadas por id
    const seatsList = await prisma.seat.findMany({
        orderBy: {
            seatId: 'asc',
        },
    });
    return seatsList;
}

export function occupied_seats_id(passengers_list: Passenger[]): number[] {
    /** 
     * Función que recibe una lista de datos de pasajeros de un vuelo y 
     * retorna la lista de id de asientos ocupados.
     */
    const occupied_seats_id: number[] = [];

    for (const passenger of passengers_list) {
        if (passenger.seatId !== null) {
            occupied_seats_id.push(passenger.seatId);
        }
    }

    return occupied_seats_id;
}

export async function list_of_available_seat_type_ids(seat_type_id: number, flight_data: FlightData) {
    //Función que recibe el id de tipo de aiento y los datos del vuelo y retorna los id de los asientos disponibles por clase.
    const seats = await prisma.seat.findMany({
        where: {
            airplaneId: flight_data.airplaneId,
            seatTypeId: seat_type_id,
        },
    })

    if (!seats) {
        return null
    }

    const seat_type_id_list = seats.map((seat) => seat.seatId)
    const occupied_seat_id_list = occupied_seats_id(flight_data.passengers)
    const seat_available_type_id_list = seat_type_id_list.filter((seatId) => !occupied_seat_id_list.includes(seatId))

    return seat_available_type_id_list
}   