import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdditionalInfoComponent } from './add-additional-info.component';

describe('AddAdditionalInfoComponent', () => {
  let component: AddAdditionalInfoComponent;
  let fixture: ComponentFixture<AddAdditionalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdditionalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdditionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
