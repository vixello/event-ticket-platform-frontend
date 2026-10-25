import { BaseEvent } from "../../../shared/models/base-event"; 

export interface Event extends BaseEvent {
  id: string;
  imageUrl: string | null;
}