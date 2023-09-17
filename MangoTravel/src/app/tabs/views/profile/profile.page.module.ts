import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentSearchesPageRoutingModule } from './profile.module';

import { RecentSearchesPage } from './profile.page.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentSearchesPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [RecentSearchesPage],
})
export class RecentSearchesPageModule {}
