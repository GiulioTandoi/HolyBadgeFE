import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrBuilderComponent } from './qr-builder.component';

describe('QrBuilderComponent', () => {
  let component: QrBuilderComponent;
  let fixture: ComponentFixture<QrBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
