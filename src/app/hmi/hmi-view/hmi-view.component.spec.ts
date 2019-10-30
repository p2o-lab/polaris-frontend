import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmiViewComponent } from './hmi-view.component';

describe('HmiViewComponent', () => {
  let component: HmiViewComponent;
  let fixture: ComponentFixture<HmiViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmiViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
