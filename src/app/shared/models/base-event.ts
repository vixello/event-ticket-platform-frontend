import { TicketType } from "./ticket-type";

export interface BaseEvent {
    name: string;
    start: string | null;
    end: string | null;
    venue: string;
    saleStart: string | null;
    saleEnd: string | null;
    status: EventStatus;
    ticketTypes: TicketType[];
}

export enum EventStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
}