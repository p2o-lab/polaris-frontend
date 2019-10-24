import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualObjectComponent } from './visual-object.component';

describe('VisualObjectComponent', () => {
  let component: VisualObjectComponent;
  let fixture: ComponentFixture<VisualObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
