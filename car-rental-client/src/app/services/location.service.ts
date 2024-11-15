import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIData } from '../models/api-data';
import { parseRentalLocation, RentalLocation } from '../models/client-models/rental-location';
import { RentalLocationAPI } from '../models/api-models/rental-location-api';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocations(): Observable<RentalLocation[] | HttpErrorResponse> {
    const { baseUrl } = environment;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + environment.bearerToken
    })
    return this.http.get<APIData<RentalLocationAPI[]>>((baseUrl + '/rental-office'), { headers: headers }).pipe(
      map((locations) => {
        return this.extractLocationData(locations)
      }),
      catchError(this.handleOrgError)
    );
  }

  private extractLocationData(res: APIData<RentalLocationAPI[]>): RentalLocation[] {
    const payload = res.data;
    return (payload) ? parseRentalLocation(payload) : [] as RentalLocation[];
  }

  private handleOrgError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    throwError(() => error);
    return of(error);
  }
}
