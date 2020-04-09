import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingWeatherComponent } from './following-weather.component';

describe('FollowingWeatherComponent', () => {
  let component: FollowingWeatherComponent;
  let fixture: ComponentFixture<FollowingWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FollowingWeatherComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
