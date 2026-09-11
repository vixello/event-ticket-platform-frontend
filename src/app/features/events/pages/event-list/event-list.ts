import { Component } from '@angular/core';
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

  events: Event[] = [];

  constructor(
    private eventService: EventService
  ) {
    this.events = this.eventService.getEvents();
  };

  fetchEvents() {
    this.eventService.getEvents();
  }
  
  onSearch(searchQuery: String) {
    this.events = this.eventService.searchEvents(searchQuery);
  }
}
