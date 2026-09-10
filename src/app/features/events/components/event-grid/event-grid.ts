import { Component } from '@angular/core';

import { EventCard } from '../event-card/event-card';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-grid',
  templateUrl: './event-grid.html',
  imports: [EventCard],
})
export class EventGrid {
  events: Event[] = [
    {
      id: '1',
      name: 'Summer Music Festival',
      imageUrl: 'https://picsum.photos/seed/music/600/400',
      start: '2026-08-15T18:00:00',
      end: '2026-08-15T23:00:00',
      venue: 'Warsaw National Stadium',
      saleStart: '2026-06-01T09:00:00',
      saleEnd: '2026-08-15T17:00:00',
      status: 'PUBLISHED',
    },
    {
      id: '2',
      name: 'Tech Conference 2026',
      imageUrl: 'https://picsum.photos/seed/music/600/400',
      start: '2026-09-05T09:00:00',
      end: '2026-09-05T18:00:00',
      venue: 'EXPO XXI Warsaw',
      saleStart: '2026-05-01T09:00:00',
      saleEnd: '2026-09-05T08:00:00',
      status: 'PUBLISHED',
    },
    {
      id: '3',
      name: 'City Food Festival',
      imageUrl: 'https://picsum.photos/seed/music/600/400',
      start: '2026-09-20T12:00:00',
      end: '2026-09-20T20:00:00',
      venue: 'Kraków Main Square',
      saleStart: '2026-07-01T09:00:00',
      saleEnd: '2026-09-20T11:00:00',
      status: 'PUBLISHED',
    },
  ];
}