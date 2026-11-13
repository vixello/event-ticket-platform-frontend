import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-event-search',
  templateUrl: './event-search.html',
})
export class EventSearch {
  
  @Output() search = new EventEmitter<string>();
  @Input() searchTerm: string = "";

  emitSearch(): void {
    console.log('Searching for: ', this.searchTerm);
    this.search.emit(this.searchTerm.trim());
  }
}