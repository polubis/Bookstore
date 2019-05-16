import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './ApiService';
import { BooksFilterConfig, BooksFilterKeys } from '../models/entities/Book';
import { take } from 'rxjs/operators';

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
        this.filtersConfig.next({ ...config, ...searchConfig });
      });
  }

  changeConfigForCategories(key: 'searchTitle' | 'searchAuthor' | 'searchPrinter') {
    const searchConfig = { searchTitle: '', searchAuthor: '', searchPrinter: '' };

    this.filtersConfig.pipe(take(1))
      .subscribe(config => {
        const isSearchFieldPopulated = config.searchAuthor || config.searchPrinter || config.searchTitle;

        if (isSearchFieldPopulated) {
          if (config.searchTitle) {
            this.filtersConfig.next({ ...config, ...searchConfig, [key]: config.searchTitle });
          } else if (config.searchPrinter) {
            this.filtersConfig.next({ ...config, ...searchConfig, [key]: config.searchPrinter });
          } else {
            this.filtersConfig.next({ ...config, ...searchConfig, [key]: config.searchAuthor });
          }
        }
      });
  }

  changePrices(minPrice: number, maxPrice: number) {
    if (minPrice || maxPrice) {
      this.filtersConfig.pipe(take(1))
      .subscribe(config => {
        this.filtersConfig.next({ ...config, minPrice, maxPrice });
      });
    }
  }

}
