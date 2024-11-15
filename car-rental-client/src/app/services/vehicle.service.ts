import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { VehicleType } from '../models/client-models/vehicle-type';
import { environment } from 'src/environments/environment';
import { APIData } from '../models/api-data';
import { VehicleTypeAPI } from '../models/api-models/vehicle-type-api';
import { VehicleAPI } from '../models/api-models/vehicle-api';
import { parseVehicle, Vehicle } from '../models/client-models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getVehicles(locationId: string, vehicleTypeId: string, startDate: string, endDate: string, vehicleTypeName: string): Observable<Vehicle[] | HttpErrorResponse> {
    const { baseUrl } = environment;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + environment.bearerToken
    })
    return this.http.get<APIData<VehicleAPI[]>>((
      baseUrl + '/rental-office/'+locationId + 
                '/vehicle-type/' + vehicleTypeId +
                '/vehicle?start_date=' + startDate + '&end_date=' + endDate),
                { headers: headers }).pipe(
        map((vehicles) => {
          return this.extractVehicleData(vehicles, vehicleTypeName)
        }),
        catchError(this.handleOrgError)
    );
  }

  private extractVehicleData(res: APIData<VehicleAPI[]>, vehicleTypeName: string): Vehicle[] {
    const payload = res.data;
    // return (payload) ? parseVehicle(payload) : [] as Vehicle[];
    return res.data.map((vehicle) => parseVehicle(vehicle, vehicleTypeName));
  }

  private handleOrgError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    throwError(() => error);
    return of(error);
  }
}
