import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParishionerToGroupComponent } from './add-parishioner-to-group.component';

describe('AddParishionerToGroupComponent', () => {
  let component: AddParishionerToGroupComponent;
  let fixture: ComponentFixture<AddParishionerToGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParishionerToGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParishionerToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
