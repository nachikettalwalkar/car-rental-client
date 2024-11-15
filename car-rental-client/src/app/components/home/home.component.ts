import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, concatMap, map, Observable, of } from 'rxjs';
import { RentalLocation } from 'src/app/models/client-models/rental-location';
import { VehicleType } from 'src/app/models/client-models/vehicle-type';
import { LocationService } from 'src/app/services/location.service';
import { VehicleTypeService } from 'src/app/services/vehicle-type.service';
import { FilterSelection } from '../../models/client-models/filter-selection';
import { Vehicle } from '../..//models/client-models/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { ReservationService } from '../../services/reservation.service';
import { ReservationAPIPost } from '../../models/api-models/reservation-api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //Location data
  public locationData$!: Observable<RentalLocation[] | null>;
  public locationData: RentalLocation[] = [];

  //Vehicle Type data
  public vehicleTypeData$!: Observable<VehicleType[] | null>;
  public vehicleTypeData: VehicleType[] = [];

  public vehicleData$!: Observable<Vehicle[] | null>;
  public vehicleData: Vehicle[] = [];

  filterSelectionState!: FilterSelection;

  constructor(
    private locationService: LocationService,
    private vehicleTypeService: VehicleTypeService,
    private vehicleService: VehicleService,
    private reservationService: ReservationService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.locationData$ = this.locationService.getLocations().pipe(
      map((rentalLocations: RentalLocation[] | HttpErrorResponse) => {
        if(rentalLocations && rentalLocations instanceof Array) {
          this.locationData = rentalLocations
        }
        return this.locationData.length ? this.locationData : null;
      }),
      catchError((error: Error | HttpErrorResponse) => {
        console.warn('Error Loading locations', error);
        return of(null)
      })
    );

    this.vehicleTypeData$ = this.locationData$.pipe(
      concatMap((locationData: RentalLocation[] | null) =>
        this.getVehicleTypes$(locationData ? locationData[0].id : null))
    )
  }

  getVehicleTypesFromSelectedLocation(locationDataId: string) {
    this.vehicleTypeData$ = this.getVehicleTypes$(locationDataId);
  }

  onFilterApply(e: FilterSelection) {
    this.filterSelectionState = e;
    this.vehicleData$ = this.vehicleService.getVehicles
      (e.selectedLocation, e.selectedVehicleType, e.startDate, e.endDate, e.vehicleTypeName)
      .pipe(
        map((vehicles: Vehicle[] | HttpErrorResponse) => {
          if(vehicles && vehicles instanceof Array) {
            this.vehicleData = vehicles;
          }
          return this.vehicleData.length ? this.vehicleData : null;
        }),
        catchError((error: Error | HttpErrorResponse) => {
          console.warn('Error Loading vehicles', error);
          return of(null)
        })
      );
  }

  onClickReservation(e: Vehicle) {
    // Call reservation API
    const reservationPayload: ReservationAPIPost = {
      start_date: this.filterSelectionState.startDate,
      end_date: this.filterSelectionState.endDate,
      price: e.price,
      subType: e.subType 
    }
    this.reservationService.postReservation(e.rentalOfficeId, e.vehicleTypeId, reservationPayload).subscribe({
        next: () => {
          this.showSuccess('All Done!', 'You have successfully booked your car')
        },
        error: () => console.log("error")});
  }

  private getVehicleTypes$ = (locationId: string | null) => {
    const serviceCall: Observable<VehicleType[] | HttpErrorResponse> = 
      locationId ? this.vehicleTypeService.getVehicleTypes(locationId) : this.vehicleTypeService.getVehicleTypes("")

    return serviceCall.pipe(
      map((vehicleTypes: VehicleType[] | HttpErrorResponse) => {
        if(vehicleTypes && vehicleTypes instanceof Array) {
          this.vehicleTypeData = vehicleTypes;
        }
        return this.vehicleTypeData.length ? this.vehicleTypeData : null;
      }),
      catchError((error: Error | HttpErrorResponse) => {
        console.warn('Error Loading vehicle types', error);
        return of(null);
      })
    )
  }

  showSuccess(message: string, description: string) {
    this.toastr.success(message, description);
    this.onFilterApply(this.filterSelectionState);
  }
}
