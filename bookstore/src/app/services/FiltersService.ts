import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './ApiService';
import { BooksFilterConfig, BooksFilterKeys } from '../models/entities/Book';
import { take } from 'rxjs/operators';
import { PageEvent } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  filtersConfig = new BehaviorSubject<BooksFilterConfig>({
    page: 1,
    pageSize: 9,
    searchTitle: '',
    searchAuthor: '',
    searchPrinter: '',
    sortOrder: 'name_asc',
    minPrice: null,
    maxPrice: null
  });

  constructor(private apiService: ApiService) { }

  changeConfig(key: BooksFilterKeys, value: any) {
    this.filtersConfig.pipe(take(1))
      .subscribe(config => {
        this.filtersConfig.next({ ...config, [key]: value });
      });
  }

  changeConfigForSearcher(key: 'searchTitle' | 'searchAuthor' | 'searchPrinter', value: string) {
    const searchConfig = { searchTitle: '', searchAuthor: '', searchPrinter: '' };
    searchConfig[key] = value;

    this.filtersConfig.pipe(take(1))
      .subscribe(config => {
        this.filtersConfig.next({
          ...config, ...searchConfig, page: 1
        });
      });
  }

  changeConfigForCategories(key: 'searchTitle' | 'searchAuthor' | 'searchPrinter') {
    const searchConfig = { searchTitle: '', searchAuthor: '', searchPrinter: '' };

    this.filtersConfig.pipe(take(1))
      .subscribe(config => {
        const isSearchFieldPopulated = config.searchAuthor || config.searchPrinter || config.searchTitle;

        if (isSearchFieldPopulated) {
          if (config.searchTitle) {
            this.filtersConfig.next({ ...config, ...searchConfig, [key]: config.searchTitle, page: 1 });
          } else if (config.searchPrinter) {
            this.filtersConfig.next({ ...config, ...searchConfig, [key]: config.searchPrinter, page: 1 });
          } else {
            this.filtersConfig.next({ ...config, ...searchConfig, [key]: config.searchAuthor, page: 1 });
          }
        }
      });
  }

  changePrices(minPrice: number = null, maxPrice: number = null) {
    this.filtersConfig.pipe(take(1))
      .subscribe(config => {
        this.filtersConfig.next({ ...config, minPrice, maxPrice });
      });
  }

  changePageConfig(data: PageEvent) {
    this.filtersConfig.pipe(take(1))
      .subscribe(config => {
        this.filtersConfig.next({
          ...config,
          page: data.pageIndex + 1,
          pageSize: data.pageSize
        });
      });
  }

}
