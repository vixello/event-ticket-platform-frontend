import { ChangeDetectorRef, Component, inject, Input, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { OrganizerEventService } from '../../services/organizer-event.service';
import { OrganizerEvent } from '../../models/organizer-event';
import { EventStatus } from '../../../../shared/models/base-event';
import { TicketType } from '../../../../shared/models/ticket-type';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-update-event',
    standalone: true,
    templateUrl: './update-event.html',
    imports: [FormsModule, DecimalPipe, RouterLink],
})
export class UpdateEventPage {
    constructor() {
        console.log('update EVENT PAGE updateD');
    }

    eventId!: string;

    private route = inject(ActivatedRoute);

    private readonly eventService = inject(OrganizerEventService);
    private readonly router = inject(Router);
    private cdr = inject(ChangeDetectorRef);

    event: OrganizerEvent = {
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
        id: '',
        name: '',
        description: '',
        price: 0,
        totalAvailable: 1,
    };

    ngOnInit(): void {

        this.route.paramMap.subscribe(params => {
            const id = params.get('eventId');

            if (id) {
                this.eventId = id;
                this.initializeEvent();
            }
        })
    }

    initializeEvent(): void {
        if (!this.eventId) {
            console.error('No event ID provided');
            return;
        }

        this.eventService.getEventById(this.eventId).subscribe(
            {
                next: (fetchedEvent) => {
                    this.event = fetchedEvent;
                    this.cdr.detectChanges();
                },
                error: (err) => {
                    console.error('Błąd podczas pobierania wydarzenia:', err);
                }
            }
        )
    }

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
            id: '',
            name: '',
            description: '',
            price: 0,
            totalAvailable: 1,
        };
    }

    removeTicketType(index: number): void {
        this.event.ticketTypes.splice(index, 1);
    }

    updateEvent(): void {
        if (!this.isValid()) {
            return;
        }

        this.eventService.updateEvent(this.eventId, this.event).subscribe({
            next: (response) => {
                console.log('Response status:', response.status); // e.g., 200 or 201

                if (response.status === 200 || response.status === 201) {
                    alert('Event updated successfully!');
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