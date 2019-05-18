import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsPopupComponent } from './book-details-popup.component';

describe('BookDetailsPopupComponent', () => {
  let component: BookDetailsPopupComponent;
  let fixture: ComponentFixture<BookDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDetailsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
