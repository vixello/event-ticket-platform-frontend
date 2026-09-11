import { Routes } from '@angular/router';

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
        path: '**',
        redirectTo: 'events',
    },
];
