import { Injectable } from "@angular/core";
import { Event } from "../models/event";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { EMPTY, Observable } from "rxjs";
import { RestPage } from "../../../shared/models/RestPage";
import { environment } from "../../../../environment/environment";
import { TicketTypeCart } from "../../../shared/models/ticket-type-cart";

@Injectable({
    providedIn: 'root'
})


export class EventService {

    constructor(private http: HttpClient) { }

    private readonly baseUrl = environment.apiUrl;

    private events: Event[] = [];

    getEvents(searchTerm: String = '', page: number = 0, size: number = 10): Observable<RestPage<Event>> {
        const params = new HttpParams({
            fromObject: {
                page: page.toString(),
                size: size.toString(),
                ...(searchTerm && searchTerm.trim() !== '' ? { searchTerm: searchTerm.toString() } : {})
            }
        })

        return this.http.get<RestPage<Event>>(`${this.baseUrl}/published-events`, { params });
    }

    getById(id: string): Observable<Event> {
        return this.http.get<Event>(`${this.baseUrl}/published-events/${id}`);
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

    purchaseTickets(cartItems: TicketTypeCart[], eventId: string): Observable<any> {
        if (!cartItems || cartItems.length === 0 || !eventId) return EMPTY;

        const payload = {
            items: cartItems
        };

        return this.http.post<any>(`${this.baseUrl}/events/${eventId}/ticket-types/purchases`, payload);
    }
}