import { Injectable } from "@angular/core";
import { Event } from "../models/event";
import { EventStatus } from "../../../shared/models/base-event";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { RestPage } from "../../../shared/models/RestPage";

@Injectable({
    providedIn: 'root'
})


export class EventService {

    constructor(private http: HttpClient) { }

    private apiUrl = 'http://localhost:8081/api/v1/published-events';

    private events: Event[] = [];

    getEvents(page: number = 0, size: number = 10): Observable<RestPage<Event>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        return this.http.get<RestPage<Event>>(this.apiUrl, { params });
    }

    getById(id: string): Event | undefined {
        return this.events.find(e => e.id === id);
    }

    searchEvents(searchQuery: String): Event[] {
        const normalizedQuery = searchQuery.toLowerCase();

        if (!normalizedQuery) {
            return this.events;
        }

        return this.events.filter((event) =>
            event.name.toLowerCase().includes(normalizedQuery) ||
            event.venue.toLowerCase().includes(normalizedQuery)
        );
    }

    updateEvents() {

    }
}