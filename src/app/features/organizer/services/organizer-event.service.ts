import { Injectable } from '@angular/core';
import { CreateEvent } from '../models/create-event';

@Injectable({
  providedIn: 'root',
})
export class OrganizerEventService {

  createEvent(event: CreateEvent): void {
    console.log('Creating event:', event);
  }
}