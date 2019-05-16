import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcherCategorySwitcherComponent } from './searcher-category-switcher.component';

describe('SearcherCategorySwitcherComponent', () => {
  let component: SearcherCategorySwitcherComponent;
  let fixture: ComponentFixture<SearcherCategorySwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearcherCategorySwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearcherCategorySwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
