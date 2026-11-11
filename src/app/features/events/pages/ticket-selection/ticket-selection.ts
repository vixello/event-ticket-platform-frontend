
import { Component, computed, inject, output, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TicketType } from '../../../../shared/models/ticket-type';
import { TicketCartItem } from '../../../../shared/models/ticket-cart-item';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';
import { LocalStorageService } from '../../../../shared/services/LocalStorageService';

@Component({
    selector: 'app-ticket-selection',
    standalone: true,
    imports: [CommonModule, CurrencyPipe],
    templateUrl: './ticket-selection.html',
})
export class TicketSelectionComponent {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private eventService: EventService,
    ) { }

    cartData: any = {};
    localStorage = inject(LocalStorageService);

    ngOnInit(): void {
        const navState = history.state;
        if (navState && navState.event) {
            this.event.set(navState.event);
            this.ticketTypes.set(navState.event.ticketTypes)
        } else {
            // Jeśli wszedł bezpośrednio z linku, pobieramy event po id z URL
            const eventId = this.route.snapshot.paramMap.get('eventId');
            if (eventId) {
                this.eventService.getById(eventId).subscribe({
                    next: (fetchedEvent) => {
                        this.event.set(fetchedEvent);
                        this.ticketTypes.set(fetchedEvent.ticketTypes || []);
                    }
                });
            }
        }

        const pendingCart = this.localStorage.getItem("pending_cart");
        if (pendingCart && this.authService.isAuthenticated()) {
            this.cartData = JSON.parse(pendingCart);
            this.localStorage.removeItem("pending_cart");

            if (this.cartData.selectedTickets) {
                const restoreQuantities: Record<string, number> = {};
                this.cartData.selectedTickets.forEach((item: TicketCartItem) => {
                    restoreQuantities[item.ticketType.id] = item.quantity;
                });

                this.selectedQuantities.set(restoreQuantities);
            }

            this.localStorage.removeItem("pending_cart");
            this.router.navigate([`/checkout`], {
                state: { cartData: this.cartData },
                replaceUrl: true
            })
        }
    }


    event = signal<Event | null>(null);
    ticketTypes = signal<TicketType[]>([]);

    proceedToCheckout = output<TicketCartItem[]>();
    backToEvent = output<void>();

    // State: Map of ticketTypeId -> selected quantity
    selectedQuantities = signal<Record<string, number>>({});

    cartItems = computed<TicketCartItem[]>(() => {
        const quantities = this.selectedQuantities();
        return this.ticketTypes()
            .map((type) => ({
                ticketType: type,
                quantity: quantities[type.id] || 0,
            }))
            .filter((item) => item.quantity > 0);
    });

    selectedTickets = computed(() => {
        const quantities = this.selectedQuantities();
        return this.ticketTypes()
            .map((type) => ({
                ticketType: type,
                quantity: quantities[type.id] || 0,
            }))
            .filter((item) => item.quantity > 0);
    });

    totalTicketCount = computed(() =>
        this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
    );

    totalPrice = computed(() => {
        const quantities = this.selectedQuantities();
        return this.ticketTypes().reduce((acc, type) => {
            return acc + (quantities[type.id] || 0) * type.price;
        }, 0);
    });


    incrementQuantity(ticketTypeId: string, maxAvailable = 4): void {
        const current = this.selectedQuantities()[ticketTypeId] || 0;
        if (current < maxAvailable) {
            this.selectedQuantities.update((q) => ({
                ...q,
                [ticketTypeId]: current + 1,
            }));
        }
    }

    decrementQuantity(ticketTypeId: string): void {
        const current = this.selectedQuantities()[ticketTypeId] || 0;
        if (current > 0) {
            this.selectedQuantities.update((q) => ({
                ...q,
                [ticketTypeId]: current - 1,
            }));
        }
    }

    onCheckout(): void {
        if (this.totalTicketCount() === 0) return;

        const cartData = {
            selectedTickets: this.cartItems(),
            event: this.event(),
        }

        if (!this.authService.isAuthenticated()) {
            this.localStorage.setItem('pending_cart', JSON.stringify(cartData));

            this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
            return;
        }
        this.router.navigate(['/checkout'], {
            state: {
                cartData
            }
        });
    }

    onBack(): void {
        this.backToEvent.emit();
    }
}