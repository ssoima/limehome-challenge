import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import {DataService, Property} from '../data.service';
import {PropertyCardComponent} from '../property-card/property-card.component';

@Component({
  selector: 'app-property-carousel',
  templateUrl: './property-carousel.component.html',
  styleUrls: ['./property-carousel.component.scss']
})
export class PropertyCarouselComponent implements OnInit, AfterViewInit {

  properties$: Observable<Property[]>;
  selectedPropertyId$: Observable<string>;
  @ViewChildren('slide') slides: QueryList<ElementRef>;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.selectedPropertyId$ = this.dataService.getSelectedPropertyId();
    this.properties$ = this.dataService.getProperties$();
  }

  ngAfterViewInit(): void {
    // TODO: scroll to the selected place card
    this.selectedPropertyId$.subscribe(id => {
      console.log(id);
      for (const el of this.slides.toArray()) {
        // console.log(el);
        if (((el as unknown) as PropertyCardComponent).property.id === id) {
          console.log(el.nativeElement);
          // el.nativeElement.scrollIntoView({behavior: 'smooth'});
        }
      }
    });
  }
}
