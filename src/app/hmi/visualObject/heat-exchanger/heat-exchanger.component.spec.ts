import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatExchangerComponent } from './heat-exchanger.component';

describe('HeatExchangerComponent', () => {
  let component: HeatExchangerComponent;
  let fixture: ComponentFixture<HeatExchangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatExchangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatExchangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
