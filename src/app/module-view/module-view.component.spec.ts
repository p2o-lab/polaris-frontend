import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModuleViewComponent} from './module-view.component';

describe('ModuleViewComponent', () => {
  let component: ModuleViewComponent;
  let fixture: ComponentFixture<ModuleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
