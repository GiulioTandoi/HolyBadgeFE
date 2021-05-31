import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParishionerDetailComponent } from './parishioner-detail.component';

describe('ParishionerDetailComponent', () => {
  let component: ParishionerDetailComponent;
  let fixture: ComponentFixture<ParishionerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParishionerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParishionerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
