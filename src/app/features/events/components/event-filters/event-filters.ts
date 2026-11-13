import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './event-filters.html',
})
export class EventFilters implements OnChanges {
  @Input() dateFrom: string = '';
  @Input() dateTo: string = '';

  formDateFrom: string = '';
  formDateTo: string = '';

  @Output() filterChange = new EventEmitter<{ dateFrom: string; dateTo: string }>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dateFrom']) {
      this.formDateFrom = this.dateFrom || '';
    }
    if (changes['dateTo']) {
      this.formDateTo = this.dateTo || '';
    }
  }

  onDateChange() {
    this.filterChange.emit({ dateFrom: this.formDateFrom, dateTo: this.formDateTo });
  }

  onClearFilters() {
    this.formDateFrom = '';
    this.formDateTo = '';
    this.filterChange.emit({ dateFrom: '', dateTo: '' });
  }
}