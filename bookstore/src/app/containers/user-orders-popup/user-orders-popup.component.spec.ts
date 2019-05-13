import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrdersPopupComponent } from './user-orders-popup.component';

describe('UserOrdersPopupComponent', () => {
  let component: UserOrdersPopupComponent;
  let fixture: ComponentFixture<UserOrdersPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrdersPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrdersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
