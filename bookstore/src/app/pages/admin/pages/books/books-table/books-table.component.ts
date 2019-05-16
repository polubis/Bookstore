import { Component, OnInit, Input, EventEmitter, Output, TemplateRef, ElementRef } from '@angular/core';
import { BooksFilterConfig } from 'src/app/models/entities/Book';
import { FiltersService } from 'src/app/services/FiltersService';
import { take } from 'rxjs/operators';
import { debounceEvent } from 'src/app/helpers/debounce-decorator';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss']
})
export class BooksTableComponent implements OnInit {

  @Input() columns: { key: string, name: string, sortable: boolean }[];
  @Input() items: any[];
  @Output() changing = new EventEmitter<BooksFilterConfig>();

  currentSortValue = 'name';
  sortingAscending = true;

  constructor(private filterService: FiltersService) { }

  ngOnInit() {
  }

  @debounceEvent(150)
  handleSorting(sortKey: string) {
    if (this.currentSortValue === sortKey) {
      this.sortingAscending = !this.sortingAscending;
    } else {
      this.sortingAscending = true;
    }
    this.currentSortValue = sortKey;
    this.filterService.changeConfig('sortOrder',
      `${this.currentSortValue}_${this.sortingAscending ? 'asc' : 'desc'}`
    );
  }

  @debounceEvent(150)
  handleSearching(searchValue: string,
    { currentSelectedCategory }:
      { currentSelectedCategory: 'searchTitle' | 'searchAuthor' | 'searchPrinter' }
  ) {
    this.filterService.changeConfigForSearcher(
      currentSelectedCategory,
      searchValue
    );
  }

  @debounceEvent(150)
  handleCategoryChange(currentSelectedCategory: 'searchTitle' | 'searchAuthor' | 'searchPrinter') {
    this.filterService.changeConfigForCategories(currentSelectedCategory);
  }
}
