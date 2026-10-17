import { Injectable } from '@angular/core';
import { CreateEvent } from '../models/create-event.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizerEventService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8081/api/v1/events';

  createEvent(event: CreateEvent): Observable<HttpResponse<CreateEvent>> {
    return this.http.post<CreateEvent>(this.apiUrl, event, { observe: 'response' });
  }
}