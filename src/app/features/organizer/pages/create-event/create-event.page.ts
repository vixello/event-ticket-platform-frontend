import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { OrganizerEventService } from '../../services/organizer-event.service';
import { CreateEventDto} from '../../models/create-event.model';
import { EventStatus } from '../../../../shared/models/base-event';
import { TicketType } from '../../../../shared/models/ticket-type';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-create-event',
  standalone: true,
  templateUrl: './create-event.html',
  imports: [FormsModule, DecimalPipe, RouterLink],
})
export class CreateEventPage {

  private readonly eventService = inject(OrganizerEventService);
  private readonly router = inject(Router);
  constructor() {
    console.log('CREATE EVENT PAGE CREATED');
  }
  event: CreateEventDto = {
    name: '',
    start: '',
    end: '',
    venue: '',
    saleStart: '',
    saleEnd: '',
    status: EventStatus.DRAFT,
    ticketTypes: [],
  };

  newTicketType: TicketType = {
    id:'',
    name: '',
    description: '',
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
      id:'',
      name: '',
      description: '',
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

  this.eventService.createEvent(this.event).subscribe({
    next: (response) => {
      console.log('Response status:', response.status); // e.g., 200 or 201
      
      if (response.status === 200 || response.status === 201) {
        alert('Event created successfully!');
        this.router.navigate(['/organizer']);
      }
    },
    error: (err) => {
      console.error('Error creating event:', err);
    }
  });
}

  private isValid(): boolean {
    if (!this.event.name.trim()) {
      alert("Please fill in event's name");
      return false;
    }

    if (!this.event.venue.trim()) {
      alert("Please fill in event's venue");
      return false;
    }

    if (!this.event.start) {
      alert("Please fill in event's start date");
      return false;
    }

    if (!this.event.end) {
      alert("Please fill in event's end date");
      return false;
    }

    if (!this.event.saleStart) {
      alert("Please fill in event's sale start date");
      return false;
    }

    if (!this.event.saleEnd) {
      alert("Please fill in event's sale end date");
      return false;
    }

    if (this.event.ticketTypes.length === 0) {
      alert("Please provide at least one ticket type");
      return false;
    }

    return true;
  }
}