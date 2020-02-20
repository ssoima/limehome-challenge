import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) { }

  getProperties$(lat: number, lng: number): Observable<Property[]> {
    return this.http.get<Property[]>(this.url + '/properties?at=' + lat + ',' + lng);
  }
}

export interface Property {
  id: string;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  photoUrl: string;
}
