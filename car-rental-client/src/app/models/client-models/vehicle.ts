import { VehicleAPI } from "../api-models/vehicle-api";

export interface Vehicle {
    id: string;
    name: string;
    description: string;
    price: number;
    rentalOfficeId: string;
    vehicleTypeId: string;
    licensePlateNo: string;
    subType: string;
    image: string;
}

export function parseVehicle(vehicle: VehicleAPI, vehicleTypeName: string): Vehicle {
    return {...vehicle, 
        image: "/assets/images/" + vehicleTypeName.toLowerCase()
                + '_' + vehicle.subType.toLowerCase() + '.jpg'
    }
}
