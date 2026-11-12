import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './event-filters.html',
})
export class EventFilters {
  dateFrom: string = '';
  dateTo: string = '';

  @Output() filterChange = new EventEmitter<{ dateFrom: string; dateTo: string }>();

  onFilterChange() {
    this.filterChange.emit({ dateFrom: this.dateFrom, dateTo: this.dateTo });
  }

  onClearFilters() {
    this.dateFrom = '';
    this.dateTo = '';
    this.filterChange.emit({ dateFrom: '', dateTo: '' });
  }
}