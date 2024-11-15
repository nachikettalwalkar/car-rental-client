import { HttpErrorResponse } from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { FilterSelection } from 'src/app/models/client-models/filter-selection';
import { RentalLocation } from 'src/app/models/client-models/rental-location';
import { VehicleType } from 'src/app/models/client-models/vehicle-type';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  @Input() locationData!: RentalLocation[];
  @Input() vehicleTypeData!: VehicleType[];
  @Output() onSelectedLocation = new EventEmitter<string>();
  @Output() onApply = new EventEmitter<FilterSelection>();
  yesterday = new Date();

  constructor() {
    this.yesterday.setDate(this.yesterday.getDate() - 0);
  }

  // Default filter selections
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  selectedLocation!: string;
  selectedVehicleType!: string;
  startDate!: string;
  endDate!: string;

  onLocationSelection() {
    this.onSelectedLocation.emit(this.selectedLocation);
  }

  apply() {
    const vehicleType = this.vehicleTypeData.find(obj => obj.id === this.selectedVehicleType) || this.vehicleTypeData[0];
    const selectedFilter: FilterSelection = {
      selectedLocation: this.selectedLocation,
      selectedVehicleType: this.selectedVehicleType,
      startDate: this.range.value.start.toISOString(),
      endDate: this.range.value.end.toISOString(),
      vehicleTypeName: vehicleType.type
    }
    this.onApply.emit(selectedFilter);
  }
}
