import { Component, OnInit, signal, OnDestroy, input, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment/environment';
import { AuthService } from '../../../auth/auth.service';
import { EventService } from '../../../events/services/event.service';
import { TicketCartItem } from '../../../../shared/models/ticket-cart-item';
import { Event } from '../../../events/models/event';
import { LocalStorageService } from '../../../../shared/services/LocalStorageService';
import { Ticket } from '../../../../shared/models/ticket';

export interface OrderSummary {
    event: Event;
    selectedTickets: TicketCartItem[];
    serviceFee: number;
    total: number;
}

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

    selectedTickets = signal<TicketCartItem[]>([]);
    currentEvent = signal<Event | null>(null);

    orderId = signal<string | null>(null);
    isLoading = signal<boolean>(false);

    timeLeft = signal<number>(600);
    private timerInterval: any;

    orderSummary = signal<OrderSummary | null>(null);
    localStorage = inject(LocalStorageService);

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('orderId');
        if (id) {
            this.orderId.set(id);
        }
        this.startTimer();

        let parsedCartData: any = null;
        const navState = history.state;

        if (navState && navState.cartData) {
            parsedCartData = navState.cartData;
        }
        else {
            try {
                const localData = this.localStorage.getItem("pending_cart");
                if (localData) {
                    parsedCartData = JSON.parse(localData);
                    this.localStorage.removeItem("pending_cart");
                }
            } catch (e) {
                console.error("Failed to parse pending_cart", e);
            }
        }

        if (parsedCartData) {
            const total = parsedCartData.selectedTickets.reduce((acc: number, ticket: TicketCartItem) => {
                return acc + (ticket.ticketType.price * ticket.quantity)
            })

            const serviceFee = 1;
            const grandTotal = total + serviceFee
            const summary: OrderSummary = {
                event: parsedCartData.event,
                selectedTickets: parsedCartData.selectedTickets,
                serviceFee: serviceFee,
                total: grandTotal
            };
            this.orderSummary.set(summary);
            this.currentEvent.set(summary.event);
            this.selectedTickets.set(summary.selectedTickets);
        }
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