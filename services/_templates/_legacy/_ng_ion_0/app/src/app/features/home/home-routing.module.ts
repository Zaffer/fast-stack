import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './pages/index/index.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPage
  },
  // {
  //   path: 'room/:id',
  //   loadChildren: () => import('./pages/room-calendar/room-calendar.module').then( m => m.VenueCalendarPageModule)
  // },
  // {
  //   path: 'map/:id',
  //   loadChildren: () => import('./pages/map-view/map-view.module').then( m => m.MapViewPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
