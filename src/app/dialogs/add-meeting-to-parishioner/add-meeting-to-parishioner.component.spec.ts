import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetingToParishionerComponent } from './add-meeting-to-parishioner.component';

describe('AddMeetingToParishionerComponent', () => {
  let component: AddMeetingToParishionerComponent;
  let fixture: ComponentFixture<AddMeetingToParishionerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMeetingToParishionerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeetingToParishionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
