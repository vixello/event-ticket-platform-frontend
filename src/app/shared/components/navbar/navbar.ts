import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/auth.service';
import { LocalStorageService } from '../../services/LocalStorageService';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
})
export class Navbar {
  protected authService = inject(AuthService);
  localStorage = inject(LocalStorageService);

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

  totalItemsCount = computed(() => {
    const pendingCart = this.localStorage.getItem('pending_cart');

    if(!pendingCart) return 0;

    try{
      const cart = JSON.parse(pendingCart);
      if(!cart.selectedTickets) return 0;

      return cart.selectedTickets.reduce((acc: number, item: any) => acc + item.quantity, 0)
    }
    catch{
      return 0;
    }
  })
}