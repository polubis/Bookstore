import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { debounceEvent } from 'src/app/helpers/debounce-decorator';

@Component({
  selector: 'app-searcher-category-switcher',
  templateUrl: './searcher-category-switcher.component.html',
  styleUrls: ['./searcher-category-switcher.component.scss']
})
export class SearcherCategorySwitcherComponent implements OnInit {

  @Input() theme = 'dark';
  @Input() items?: string[];
  @Output() changing = new EventEmitter<any>();

  currentSelectedCategory: 'searchTitle' | 'searchPrinter' | 'searchAuthor' | string = 'searchTitle';

  constructor() {
  }

  ngOnInit() {

  }


  @debounceEvent(150)
  changeSelectedCategory(key: 'searchTitle' | 'searchPrinter' | 'searchAuthor') {
    this.currentSelectedCategory = key;
    this.changing.emit(key);
  }

  changeSelectedCategoryFromItems(item: { id: number, name: string }) {
    this.currentSelectedCategory = item.id === 1 ? 'searchTitle' :
      item.id === 3 ? 'searchPrinter' : 'searchAuthor';
    this.changing.emit(item);

  }
}
