import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParishionerToMeetingComponent } from './parishioner-to-meeting.component';

describe('ParishionerToMeetingComponent', () => {
  let component: ParishionerToMeetingComponent;
  let fixture: ComponentFixture<ParishionerToMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParishionerToMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParishionerToMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
