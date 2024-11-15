// Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// App imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltersComponent } from './components/filters/filters.component';
import { VehicleCardComponent } from './components/vehicle-card/vehicle-card.component';

// Material imports
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './components/home/home.component';

const materialModules = [
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatChipsModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRippleModule,
  MatCardModule,
  MatGridListModule
];

@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    VehicleCardComponent,
    ReservationComponent,
    HomeComponent
  ],
  imports: [
    ...materialModules,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
