import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-event-search',
  templateUrl: './event-search.html',
})
export class EventSearch {
  searchTerm = '';

  onSearch(): void{
    console.log('Searching for: ', this.searchTerm);
  }
}
