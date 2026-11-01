import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { EventSearch } from '../../components/event-search/event-search';
import { EventGrid } from '../../components/event-grid/event-grid';
import { EventFilters } from '../../components/event-filters/event-filters';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { error } from 'console';

@Component({
  imports: [EventSearch, EventFilters, EventGrid],
  selector: 'app-event-list',
  templateUrl: './event-list.html',
})
export class EventList {

  constructor(private eventService: EventService) {
    this.fetchEvents(this.currentPage);
  };

  private cdr = inject(ChangeDetectorRef);
  
  events: Event[] = [];
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;


  fetchEvents(page: number = 0): void {
    this.currentPage = page;

    this.eventService.getEvents(this.currentPage, this.pageSize).subscribe({
      next: (pageData: any) => {
        this.events = pageData.content
        this.totalElements = pageData.totalElements
        this.totalPages = pageData.totalPages

        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error loading events ", err)
    })
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.fetchEvents(this.currentPage + 1)
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.fetchEvents(this.currentPage - 1)
    }
  }

  onSearch(searchQuery: String) {
    this.events = this.eventService.searchEvents(searchQuery);
  }
}
