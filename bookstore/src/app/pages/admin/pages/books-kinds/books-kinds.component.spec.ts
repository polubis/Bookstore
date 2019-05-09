import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksKindsComponent } from './books-kinds.component';

describe('BooksKindsComponent', () => {
  let component: BooksKindsComponent;
  let fixture: ComponentFixture<BooksKindsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksKindsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksKindsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
