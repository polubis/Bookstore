import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserDataPopupComponent } from './change-user-data-popup.component';

describe('ChangeUserDataPopupComponent', () => {
  let component: ChangeUserDataPopupComponent;
  let fixture: ComponentFixture<ChangeUserDataPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeUserDataPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUserDataPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
