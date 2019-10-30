import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinkComponent } from './sink.component';

describe('BaseSymbolComponent', () => {
  let component: SinkComponent;
  let fixture: ComponentFixture<SinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
