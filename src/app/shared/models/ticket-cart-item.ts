import { TicketType } from "./ticket-type";

export interface TicketCartItem{
    ticketType: TicketType;
    quantity: number;
}