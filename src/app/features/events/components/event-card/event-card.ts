import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Event } from '../../models/event';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-event-card',
  templateUrl: './event-card.html',
})

export class EventCard {
  event = input.required<Event>();
}
