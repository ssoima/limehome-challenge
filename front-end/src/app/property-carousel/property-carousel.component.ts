import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Property} from '../data.service';

@Component({
  selector: 'app-property-carousel',
  templateUrl: './property-carousel.component.html',
  styleUrls: ['./property-carousel.component.scss']
})
export class PropertyCarouselComponent implements OnInit {

  @Input() properties$: Observable<Property[]>;
  @Input() selectedPropertyId$: BehaviorSubject<string>;


  constructor() { }

  ngOnInit(): void {
  }



}
