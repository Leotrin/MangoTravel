import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPagePageRoutingModule } from './landing-page-routing.module';

import { LandingPagePage } from './landing-page.page';
import { SkeletonLoaderModule } from 'src/app/components/skeletons/skeleton-loader/skeleton-loader.module';
import { MapModule } from 'src/app/components/map/map.module';
import { TripButtonsComponent } from 'src/app/components/trip-buttons/trip-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandingPagePageRoutingModule,
    SkeletonLoaderModule,
    MapModule,
  ],
  declarations: [LandingPagePage, TripButtonsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingPagePageModule {}
