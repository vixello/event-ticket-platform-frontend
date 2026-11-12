import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { EventSearch } from '../../components/event-search/event-search';
import { EventGrid } from '../../components/event-grid/event-grid';
import { EventFilters } from '../../components/event-filters/event-filters';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { EventsComponent } from '../../components/image-carousel/image-carousel';
import { EventSearchTop } from '../../components/event-search-top/event-search-top';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [EventSearch, EventFilters, EventGrid, Pagination, EventsComponent, EventSearchTop, FormsModule],
  selector: 'app-event-list',
  templateUrl: './event-list.html',
})
export class EventList {

  constructor(private eventService: EventService) { };

  private cdr = inject(ChangeDetectorRef);

  events: Event[] = [];
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;
  searchTerm: string = ''
  dateFrom: string = "";
  dateTo: string = "";

  ngOnInit(): void {
    this.fetchEvents(this.currentPage);
  }

  fetchEvents(page: number = 0): void {
    this.currentPage = page;

    this.eventService.getEvents(this.searchTerm, this.currentPage, this.pageSize, this.dateFrom, this.dateTo).subscribe({
      next: (pageData: any) => {
        this.events = pageData.content;
        this.totalElements = pageData.totalElements;
        this.totalPages = pageData.totalPages;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error loading events ", err)
    });
  }

  onSearch(searchQuery: string) {
    this.searchTerm = searchQuery;
    this.currentPage = 0;

    this.fetchEvents(this.currentPage)
  }

  // Add these methods to your EventList class:

  applyDates(modal: HTMLDialogElement): void {
    modal.close();
    this.currentPage = 0;
    this.fetchEvents(this.currentPage);
  }

  clearDates(): void {
    this.dateFrom = '';
    this.dateTo = '';
    this.currentPage = 0;
    this.fetchEvents(this.currentPage);
  }
  onSidebarFilterChange(filters: { dateFrom: string; dateTo: string }) {
    this.dateFrom = filters.dateFrom;
    this.dateTo = filters.dateTo;
    this.currentPage = 0;
    this.fetchEvents(this.currentPage);
  }
}
