import { Component } from "@angular/core";
import { Ticket } from "../../../shared/models/ticket";
import { AttendeeService } from "../services/attendee.service";
import { Pagination } from "../../../shared/components/pagination/pagination";

@Component({
    templateUrl: "./attendee-profile.html",
    imports: [Pagination]
})
export class AttendeeProfile {
    constructor(private attendeeService: AttendeeService){}

    tickets: Ticket[] = []
    currentPage = 0;
    pageSize = 5;
    totalElements = 0;
    totalPages = 0;

    ngOnInit(): void {
        this.fetchTickets(this.currentPage);
    }

    fetchTickets(page: number = 0){
        this.currentPage = page;
        this.attendeeService.listTickets(this.currentPage, this.pageSize).subscribe({
            next: (pageData: any) => {
                this.tickets = pageData.content;
                this.totalElements = pageData.totalElements
                this.totalPages = pageData.totalPages
            },
            error: (err) => {console.error("Error occured while fetching user tickers ", err)}
        })
    }
}