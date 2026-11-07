import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.html',
})

export class Pagination{
  @Input() currentPage = 0;
  @Input() totalPages = 0;

  @Output() pageChange = new EventEmitter<number>();
  
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.pageChange.emit(this.currentPage + 1)
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.pageChange.emit(this.currentPage - 1)
    }
  }

}