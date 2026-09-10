import { Component } from '@angular/core';
import { EventSearch } from '../../components/event-search/event-search';
import { EventGrid } from '../../components/event-grid/event-grid';
import { EventFilters } from '../../components/event-filters/event-filters';

@Component({
  imports: [EventSearch, EventFilters, EventGrid],
  selector: 'app-event-list',
  templateUrl: './event-list.html',
})
export class EventList {}
