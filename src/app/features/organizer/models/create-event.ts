import { TicketType } from '../../../shared/models/ticket-type';

export enum EventStatusEnum {
  DRAFT = 'DRAFT', 
  PUBLISHED = 'PUBLISHED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface CreateEvent {
  name: string;
  start: string;
  end: string;
  venue: string;
  saleStart: string;
  saleEnd: string;
  status: EventStatusEnum;
  ticketTypes: TicketType[];
}