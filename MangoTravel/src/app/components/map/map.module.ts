import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [CommonModule, IonicModule, GoogleMapsModule],
})
export class MapModule {}
