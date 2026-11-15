import { Component, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-upcoming-events',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './upcoming-events.html',
})
export class UpcomingEvents {
  events = input<any[]>([]);
  country = input<string>('Poland');
}