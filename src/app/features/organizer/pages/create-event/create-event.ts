import { Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { OrganizerEventService } from '../../services/organizer-event.service';
import { CreateEvent } from '../../models/create-event';
import { TicketType } from '../../models/ticket-type';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.html',
  imports: [FormsModule, DecimalPipe, RouterLink],
})
export class CreateEventPage {

  private readonly eventService = inject(OrganizerEventService);
  private readonly router = inject(Router);
  constructor() {
    console.log('CREATE EVENT PAGE CREATED');
  }
  event: CreateEvent = {
    name: '',
    start: '',
    end: '',
    venue: '',
    saleStart: '',
    saleEnd: '',
    ticketTypes: [],
  };

  newTicketType: TicketType = {
    name: '',
    price: 0,
    totalAvailable: 1,
  };

  addTicketType(): void {
    if (
      !this.newTicketType.name.trim() ||
      this.newTicketType.price < 0 ||
      this.newTicketType.totalAvailable <= 0
    ) {
      return;
    }

    this.event.ticketTypes.push({
      ...this.newTicketType,
    });

    this.newTicketType = {
      name: '',
      price: 0,
      totalAvailable: 1,
    };
  }

  removeTicketType(index: number): void {
    this.event.ticketTypes.splice(index, 1);
  }

  createEvent(): void {
    if (!this.isValid()) {
      return;
    }

    this.eventService.createEvent(this.event);

    console.log('Event created:', this.event);

    this.router.navigate(['/organizer']);
  }

  private isValid(): boolean {
    return (
      this.event.name.trim().length > 0 &&
      this.event.venue.trim().length > 0 &&
      !!this.event.start &&
      !!this.event.end &&
      !!this.event.saleStart &&
      !!this.event.saleEnd &&
      this.event.ticketTypes.length > 0
    );
  }
}