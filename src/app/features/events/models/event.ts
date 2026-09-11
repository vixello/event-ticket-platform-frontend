
export interface Event {
  id: string;
  name: string;
  imageUrl: string | null;
  start: string | null;
  end: string | null;
  venue: string;
  saleStart: string | null;
  saleEnd: string | null;
  status: EventStatus;
}

export type EventStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'CANCELLED'
  | 'COMPLETED';
