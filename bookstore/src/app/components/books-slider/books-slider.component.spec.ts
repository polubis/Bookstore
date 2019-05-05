import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksSliderComponent } from './books-slider.component';

describe('BooksSliderComponent', () => {
  let component: BooksSliderComponent;
  let fixture: ComponentFixture<BooksSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
