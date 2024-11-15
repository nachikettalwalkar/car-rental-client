import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIData } from '../models/api-data';
import { ReservationAPI, ReservationAPIPost } from '../models/api-models/reservation-api';
import { parseReservation, Reservation } from '../models/client-models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient,) { }

  postReservation(locationId: string, vehicleTypeId: string, reservation: ReservationAPIPost): Observable<Reservation[] | HttpErrorResponse> {
    const { baseUrl } = environment;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + environment.bearerToken
    })
    return this.http.post<APIData<Reservation[]>>((baseUrl + '/rental-office/' + locationId + '/vehicle-type/' + vehicleTypeId + '/reservation'), reservation, { headers: headers })
    .pipe(
        map((reservation) => {
          return this.extractReservation(reservation)
        }),
        catchError(this.handleOrgError)
    );
  }

  getReservations(): Observable<Reservation[] | HttpErrorResponse> {
    const { baseUrl } = environment;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + environment.bearerToken
    })
    return this.http.get<APIData<ReservationAPI[]>>((baseUrl + '/reservation'), { headers: headers }).pipe(
      map((reservations) => {
        return this.extractReservation(reservations)
      }),
      catchError(this.handleOrgError)
    );
  }

  private extractReservation(res: APIData<ReservationAPI[]>): Reservation[] {
    const payload = res.data;
    return (payload) ? parseReservation(payload) : [] as Reservation[];
  }

  private handleOrgError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    throwError(() => error);
    return of(error);
  }
}
