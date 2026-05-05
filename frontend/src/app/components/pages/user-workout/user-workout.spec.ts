import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkout } from './user-workout';

describe('UserWorkout', () => {
  let component: UserWorkout;
  let fixture: ComponentFixture<UserWorkout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWorkout],
    }).compileComponents();

    fixture = TestBed.createComponent(UserWorkout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
