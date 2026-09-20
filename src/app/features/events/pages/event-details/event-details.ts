import { Component, Input } from '@angular/core';
import { Event } from '../../models/event';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  imports: [],
  selector: 'app-event-details',
  templateUrl: './event-details.html',
})
export class EventDetails {

  event: Event | null = null;

  constructor(private route: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.event = this.eventService.getById(id) ?? null;
    console.log(id);
    console.log('event:', this.event);
  }
}
