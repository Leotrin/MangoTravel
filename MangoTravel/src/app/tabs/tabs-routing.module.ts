import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'landing-page',
        loadChildren: () =>
          import('./views/landing-page/landing-page.module').then(
            (m) => m.LandingPagePageModule
          ),
      },
      {
        path: 'search-page',
        loadChildren: () =>
          import('./views/search-page/search-page.module').then(
            (m) => m.SearchPagePageModule
          ),
      },
      {
        path: 'trip-details',
        loadChildren: () =>
          import('./views/trip-details/trip-details.module').then(
            (m) => m.TripDetailsPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./views/profile/profile.page.module').then(
            (m) => m.RecentSearchesPageModule
          ),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./views/chat/chat.module').then((m) => m.ChatPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
