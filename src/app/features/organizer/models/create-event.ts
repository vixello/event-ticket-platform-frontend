import { TicketType } from './ticket-type';

export interface CreateEvent {
  name: string;
  start: string;
  end: string;
  venue: string;
  saleStart: string;
  saleEnd: string;
  ticketTypes: TicketType[];
}