import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.html',
  imports: [DatePipe],
})
export class EventDetails implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,

  ) { }

  event = signal<Event | null>(null);
  selectedTicketTypeId = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.eventService.getById(id).subscribe({
      next: (fetchedEvent) => {
        this.event.set(fetchedEvent);
        if (fetchedEvent.ticketTypes && fetchedEvent.ticketTypes.length > 0) {
          this.selectedTicketTypeId.set(fetchedEvent.ticketTypes[0].id);
        }
      }
    })
  }
  onBuyTickets(eventId: string): void{
    const eventClean = JSON.parse(JSON.stringify(this.event()))
    this.router.navigate([`published-events`, eventId, `ticket-selection`],{ state: {
      event: eventClean
    }})
  }
}