import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-search.component.html',
  styleUrl: './date-search.component.css',
})
export class DateSearchComponent {
  searchDate: string = '';
  @Output() dateSearch = new EventEmitter<string>();

  onDateChange() {
    this.dateSearch.emit(this.searchDate);
  }

  clearDate() {
    this.searchDate = '';
    this.dateSearch.emit('');
  }
}