import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environment/environment';

@Component({
    selector: 'app-paypal-mock',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './payments.html'
})

export class PaymentsComponent implements OnInit {
    orderId = signal<string | null>(null);
    isLoading = signal<boolean>(false);

    private readonly baseUrl = environment.apiUrl;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('orderId');
        if (id) {
            this.orderId.set(id);
        }
    }

    completePayment(): void {
        const id = this.orderId();
        if (!id) return;

        this.isLoading.set(true);

        this.http.post(`${this.baseUrl}/payments/payu/${id}/complete`, {}).subscribe({
            next: () => {
                this.isLoading.set(false);
                console.log('Payment completed successfully!');
                this.router.navigate(['/']);
            },
            error: (err) => {
                this.isLoading.set(false);
                console.error('Error during payment finalization:', err);
            }
        });
    }

    cancelPayment(): void {
        this.router.navigate(['/']);
    }
}