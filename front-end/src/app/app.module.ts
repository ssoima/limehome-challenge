import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import {DataService} from './data.service';
import {HttpClientModule} from '@angular/common/http';
import { PropertyCardComponent } from './property-card/property-card.component';
import { PropertyCarouselComponent } from './property-carousel/property-carousel.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PropertyCardComponent,
    PropertyCarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'
    }),
    FormsModule,
  ],
  providers: [ DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
