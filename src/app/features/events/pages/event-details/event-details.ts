import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.html',
  imports: [DatePipe],
})
export class EventDetails implements OnInit {

  event: Event | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.event = this.eventService.getById(id) ?? null;

    console.log('Event ID:', id);
    console.log('Event:', this.event);
  }
}