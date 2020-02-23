import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCarouselComponent } from './property-carousel.component';

describe('PropertyCarouselComponent', () => {
  let component: PropertyCarouselComponent;
  let fixture: ComponentFixture<PropertyCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
