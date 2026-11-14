import { ChangeDetectorRef, Component, ElementRef, inject, Input, SimpleChanges, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Ticket } from "../../../../shared/models/ticket";
import { AttendeeService } from "../../services/attendee.service";

@Component({
    selector: "app-ticket-details",
    templateUrl: "./ticket-details-modal.html",
    imports: [CommonModule]
})

export class TicketDetails {
    constructor(private attendeeService: AttendeeService) {
    }
    private cdr = inject(ChangeDetectorRef);


    @Input() ticket: Ticket | null = null;
    qrCodeUrl: string | null = null;

    @ViewChild('modalRef') modalRef!: ElementRef<HTMLDialogElement>;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['ticket'] && this.ticket) {
            this.loadQrCodeAndOpen(this.ticket.id);
        }
    }
    loadQrCodeAndOpen(ticketId: string) {
        this.qrCodeUrl = null;
        this.attendeeService.getTicketQrCode(ticketId).subscribe({

            next: (blob) => {
                this.qrCodeUrl = URL.createObjectURL(blob);
                console.log(this.qrCodeUrl);
                this.cdr.detectChanges();
                if (this.modalRef?.nativeElement) {
                    this.modalRef.nativeElement.showModal();
                }
            },
            error: (err) => {
                console.error('Failed to load QR code', err);
            }
        });
    }
}