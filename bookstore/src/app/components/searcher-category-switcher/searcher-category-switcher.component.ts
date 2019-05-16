import { Component, OnInit } from '@angular/core';
import { debounceEvent } from 'src/app/helpers/debounce-decorator';

@Component({
  selector: 'app-searcher-category-switcher',
  templateUrl: './searcher-category-switcher.component.html',
  styleUrls: ['./searcher-category-switcher.component.scss']
})
export class SearcherCategorySwitcherComponent implements OnInit {

  currentSelectedCategory: 'searchTitle' | 'searchPrinter' | 'searchAuthor' = 'searchTitle';

  constructor() { }

  ngOnInit() {
  }


  @debounceEvent(150)
  changeSelectedCategory(key: 'searchTitle' | 'searchPrinter' | 'searchAuthor') {
    this.currentSelectedCategory = key;
  }
}
