import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripDetailsPageRoutingModule } from './trip-details-routing.module';

import { TripDetailsPage } from './trip-details.page';
import { DayInformationComponent } from 'src/app/components/day-information/day-information.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripDetailsPageRoutingModule,
  ],
  declarations: [TripDetailsPage, DayInformationComponent],
})
export class TripDetailsPageModule {}
