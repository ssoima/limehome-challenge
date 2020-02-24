import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DataService, Property} from '../data.service';
import {PropertyCardComponent} from "../property-card/property-card.component";

@Component({
  selector: 'app-property-carousel',
  templateUrl: './property-carousel.component.html',
  styleUrls: ['./property-carousel.component.scss']
})
export class PropertyCarouselComponent implements OnInit, AfterViewInit {

  @Input() properties$: Observable<Property[]>;
  selectedPropertyId$: Observable<string>;
  @ViewChildren('slide') slides: QueryList<ElementRef>;

  constructor(private dataService: DataService) {
    this.selectedPropertyId$ = this.dataService.getSelectedPropertyId();
  }

  ngOnInit(): void {
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

  animate() {
    // this.slides.toArray()[this.index].nativeElement.scrollIntoView({behavior: 'smooth'});
  }
  getSlides() {
    console.log(this.slides);
  }


}
