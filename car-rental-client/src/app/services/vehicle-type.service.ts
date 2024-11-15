import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { parseVehicleType, VehicleType } from '../models/client-models/vehicle-type';
import { environment } from 'src/environments/environment';
import { APIData } from '../models/api-data';
import { VehicleTypeAPI } from '../models/api-models/vehicle-type-api';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  constructor(private http: HttpClient) { }

  getVehicleTypes(locationId: string): Observable<VehicleType[] | HttpErrorResponse> {
    const { baseUrl } = environment;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + environment.bearerToken
    })
    return this.http.get<APIData<VehicleTypeAPI[]>>((baseUrl + '/rental-office/' + locationId + '/vehicle-type'), { headers: headers })
    .pipe(
        map((vehicleTypes) => {
          return this.extractVehicleTypeData(vehicleTypes)
        }),
        catchError(this.handleOrgError)
    );
  }

  private extractVehicleTypeData(res: APIData<VehicleTypeAPI[]>): VehicleType[] {
    const payload = res.data;
    return (payload) ? parseVehicleType(payload) : [] as VehicleType[];
  }

  private handleOrgError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    throwError(() => error);
    return of(error);
  }
}
