import { Component, OnInit, Input, EventEmitter, Output, TemplateRef, ElementRef } from '@angular/core';
import { BooksFilterConfig } from 'src/app/models/entities/Book';

const sortDataAttr = 'data-attr-sort-key';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss']
})
export class BooksTableComponent implements OnInit {

  @Input() columns: { key: string, name: string, sortable: boolean }[];
  @Input() items: any[];
  @Input() isLoading: boolean;
  @Output() changing = new EventEmitter<BooksFilterConfig>();

  isLoadingAtFilterChanging = false;

  currentSortValue = 'name';
  sortingAscending = true;

  page = 1;
  pageSize = 9;

  constructor() { }

  ngOnInit() {
  }

  handleTableClick({ target }: any) {
    const sortKey = target.getAttribute(sortDataAttr);

    if (sortKey) {
      this.handleSorting(sortKey);
    }
  }

  handleSorting(sortKey: string) {
    if (this.currentSortValue === sortKey) {
      this.sortingAscending = !this.sortingAscending;
    } else {
      this.sortingAscending = true;
    }
    this.currentSortValue = sortKey;
    this.changing.emit(
      {
        page: this.page,
        pageSize: this.pageSize,
        sortOrder: `${this.currentSortValue}_${this.sortingAscending ? 'asc' : 'desc'}`
      }
    );
  }

  initializeSearching() {
    this.isLoadingAtFilterChanging = true;
  }

  handleSearching(searchValue: string, { currentSelectedCategory }: { currentSelectedCategory: string }) {
    this.changing.emit(
      {
        page: this.page,
        pageSize: this.pageSize,
        sortOrder: `${this.currentSortValue}_${this.sortingAscending ? 'asc' : 'desc'}`,
        [currentSelectedCategory]: searchValue
      }
    );
  }

}
