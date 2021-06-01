import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectScanComponent } from './select-scan.component';

describe('SelectScanComponent', () => {
  let component: SelectScanComponent;
  let fixture: ComponentFixture<SelectScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
