import { Component, signal, PLATFORM_ID, inject, ChangeDetectorRef, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrganizerEventService } from '../../services/organizer-event.service';
import { ListOrganizerEvent } from '../../models/list-organizer-event';
import { NgClass } from '@angular/common';

import { isPlatformBrowser } from '@angular/common';

@Component({
  imports: [RouterLink, NgClass],
  selector: 'app-organizer-dashboard',
  templateUrl: './event-managment.html',
})

export class EventManagment {
  event: ListOrganizerEvent | null = null
  totalElements = 0;
  currentPage = 0;
  pageSize = 10;

  constructor(private organizerEventService: OrganizerEventService) { }
  @Input() eventId!: string; 
  
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadEvent();
    }
  }

  loadEvent(): void {
    if (!this.eventId) {
      console.error('Brak parametru eventId w routingu!');
      return;
    }

    // Zakładam, że Twój serwis posiada metodę pobierającą pojedyncze wydarzenie po ID
    this.organizerEventService.getEventById(this.eventId).subscribe({
      next: (fetchedEvent) => {
        this.event = fetchedEvent;
        this.cdr.detectChanges(); // Wymuszenie odświeżenia widoku (przydatne przy SSR/Zoneless)
      },
      error: (err) => {
        console.error('Błąd podczas pobierania wydarzenia:', err);
      }
    });
  }
}
