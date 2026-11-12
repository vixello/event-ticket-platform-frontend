import { Injectable } from "@angular/core";
import { Event } from "../models/event";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { EMPTY, Observable } from "rxjs";
import { RestPage } from "../../../shared/models/RestPage";
import { environment } from "../../../../environment/environment";
import { TicketCartItem } from "../../../shared/models/ticket-cart-item";

@Injectable({
    providedIn: 'root'
})


export class EventService {

    constructor(private http: HttpClient) { }

    private readonly baseUrl = environment.apiUrl;

    private events: Event[] = [];

    getEvents(searchTerm: String = '', page: number = 0, size: number = 10, dateFrom?: string, dateTo?: string):
        Observable<RestPage<Event>> {
        let paramsObj: any = {
            page: page.toString(),
            size: size.toString(),
        };

        if (searchTerm && searchTerm.trim() !== '') {
            paramsObj.searchTerm = searchTerm;
        }
        if (dateFrom && dateFrom.trim() !== '') {
            paramsObj.dateFrom = dateFrom;
        }
        if (dateTo && dateTo.trim() !== '') {
            paramsObj.dateTo = dateTo;
        }

        const params = new HttpParams({ fromObject: paramsObj });

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

    purchaseTickets(cartItems: TicketCartItem[], eventId: string): Observable<any> {
        if (!cartItems || cartItems.length === 0 || !eventId) return EMPTY;

        const payload = {
            items: cartItems
        };

        return this.http.post<any>(`${this.baseUrl}/events/${eventId}/ticket-types/purchases`, payload);
    }
}