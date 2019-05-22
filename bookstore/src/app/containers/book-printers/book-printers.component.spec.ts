import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPrintersComponent } from './book-printers.component';

describe('BookPrintersComponent', () => {
  let component: BookPrintersComponent;
  let fixture: ComponentFixture<BookPrintersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookPrintersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPrintersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
