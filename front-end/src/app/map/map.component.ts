import { Component, OnInit } from '@angular/core';
import {AgmMarker} from '@agm/core';
import {DataService, Property} from '../data.service';
import {BehaviorSubject, Observable} from 'rxjs';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  zoom: number = 13;

  // initial center position for the map
  lat: number = 48.1374;
  lng: number = 11.5754;
  properties$: Observable<Property[]>;
  selectedPropertyId$: Observable<string>;
  LIGHT_MARKER = { url: '../../assets/house-light.svg', scaledSize: { width: 40, height: 40 } };
  DARK_MARKER = { url: '../../assets/house-dark.svg', scaledSize: { width: 50, height: 50 } };

  constructor( private dataService: DataService) {
    this.properties$ = dataService.getProperties$(this.lat, this.lng);
    this.selectedPropertyId$ = this.dataService.getSelectedPropertyId();
  }

  ngOnInit(): void {
  }

  clickedMarker(id: string) {
    this.dataService.updateSelectedPropertyId(id);
  }
}
