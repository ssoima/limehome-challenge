import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapComponent} from './map/map.component';
import {BookingsComponent} from './bookings/bookings.component';


const routes: Routes = [
  {path: '', component: MapComponent},
  {path: 'userbookings', component: BookingsComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
