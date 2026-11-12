import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-event-search-top',
  templateUrl: './event-search-top.html',
})
export class EventSearchTop {
  searchQuery = '';

  @Output() search = new EventEmitter<string>();

  onSearch(): void{
    console.log('Searching for: ', this.searchQuery);
    this.search.emit(this.searchQuery.trim());
  }
}
