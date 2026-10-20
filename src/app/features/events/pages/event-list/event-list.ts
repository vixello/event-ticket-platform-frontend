import { Component } from '@angular/core';
import { EventSearch } from '../../components/event-search/event-search';
import { EventGrid } from '../../components/event-grid/event-grid';
import { EventFilters } from '../../components/event-filters/event-filters';
import { EventService } from '../../services/event.service';
import { EventDto } from '../../models/event';

@Component({
  imports: [EventSearch, EventFilters, EventGrid],
  selector: 'app-event-list',
  templateUrl: './event-list.html',
})
export class EventList {

  events: EventDto[] = [];

  constructor(
    private eventService: EventService
  ) {
    this.events = this.eventService.getEvents();
  };

  fetchEvents(): void {
    this.events = this.eventService.getEvents();
  }

  onSearch(searchQuery: String) {
    this.events = this.eventService.searchEvents(searchQuery);
  }
}
