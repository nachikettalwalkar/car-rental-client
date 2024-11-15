import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vehicle } from 'src/app/models/client-models/vehicle';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss']
})
export class VehicleCardComponent implements OnInit {
  @Input() vehicle!: Vehicle;
  @Output() onBook = new EventEmitter<Vehicle>();

  constructor() { }

  ngOnInit(): void {
  }

  onBookClick(e: Vehicle) {
    this.onBook.emit(e);
  }
}
