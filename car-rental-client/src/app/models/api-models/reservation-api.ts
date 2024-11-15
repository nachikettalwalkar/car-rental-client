export interface ReservationAPIPost {
    start_date: string;
    end_date: string;
    price: number;
    subType: string        
}

export interface ReservationAPI {
    id: string;
    startDate: string;
    endDate: string;
    price: number;
    userId: string;
    subType: string;
    rentalOfficeId: string;
    vehicleTypeId: string;
}
