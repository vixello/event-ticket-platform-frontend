import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { EventSearch } from '../../components/event-search/event-search';
import { EventGrid } from '../../components/event-grid/event-grid';
import { EventFilters } from '../../components/event-filters/event-filters';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';

@Component({
  imports: [EventSearch, EventFilters, EventGrid],
  selector: 'app-event-list',
  templateUrl: './event-list.html',
})
export class EventList {

  constructor(private eventService: EventService) {};

  private cdr = inject(ChangeDetectorRef);
  
  events: Event[] = [];
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;
  searchTerm: string = ''

  ngOnInit(): void {
    this.fetchEvents(this.searchTerm, this.currentPage);
  }

  fetchEvents(searchTerm: string = '', page: number = 0): void {
    this.currentPage = page;

    this.eventService.getEvents(searchTerm, this.currentPage, this.pageSize).subscribe({
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
      this.fetchEvents(this.searchTerm, this.currentPage + 1)
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.fetchEvents(this.searchTerm, this.currentPage - 1)
    }
  }

  onSearch(searchQuery: string) {
    this.searchTerm = searchQuery;
    this.currentPage = 0;

    this.fetchEvents(this.searchTerm, this.currentPage)
  }
}
