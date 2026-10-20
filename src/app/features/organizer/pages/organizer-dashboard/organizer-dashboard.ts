import { Component, signal, PLATFORM_ID, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrganizerEventService } from '../../services/organizer-event.service';
import { ListOrganizerEvent } from '../../models/list-organizer-event';
import { NgClass } from '@angular/common';

import { isPlatformBrowser } from '@angular/common';

@Component({
  imports: [RouterLink, NgClass],
  selector: 'app-organizer-dashboard',
  styleUrl: './organizer-dashboard.css',
  templateUrl: './organizer-dashboard.html',
})

export class OrganizerDashboard {
  events: ListOrganizerEvent[] = []
  totalElements = 0;
  currentPage = 0;
  pageSize = 10;

  constructor(private organizerEventService: OrganizerEventService) { }

  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadEvents();
    }
  }

  loadEvents() {
    this.organizerEventService.getEvents(this.currentPage, this.pageSize).subscribe({
      next: (pageData: any) => {
        this.events = pageData.content;
        this.totalElements = pageData.totalElements;

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading events', err)
    });
  }
}
