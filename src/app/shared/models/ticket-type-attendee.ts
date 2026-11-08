import { BaseEvent } from "./base-event";

export interface TicketTypeAttendee {
    id: String;
    name: string;
    price: number;
    event: BaseEvent;
}