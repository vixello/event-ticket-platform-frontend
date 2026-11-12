import { Component, signal, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector:'app-image-carousel',
    templateUrl: './image-carousel.html'
})

export class EventsComponent implements OnInit, OnDestroy {
  // Stan karuzeli
  currentSlide = signal<number>(0);
  totalSlides = 5;
  private slideInterval: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  nextSlide(): void {
    this.currentSlide.update(curr => (curr + 1) % this.totalSlides);
  }

  prevSlide(): void {
    this.currentSlide.update(curr => (curr - 1 + this.totalSlides) % this.totalSlides);
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
  }

  startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Zmienia slide co 5 sekund
  }

  stopAutoSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
}