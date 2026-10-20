import { BaseEvent } from "../../../shared/models/base-event"; 

export interface EventDto extends BaseEvent {
  id: string;
  imageUrl: string | null;
}