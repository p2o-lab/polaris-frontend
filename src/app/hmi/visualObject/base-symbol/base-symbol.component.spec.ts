import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSymbolComponent } from './base-symbol.component';

describe('BaseSymbolComponent', () => {
  let component: BaseSymbolComponent;
  let fixture: ComponentFixture<BaseSymbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseSymbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
