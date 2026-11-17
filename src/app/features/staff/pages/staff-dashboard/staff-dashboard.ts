import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface EventItem {
  id: string;
  title: string;
  startDate: string;
  location: string;
}

@Component({
  selector: 'app-staff-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-dashboard.html',
  styleUrls: ['./staff-dashboard.css']
})
export class StaffDashboard implements OnInit {
  staffingEvents: EventItem[] = [];
  loading = true;
  errorMessage = '';

  // Update with your actual backend endpoint mapping to staffingEvents
  private apiUrl = '/api/staff/events';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<EventItem[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.staffingEvents = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load your assigned shifts. Please try again later.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}