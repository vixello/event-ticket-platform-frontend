import { Component, input } from "@angular/core";
import { OrganizerEvent } from "../../models/organizer-event";
import { NgClass } from "@angular/common";
import { RouterLink } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
    imports: [NgClass, RouterLink, DatePipe],
    selector: 'app-organizer-event-card',
    templateUrl: './organizer-event-card.html'
})

export class OrganizerEventCard{
    event = input.required<OrganizerEvent>();
}