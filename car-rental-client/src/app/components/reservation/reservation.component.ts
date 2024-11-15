import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Reservation } from 'src/app/models/client-models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  public reservationsData$!: Observable<Reservation[] | null>;
  public reservationsData: Reservation[] = [];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationsData$ = this.reservationService.getReservations().pipe(
      map((reservations: Reservation[] | HttpErrorResponse) => {
        if(reservations && reservations instanceof Array) {
          this.reservationsData = reservations
        }
        return this.reservationsData.length ? this.reservationsData : null;
      }),
      catchError((error: Error | HttpErrorResponse) => {
        console.warn('Error Loading locations', error);
        return of(null)
      })
    );
  }
}
