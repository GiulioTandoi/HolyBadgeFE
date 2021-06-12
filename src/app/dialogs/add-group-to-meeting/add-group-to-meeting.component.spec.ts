import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupToMeetingComponent } from './add-group-to-meeting.component';

describe('AddGroupToMeetingComponent', () => {
  let component: AddGroupToMeetingComponent;
  let fixture: ComponentFixture<AddGroupToMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGroupToMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupToMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
