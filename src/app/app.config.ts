import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AuthService } from './features/auth/auth.service';
import { provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { credentialsInterceptor } from './features/auth/auth.credentials-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()), provideClientHydration(),
    provideAppInitializer(() => {
      const authService = inject(AuthService);

      return authService.init();
    }),
    provideHttpClient(
       withInterceptors([credentialsInterceptor]),
       withXsrfConfiguration({
          cookieName: 'XSRF-TOKEN',
          headerName:'X_XSRF_TOKEN',
       })
    )
  ]
};
