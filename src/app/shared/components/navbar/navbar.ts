import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
})
export class Navbar {
  protected authService = inject(AuthService);

  get profileLink(): string {
    switch (true) {
      case this.authService.hasRole("ROLE_ORGANIZER"):
        return "/organizer";
      case this.authService.hasRole("ROLE_ATTENDEE"):
        return "/profile";
      default:
        return "/";
    }
  }

  get profileLabel(): string {
    switch (true) {
      case this.authService.hasRole("ROLE_ORGANIZER"):
        return "Organizer Dashboard";
      case this.authService.hasRole("ROLE_ATTENDEE"):
        return "Profile";
      default:
        return "/";
    }
  }
}