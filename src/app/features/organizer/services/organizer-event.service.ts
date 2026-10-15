import { Injectable } from '@angular/core';
import { CreateEvent } from '../models/create-event';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizerEventService {
  constructor(private http: HttpClient){}

  private apiUrl = 'http://localhost:9090/api/v1/events'
  createEvent(event: CreateEvent): Observable<CreateEvent> {
      return this.http.get<CreateEvent>(this.apiUrl);
  }
}