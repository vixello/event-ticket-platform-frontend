import { Component, input } from '@angular/core';

import { EventCard } from '../event-card/event-card';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-grid',
  templateUrl: './event-grid.html',
  imports: [EventCard],
})


export class EventGrid {

  events = input.required<Event[]>();
}