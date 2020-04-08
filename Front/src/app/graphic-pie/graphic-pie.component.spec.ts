import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicPieComponent } from './graphic-pie.component';

describe('GraphicPieComponent', () => {
  let component: GraphicPieComponent;
  let fixture: ComponentFixture<GraphicPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
