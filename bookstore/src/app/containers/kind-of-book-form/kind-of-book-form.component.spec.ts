import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KindOfBookFormComponent } from './kind-of-book-form.component';

describe('KindOfBookFormComponent', () => {
  let component: KindOfBookFormComponent;
  let fixture: ComponentFixture<KindOfBookFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KindOfBookFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KindOfBookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
