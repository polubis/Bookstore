import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BooksFilterConfig } from 'src/app/models/entities/Book';
import { FiltersService } from 'src/app/services/FiltersService';
import { debounceEvent } from 'src/app/helpers/debounce-decorator';
import { UserInterfaceService } from 'src/app/services/UserInterfaceService';

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

  constructor(private uiService: UserInterfaceService, private filterService: FiltersService) { }

  ngOnInit() {
    console.log(this.columns, this.items);
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

  handleChangePrices(e: any, minPrice: number, maxPrice: number) {
    e.preventDefault();
    this.filterService.changePrices(minPrice, maxPrice);
  }
}
