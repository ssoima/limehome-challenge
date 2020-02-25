import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  bookings$: Observable<any>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.queryBookings();
    this.bookings$ = this.dataService.getBookings();
  }

}
