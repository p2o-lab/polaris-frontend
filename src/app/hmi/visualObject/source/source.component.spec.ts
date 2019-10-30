import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceComponent } from './source.component';

describe('BaseSymbolComponent', () => {
  let component: SourceComponent;
  let fixture: ComponentFixture<SourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
