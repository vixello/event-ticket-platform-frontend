import { Component, OnInit, signal, OnDestroy, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment/environment';
import { AuthService } from '../../../auth/auth.service';
import { EventService } from '../../../events/services/event.service';
import { TicketTypeCart } from '../../../../shared/models/ticket-type-cart';
import { Event } from '../../../events/models/event';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CommonModule, DatePipe],
    templateUrl: './checkout.html'
})
export class CheckoutComponent implements OnInit, OnDestroy {
    constructor(
        private route: ActivatedRoute,
        private eventService: EventService,
        private router: Router,
        private authService: AuthService,
    ) { }

    selectedTickets = signal<TicketTypeCart[]>([]);
    currentEvent = signal<Event | null>(null);

    orderId = signal<string | null>(null);
    isLoading = signal<boolean>(false);

    timeLeft = signal<number>(600);
    private timerInterval: any;

    orderSummary = signal<any>(null);
    private readonly baseUrl = environment.apiUrl;

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('orderId');
        if (id) {
            this.orderId.set(id);
        }
        this.startTimer();
    }

    ngOnDestroy(): void {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    startTimer(): void {
        this.timerInterval = setInterval(() => {
            const current = this.timeLeft();
            if (current > 0) {
                this.timeLeft.set(current - 1);
            } else {
                clearInterval(this.timerInterval);
                alert('Reservation time has expired!');
                this.router.navigate(['/']);
            }
        }, 1000);
    }

    get formattedTime(): string {
        const minutes = Math.floor(this.timeLeft() / 60);
        const seconds = this.timeLeft() % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    completeCheckout(): void {

        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login'], {
                queryParams: { returnUrl: this.router.url }
            });
            return;
        }
        const tickets = this.selectedTickets();
        const eventId = this.currentEvent()?.id;

        if (tickets.length === 0 || !eventId) {
            console.error('No tickets in cart found');
            return;
        }

        this.isLoading.set(true);
        const id = this.orderId();
        if (!id) return;


        this.eventService.purchaseTickets(tickets, eventId).subscribe({
            next: (response) => {
                this.isLoading.set(false);
                if (response && response.redirectUri) {
                    window.location.href = response.redirectUri;
                }
            },
            error: (err) => {
                this.isLoading.set(false);
                console.error('Błąd inicjalizacji płatności', err);
            }
        })
    }
}