import { Injectable } from '@angular/core';
import { OrganizerEvent } from '../models/organizer-event';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { ListOrganizerEvent } from '../models/list-organizer-event';
import { RestPage } from '../../../shared/models/RestPage';

@Injectable({
  providedIn: 'root',
})
export class OrganizerEventService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8081/api/v1/events';

  createEvent(event: OrganizerEvent): Observable<HttpResponse<OrganizerEvent>> {
    return this.http.post<OrganizerEvent>(this.apiUrl, event, { observe: 'response' });
  }

  updateEvent(eventId: String, event: OrganizerEvent): Observable<HttpResponse<OrganizerEvent>> {
    return this.http.put<OrganizerEvent>(`${this.apiUrl}/${eventId}`, event, { observe: 'response' });
  }

  getEvents(page: number = 0, size: number = 10): Observable<RestPage<OrganizerEvent>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<RestPage<OrganizerEvent>>(this.apiUrl, { params });
  }

  getEventById(eventId: String): Observable<OrganizerEvent> {
    return this.http.get<OrganizerEvent>(`${this.apiUrl}/${eventId}`);
  }
}