import { Component, OnInit } from '@angular/core';
import {AgmMarker} from '@agm/core';
import {DataService, Property} from '../data.service';
import {Observable} from 'rxjs';


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
  lastSelectedMarker: AgmMarker = null;
  properties$: Observable<Property[]>;
  selectedPropertyId: string = null;
  LIGHT_MARKER = { url: '../../assets/house-light.svg', scaledSize: { width: 40, height: 40 } };
  DARK_MARKER = { url: '../../assets/house-dark.svg', scaledSize: { width: 50, height: 50 } };

  constructor( private dataService: DataService) {
    this.properties$ = dataService.getProperties$(this.lat, this.lng);
    console.log(dataService.getProperties$(this.lat, this.lng));
  }

  ngOnInit(): void {
  }

  clickedMarker(id: string) {
    this.selectedPropertyId = id;
  }
  
  mapClicked($event) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }


  markers: marker[] = [
	  {
		  lat: 48.2374,
		  lng: 11,
		  draggable: true
	  },
	  {
      lat: 48.5374,
      lng: 11.123,
		  draggable: false
	  },
	  {
      lat: 48.8374,
      lng: 11.5,
		  draggable: true
	  }
  ]
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
