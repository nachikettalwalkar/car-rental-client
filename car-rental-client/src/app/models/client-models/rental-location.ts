import { RentalLocationAPI } from "../api-models/rental-location-api";

export interface RentalLocation {
    id: string,
    city: string
}

export function parseRentalLocation(rentalLocation: RentalLocationAPI[]): RentalLocation[] {
    return [
        ...rentalLocation,
    ]
}
