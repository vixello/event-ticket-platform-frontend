import { TicketTypeAttendee } from "./ticket-type-attendee";

export interface Ticket {
    id: String;
    status: TicketStatus;
    ticketType: TicketTypeAttendee;
}

export enum TicketStatus {
    PURCHASED = "PURHCASED",
    CANCELLED = "CANCELLED"
}