import { Routes } from '@angular/router';
import { organizerGuard } from './core/guards/organizer.guard';
import { uuidGuard } from './core/guards/uuid.guard';
import { attendeeGuard } from './core/guards/attendee.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'published-events',
        pathMatch: 'full'
    },
    {
        path: 'published-events',
        loadComponent: () => import('./features/events/pages/event-list/event-list')
            .then((m) => m.EventList)
    },
    {
        path: 'events/:id',
        canActivate: [uuidGuard],
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
        path: 'organizer/events/update/:eventId',
        canActivate: [organizerGuard, uuidGuard],
        loadComponent: () =>
            import('./features/organizer/pages/update-event/update-event')
                .then((m) => m.UpdateEventPage)
    },
    {
        path: 'organizer',
        canActivate: [organizerGuard],
        loadComponent: () =>
            import('./features/organizer/pages/organizer-dashboard/organizer-dashboard')
                .then((m) => m.OrganizerDashboard),
    },
    {
        path: 'organizer/events/:eventId',
        canActivate: [organizerGuard, uuidGuard],
        loadComponent: () =>
            import('./features/organizer/pages/event-managment/event-managment')
                .then((m) => m.EventManagment),
    },
    {
        path: 'profile',
        canActivate: [attendeeGuard],
        loadComponent: () =>
            import('./features/attendee/pages/attendee-profile')
                .then((m) => m.AttendeeProfile),
    },
    {
        path: 'published-events/:eventId/ticket-selection',
        canActivate: [uuidGuard],
        loadComponent: () =>
            import('./features/events/pages/ticket-selection/ticket-selection')
                .then((m) => m.TicketSelectionComponent),
    },
    {
        path: 'checkout/:orderId',
        loadComponent: () =>
            import('./features/payments/pages/checkout/checkout')
                .then((m) => m.CheckoutComponent),
    },
    {
        path: 'payments',
        // canActivate: [attendeeGuard],
        loadComponent: () =>
            import('./features/payments/pages/payment/payments')
                .then((m) => m.PaymentsComponent),
    },
    {
        path: '**',
        redirectTo: 'published-events',
    },
];
