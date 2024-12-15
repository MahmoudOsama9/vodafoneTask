import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitySearchComponent } from '../city-search/city-search.component';
import { DateSearchComponent } from '../date-search/date-search.component';

@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [CommonModule, CitySearchComponent, DateSearchComponent],
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.css'
})
export class SearchContainerComponent {
  @Output() searchUpdated = new EventEmitter<{ cityName: string; date: string }>();

  cityName: string = '';
  date: string = '';

  onCitySearch(cityName: string) {
    this.cityName = cityName;
    this.emitSearchParameters();
  }

  onDateSearch(date: string) {
    this.date = date;
    this.emitSearchParameters();
  }
  emitSearchParameters() {
    this.searchUpdated.emit({ cityName: this.cityName, date: this.date });
  }
}