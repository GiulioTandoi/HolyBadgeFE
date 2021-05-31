import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParishionerComponent } from './add-parishioner.component';

describe('AddParishionerComponent', () => {
  let component: AddParishionerComponent;
  let fixture: ComponentFixture<AddParishionerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParishionerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParishionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
