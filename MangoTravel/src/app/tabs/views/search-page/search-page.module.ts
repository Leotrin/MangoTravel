import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPagePageRoutingModule } from './search-page-routing.module';

import { SearchPagePage } from './search-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPagePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [SearchPagePage],
})
export class SearchPagePageModule {}
