import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonLoaderComponent } from './skeleton-loader.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SkeletonLoaderComponent],
  exports: [SkeletonLoaderComponent],
  imports: [CommonModule, IonicModule],
})
export class SkeletonLoaderModule {}
