import prisma from "../datasource";
import { Seat } from "@prisma/client";
import { Passenger, FlightData } from "../interface";
import {retry} from "ts-retry-promise"

export async function flight_data(flightId: number): Promise<FlightData | null> {
    // Función que recibe el id del vuelo y retorna los datos del vuelo en formato CamelCase.
    const flight = await retry(() => prisma.flight.findUnique({
        where: {
            flightId: flightId
        }
    }));

    if (!flight) {
        return null;
    }

    const boardingPasses = await retry(() => prisma.boardingPass.findMany({
        where: {
            flightId: flight.flightId
        },
        include: {
            passenger: true
        },
        orderBy: [
            {
                seatTypeId: "asc"
            },
            {
                seatId: "asc"
            },
        ]
    }));

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
            passengerId: passenger.passengerId,
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

export async function seats_list(): Promise<Seat[]> {
    // Función que devuelve una lista de todas las sillas ordenadas por id
    const seatsList = await retry(()=> prisma.seat.findMany({
        orderBy: {
            seatId: 'asc',
        },
    }));
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

export async function list_of_available_seat_type_ids(seat_type_id: number, flight_data: FlightData): Promise<number[]> {
    //Función que recibe el id de tipo de aiento y los datos del vuelo y retorna los id de los asientos disponibles por clase.
    const seats = await retry(() => prisma.seat.findMany({
        where: {
            airplaneId: flight_data.airplaneId,
            seatTypeId: seat_type_id,
        },
    }));

    if (!seats) {
        return null
    }

    const seat_type_id_list = seats.map((seat) => seat.seatId)
    const occupied_seat_id_list = occupied_seats_id(flight_data.passengers)
    const seat_available_type_id_list = seat_type_id_list.filter((seatId) => !occupied_seat_id_list.includes(seatId))

    return seat_available_type_id_list
}

export function left_seat_id(seat_id: number, seats_list: Seat[]): number {
    //Función que recibe el id de un asiento y una lista de total de asientos y retorna el id del asiento de la izquierda.
    const seat_x: Seat = seats_list.find(seat => seat.seatId === seat_id);
    let left_seat_id = null
    for (const seat of seats_list) {
        if (
            seat.seatColumn === String.fromCharCode(seat_x.seatColumn.charCodeAt(0) - 1)
            && seat.seatRow === seat_x.seatRow
            && seat.airplaneId === seat_x.airplaneId
        ) {
            left_seat_id = seat.seatId;
            break;
        }
    }
    return left_seat_id
}

export function right_seat_id(seat_id: number, seats_list: Seat[]): number {
    //Función que recibe el id de un asiento y una lista de total de asientos y retorna el id del asiento de la derecha.
    const seat_x: Seat = seats_list.find(seat => seat.seatId === seat_id);
    let right_seat_id = null
    for (const seat of seats_list) {
        if (
            seat.seatColumn === String.fromCharCode(seat_x.seatColumn.charCodeAt(0) + 1)
            && seat.seatRow === seat_x.seatRow
            && seat.airplaneId === seat_x.airplaneId
        ) {
            right_seat_id = seat.seatId;
            break;
        }
    }
    return right_seat_id
}

export function front_seat_id(seat_id: number, seats_list: Seat[]): number {
    //Función que recibe el id de un asiento y una lista de total de asientos y retorna el id del asiento del frente.
    const seat_x: Seat = seats_list.find(seat => seat.seatId === seat_id);
    let front_seat_id = null
    for (const seat of seats_list) {
        if (
            seat.seatColumn === seat_x.seatColumn
            && seat.seatRow === seat_x.seatRow - 1
            && seat.airplaneId === seat_x.airplaneId
        ) {
            front_seat_id = seat.seatId;
            break;
        }
    }
    return front_seat_id
}

export function back_seat_id(seat_id: number, seats_list: Seat[]): number {
    //Función que recibe el id de un asiento y una lista de total de asientos y retorna el id del asiento trasero.
    const seat_x: Seat = seats_list.find(seat => seat.seatId === seat_id);
    let back_seat_id = null
    for (const seat of seats_list) {
        if (
            seat.seatColumn === seat_x.seatColumn
            && seat.seatRow === seat_x.seatRow + 1
            && seat.airplaneId === seat_x.airplaneId
        ) {
            back_seat_id = seat.seatId;
            break;
        }
    }
    return back_seat_id
}

export function northeast_seat_id(seat_id: number, seats_list: Seat[]): number {
    //Función que recibe el id de un asiento y una lista de total de asientos y retorna el id del asiento del noreste.
    const seat_x: Seat = seats_list.find(seat => seat.seatId === seat_id);
    let northeast_seat_id = null
    for (const seat of seats_list) {
        if (
            seat.seatColumn === String.fromCharCode(seat_x.seatColumn.charCodeAt(0) + 1)
            && seat.seatRow === seat_x.seatRow - 1
            && seat.airplaneId === seat_x.airplaneId
        ) {
            northeast_seat_id = seat.seatId;
            break;
        }
    }
    return northeast_seat_id
}

export function southeast_seat_id(seat_id: number, seats_list: Seat[]): number {
    //Función que recibe el id de un asiento y una lista de total de asientos y retorna el id del asiento del sureste.
    const seat_x: Seat = seats_list.find(seat => seat.seatId === seat_id);
    let southeast_seat_id = null
    for (const seat of seats_list) {
        if (
            seat.seatColumn === String.fromCharCode(seat_x.seatColumn.charCodeAt(0) + 1)
            && seat.seatRow === seat_x.seatRow + 1
            && seat.airplaneId === seat_x.airplaneId
        ) {
            southeast_seat_id = seat.seatId;
            break;
        }
    }
    return southeast_seat_id
}

export function northwest_seat_id(seat_id: number, seats_list: Seat[]): number {
    //Función que recibe el id de un asiento y una lista de total de asientos y retorna el id del asiento del noroeste.
    const seat_x: Seat = seats_list.find(seat => seat.seatId === seat_id);
    let northwest_seat_id = null
    for (const seat of seats_list) {
        if (
            seat.seatColumn === String.fromCharCode(seat_x.seatColumn.charCodeAt(0) - 1)
            && seat.seatRow === seat_x.seatRow - 1
            && seat.airplaneId === seat_x.airplaneId
        ) {
            northwest_seat_id = seat.seatId;
            break;
        }
    }
    return northwest_seat_id
}

export function southwest_seat_id(seat_id: number, seats_list: Seat[]): number {
    //Función que recibe el id de un asiento y una lista de total de asientos y retorna el id del asiento del suroeste.
    const seat_x: Seat = seats_list.find(seat => seat.seatId === seat_id);
    let southwest_seat_id = null
    for (const seat of seats_list) {
        if (
            seat.seatColumn === String.fromCharCode(seat_x.seatColumn.charCodeAt(0) - 1)
            && seat.seatRow === seat_x.seatRow + 1
            && seat.airplaneId === seat_x.airplaneId
        ) {
            southwest_seat_id = seat.seatId;
            break;
        }
    }
    return southwest_seat_id
}

export async function seats_distribution(flightId: number): Promise<FlightData | null> {
    //Función que recibe el id de un vuelo y retorna los mismos datos pero con asientos asignados a cada pasajero
    let data: FlightData = await flight_data(flightId)

    if (!data) {
        return null
    }
    let seats_data = await seats_list() //Lista de datos de todos los asientos

    let first_class = await list_of_available_seat_type_ids(1, data)  // Lista de ids de asientos de primera clase

    let premiun_economic_class = await list_of_available_seat_type_ids(2, data)  // Lista de ids de asientos de clase económica premiun

    let economic_class = await list_of_available_seat_type_ids(3, data) // Lista de ids de asientos de clase económica
    //console.log(economic_class)

    let available_seats_ids = {
        1: first_class,
        2: premiun_economic_class,
        3: economic_class,
    }

    let list_of_empty_seat_ids: number[] = []
    let passengers: Passenger[] = data["passengers"]

    // Distribución de asientos para los menores de edad
    for (const passenger of passengers) {

        list_of_empty_seat_ids = available_seats_ids[passenger["seatTypeId"]]

        let assigned: boolean = false

        if (passenger["age"] < 18 && passenger["seatId"] == null) {

            const companions: Passenger[] = passengers.filter((companion) =>
                companion.purchaseId === passenger["purchaseId"] &&
                companion.seatId === null &&
                companion.passengerId !== passenger["passengerId"] &&
                companion.age >= 18
            );

            for (const companion of companions) {
                if (passengers[passengers.indexOf(companion)]["seatId"] == null) {

                    for (const seat_id of list_of_empty_seat_ids) {
                        const x_left_seat_id = left_seat_id(seat_id, seats_data)
                        const x_right_seat_id = right_seat_id(seat_id, seats_data)

                        if (x_left_seat_id != null &&
                            list_of_empty_seat_ids.indexOf(x_left_seat_id) != -1) {
                            if (passenger["seatId"] === null) {
                                passenger["seatId"] = seat_id
                                list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(seat_id), 1);
                            }

                            passengers[passengers.indexOf(companion)]["seatId"] = x_left_seat_id

                            list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(x_left_seat_id), 1);

                            assigned = true

                        }
                        else if (x_right_seat_id != null &&
                            list_of_empty_seat_ids.indexOf(x_right_seat_id) != -1) {

                            if (passenger["seatId"] == null) {
                                passenger["seatId"] = seat_id
                                list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(seat_id), 1);
                            }

                            passengers[passengers.indexOf(companion)]["seatId"] = x_right_seat_id

                            list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(x_right_seat_id), 1);

                            assigned = true
                        }

                        if (assigned == true) {
                            break
                        }
                    }
                }
                available_seats_ids[passenger["seatTypeId"]] = list_of_empty_seat_ids
            }
        }
    }

    // Distribución de asientos para adultos que tienen el mismo purchase id
    for (const passenger of passengers) {
        list_of_empty_seat_ids = available_seats_ids[passenger["seatTypeId"]]

        let assigned: boolean = false

        if (passenger["age"] >= 18 && passenger["seatId"] == null) {

            const companions: Passenger[] = passengers.filter((companion) =>
                companion.purchaseId === passenger["purchaseId"] &&
                companion.seatId === null &&
                companion.passengerId !== passenger["passengerId"]
            );

            if (companions) {
                for (const companion of companions) {
                    if (passengers[passengers.indexOf(companion)]["seatId"] == null) {
                        for (const seat_id of list_of_empty_seat_ids) {
                            const x_left_seat_id = left_seat_id(seat_id, seats_data)
                            const x_right_seat_id = right_seat_id(seat_id, seats_data)
                            const x_front_seat_id = front_seat_id(seat_id, seats_data)
                            const x_back_seat_id = back_seat_id(seat_id, seats_data)
                            const x_northeast_seat_id = northeast_seat_id(seat_id, seats_data)
                            const x_southeast_seat_id = southeast_seat_id(seat_id, seats_data)
                            const x_northwest_seat_id = northwest_seat_id(seat_id, seats_data)
                            const x_southwest_seat_id = southwest_seat_id(seat_id, seats_data)

                            if (x_left_seat_id != null &&
                                list_of_empty_seat_ids.indexOf(x_left_seat_id) != -1) {
                                if (passenger["seatId"] === null) {
                                    passenger["seatId"] = seat_id
                                    list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(seat_id), 1);
                                }

                                passengers[passengers.indexOf(companion)]["seatId"] = x_left_seat_id

                                list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(x_left_seat_id), 1);

                                assigned = true

                            }

                            else if (x_right_seat_id != null &&
                                list_of_empty_seat_ids.indexOf(x_right_seat_id) != -1) {

                                if (passenger["seatId"] == null) {
                                    passenger["seatId"] = seat_id
                                    list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(seat_id), 1);
                                }

                                passengers[passengers.indexOf(companion)]["seatId"] = x_right_seat_id

                                list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(x_right_seat_id), 1);

                                assigned = true

                            }

                            else if (x_front_seat_id != null &&
                                list_of_empty_seat_ids.indexOf(x_front_seat_id) != -1) {

                                if (passenger["seatId"] == null) {
                                    passenger["seatId"] = seat_id
                                    list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(seat_id), 1);
                                }

                                passengers[passengers.indexOf(companion)]["seatId"] = x_front_seat_id

                                list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(x_front_seat_id), 1);

                                assigned = true
                            }

                            else if (x_back_seat_id != null &&
                                list_of_empty_seat_ids.indexOf(x_back_seat_id) != -1) {

                                if (passenger["seatId"] == null) {
                                    passenger["seatId"] = seat_id
                                    list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(seat_id), 1);
                                }

                                passengers[passengers.indexOf(companion)]["seatId"] = x_back_seat_id

                                list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(x_back_seat_id), 1);

                                assigned = true
                            }

                            else if (x_northeast_seat_id != null &&
                                list_of_empty_seat_ids.indexOf(x_northeast_seat_id) != -1) {

                                if (passenger["seatId"] == null) {
                                    passenger["seatId"] = seat_id
                                    list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(seat_id), 1);
                                }

                                passengers[passengers.indexOf(companion)]["seatId"] = x_northeast_seat_id

                                list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(x_northeast_seat_id), 1);

                                assigned = true
                            }

                            else if (x_southeast_seat_id != null &&
                                list_of_empty_seat_ids.indexOf(x_southeast_seat_id) != -1) {

                                if (passenger["seatId"] == null) {
                                    passenger["seatId"] = seat_id
                                    list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(seat_id), 1);
                                }

                                passengers[passengers.indexOf(companion)]["seatId"] = x_southeast_seat_id

                                list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(x_southeast_seat_id), 1);

                                assigned = true
                            }

                            else if (x_northwest_seat_id != null &&
                                list_of_empty_seat_ids.indexOf(x_northwest_seat_id) != -1) {

                                if (passenger["seatId"] == null) {
                                    passenger["seatId"] = seat_id
                                    list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(seat_id), 1);
                                }

                                passengers[passengers.indexOf(companion)]["seatId"] = x_northwest_seat_id

                                list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(x_northwest_seat_id), 1);

                                assigned = true
                            }

                            else if (x_southwest_seat_id != null &&
                                list_of_empty_seat_ids.indexOf(x_southwest_seat_id) != -1) {

                                if (passenger["seatId"] == null) {
                                    passenger["seatId"] = seat_id
                                    list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(seat_id), 1);
                                }

                                passengers[passengers.indexOf(companion)]["seatId"] = x_southwest_seat_id

                                list_of_empty_seat_ids.splice(list_of_empty_seat_ids.indexOf(x_southwest_seat_id), 1);

                                assigned = true
                            }

                            if (assigned == true) {
                                break
                            }
                        }
                    }
                    available_seats_ids[passenger["seatTypeId"]] = list_of_empty_seat_ids
                }
            }

        }
    }

    //Distribución de asientos para los pasajeros restantes
    for (const passenger of passengers) {
        list_of_empty_seat_ids = available_seats_ids[passenger["seatTypeId"]]
        if (passenger["seatId"] == null) {
            passenger["seatId"] = list_of_empty_seat_ids[0]
            list_of_empty_seat_ids.splice(0, 1)
            available_seats_ids[passenger["seatTypeId"]] = list_of_empty_seat_ids
        }
    }

    data["passengers"] = passengers

    return data
}