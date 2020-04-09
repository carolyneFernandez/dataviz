import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ButtonCityComponent } from "./button-city.component";

describe("ButtonCityComponent", () => {
  let component: ButtonCityComponent;
  let fixture: ComponentFixture<ButtonCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonCityComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
