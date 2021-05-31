import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParishionerListComponent } from './parishioner-list.component';

describe('ParishionerListComponent', () => {
  let component: ParishionerListComponent;
  let fixture: ComponentFixture<ParishionerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParishionerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParishionerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
