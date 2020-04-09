import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicLineMultiComponent } from './graphic-line-multi.component';

describe('GraphicLineMultiComponent', () => {
  let component: GraphicLineMultiComponent;
  let fixture: ComponentFixture<GraphicLineMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicLineMultiComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicLineMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
