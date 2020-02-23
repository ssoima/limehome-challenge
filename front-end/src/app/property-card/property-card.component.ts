import {Component, Input, OnInit} from '@angular/core';
import {Property} from '../data.service';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit {
  @Input() private property: Property;
  isCreatingReservation = false;
  constructor() { }

  ngOnInit(): void {
  }

  // Return the first 3 words of the property name
  getTruncatedTitle() {
    let stringIndex = 0;
    let wordCount = 0;
    while (stringIndex < this.property.name.length) {
      stringIndex = this.property.name.indexOf(' ', stringIndex + 1);
      if (stringIndex === -1) { break; }
      if (++wordCount === 3) {
        const nonWordsPattern = /[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF]/g;
        return this.property.name.substring(0, stringIndex).replace(nonWordsPattern, '');
      }
    }
    return this.property.name;
  }

  switchModal() {
    this.isCreatingReservation = !this.isCreatingReservation;
  }

  currentDate() {
    return new Date();
  }

  maxDate() {
    const currentDate = this.currentDate();
    return new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 28);
  }
}
