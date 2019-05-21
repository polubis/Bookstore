import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookKindsComponent } from './book-kinds.component';

describe('BookKindsComponent', () => {
  let component: BookKindsComponent;
  let fixture: ComponentFixture<BookKindsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookKindsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookKindsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
