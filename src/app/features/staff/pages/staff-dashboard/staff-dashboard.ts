import { Component, OnInit, PLATFORM_ID, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-staff-dashboard',
  imports: [RouterLink, NgClass],
  templateUrl: './staff-dashboard.html',
  styleUrl: './staff-dashboard.css'
})

export class StaffDashboard implements OnInit {
  staffMembers: any[] = [];
  isLoading = true;

  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadStaff();
    }
  }

  loadStaff(): void {
    setTimeout(() => {
      this.staffMembers = [
        { id: '1', name: 'John Doe', role: 'MANAGER', email: 'john@example.com', status: 'ACTIVE' },
        { id: '2', name: 'Jane Smith', role: 'SUPPORT', email: 'jane@example.com', status: 'PENDING' }
      ];
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 300);
  }
}