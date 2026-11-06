import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    templateUrl: 'pagination.html',
    selector: 'app-pagination'
})

export class Pagination{
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;

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