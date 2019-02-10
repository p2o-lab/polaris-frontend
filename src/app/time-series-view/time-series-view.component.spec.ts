import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSeriesViewComponent } from './time-series-view.component';

describe('TimeSeriesViewComponent', () => {
  let component: TimeSeriesViewComponent;
  let fixture: ComponentFixture<TimeSeriesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSeriesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSeriesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
