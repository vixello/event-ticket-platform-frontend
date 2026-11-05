
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AuthService } from '../../features/auth/auth.service';

export const attendeeGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    console.log('SSR -> ALLOW');
    return true;
  }

  if (!authService.isAuthenticated()) {
    console.log('BROWSER -> BLOCKED: not authenticated');
    return router.createUrlTree(['/login']);
  }

  if (!authService.hasRole('ROLE_ATTENDEE')) {
    console.log('BROWSER -> BLOCKED: ATTENDEE missing');
    return router.createUrlTree(['/events']);
  }

  console.log('BROWSER -> ALLOWED');
  return true;
};