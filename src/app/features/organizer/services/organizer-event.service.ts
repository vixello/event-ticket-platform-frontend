import { Injectable } from '@angular/core';
import { CreateEventDto } from '../models/create-event.model';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListOrganizerEvent } from '../models/list-organizer-event';
import { RestPage } from '../../../shared/models/RestPage';

@Injectable({
  providedIn: 'root',
})
export class OrganizerEventService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8081/api/v1/events';

  createEvent(event: CreateEventDto): Observable<HttpResponse<CreateEventDto>> {
    return this.http.post<CreateEventDto>(this.apiUrl, event, { observe: 'response' });
  }

  getEvents(page: number = 0, size: number = 10): Observable<RestPage<ListOrganizerEvent>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<RestPage<ListOrganizerEvent>>(this.apiUrl, { params });
  }

  getEventById(eventId: String): Observable<ListOrganizerEvent> {
    return this.http.get<ListOrganizerEvent>(`${this.apiUrl}/${eventId}`);
  }
}