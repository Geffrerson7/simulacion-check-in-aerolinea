import prisma from "../datasource";

export async function flightData(flightId: number): Promise<Record<string, any> | null> {
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

    const data: Record<string, any> = {
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

