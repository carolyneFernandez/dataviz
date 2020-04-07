import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterInfoComponent } from './water-info.component';

describe('WaterInfoComponent', () => {
  let component: WaterInfoComponent;
  let fixture: ComponentFixture<WaterInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
