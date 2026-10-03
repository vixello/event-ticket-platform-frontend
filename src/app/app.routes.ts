import { Routes } from '@angular/router';
import { organizerGuard } from './core/guards/organizer.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'events',
        pathMatch: 'full'
    },
    {
        path: 'events',
        loadComponent: () => import('./features/events/pages/event-list/event-list')
            .then((m) => m.EventList)
    },
    {
        path: 'events/:id',
        loadComponent: () => import('./features/events/pages/event-details/event-details')
            .then((m) => m.EventDetails),
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login')
            .then((m) => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/pages/register/register')
            .then((m) => m.Register)
    },
    {
        path: 'organizer/events/create',
        canActivate: [organizerGuard],
        loadComponent: () =>
            import('./features/organizer/pages/create-event/create-event')
                .then((m) => m.CreateEventPage),
    },
    {
        path: '**',
        redirectTo: 'events',
    },
];
