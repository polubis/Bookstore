import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterFormComponent } from './printer-form.component';

describe('PrinterFormComponent', () => {
  let component: PrinterFormComponent;
  let fixture: ComponentFixture<PrinterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
