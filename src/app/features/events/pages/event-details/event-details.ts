import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.html',
  imports: [DatePipe],
})
export class EventDetails implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
  ) { }

  event = signal<Event | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.eventService.getById(id).subscribe({
      next: (fetchedEvent) => {
        this.event.set(fetchedEvent);
      }
    })

    console.log('Event ID:', id);
    console.log('Event:', this.event);
  }
}