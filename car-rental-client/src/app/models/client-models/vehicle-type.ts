import { VehicleTypeAPI } from "../api-models/vehicle-type-api";
import { VEHICLE_TYPE } from "../enums/vehicleType";

export interface VehicleType {
    id: string;
    type: VEHICLE_TYPE;
}

export function parseVehicleType(vehicleType: VehicleTypeAPI[]): VehicleType[] {
    return [
        ...vehicleType,
    ]
}
