import { Injectable } from "@angular/core";
import { environment } from "../../../../environment/environment";
import { Observable } from "rxjs";
import { Ticket } from "../../../shared/models/ticket";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RestPage } from "../../../shared/models/RestPage";

@Injectable({
    providedIn: 'root',
})

export class AttendeeService {
    constructor(private http: HttpClient){}

    private readonly baseUrl = environment.apiUrl;
    
    listTickets(page: number = 0, size: number = 5): Observable<RestPage<Ticket>>{
        const params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());

        return this.http.get<RestPage<Ticket>>(`${this.baseUrl}/tickets`, {params});
    }
}