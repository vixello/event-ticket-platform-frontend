import { Component, inject, PLATFORM_ID, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Ticket } from "../../../../shared/models/ticket";
import { AttendeeService } from "../../services/attendee.service";
import { Pagination } from "../../../../shared/components/pagination/pagination";
import { TicketDetails } from "../../components/ticket-details/ticket-details-modal";
import { CommonModule, isPlatformBrowser } from "@angular/common";

@Component({
    templateUrl: "./attendee-profile.html",
    imports: [Pagination, TicketDetails, CommonModule]
})
export class AttendeeProfile {
    constructor(private attendeeService: AttendeeService) { }
    private platformId = inject(PLATFORM_ID);
    private cdr = inject(ChangeDetectorRef);

    tickets: Ticket[] = []
    currentPage = 0;
    pageSize = 5;
    totalElements = 0;
    totalPages = 0;

    selectedTicket: Ticket | null = null;

    @ViewChild('ticketModal') ticketModal!: TicketDetails;

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.fetchTickets(this.currentPage);
        }
    }

    fetchTickets(page: number = 0) {
        this.currentPage = page;
        this.attendeeService.listTickets(this.currentPage, this.pageSize).subscribe({
            next: (pageData: any) => {
                this.tickets = pageData.content ? [...pageData.content] : [];
                this.totalElements = pageData.totalElements
                this.totalPages = pageData.totalPages

                this.cdr.markForCheck();
            },
            error: (err) => { console.error("Error occured while fetching user tickers ", err) }
        })
    }

    openModalForTicket(ticket: Ticket) {

        this.ticketModal.open(ticket);
        this.selectedTicket = ticket;
    }
}