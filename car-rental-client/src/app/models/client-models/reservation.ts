import { ReservationAPI, ReservationAPIPost } from "../api-models/reservation-api";

export interface Reservation {
    id: string;
    startDate: string;
    endDate: string;
    price: number;
    userId: string;
    subType: string;
    rentalOfficeId: string;
    vehicleTypeId: string;
}

export function parseReservation(reservation: ReservationAPI[]): Reservation[] {
    return [
        ...reservation,
    ]
}