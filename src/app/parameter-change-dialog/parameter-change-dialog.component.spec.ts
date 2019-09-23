import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterChangeDialogComponent } from './parameter-change-dialog.component';

describe('ParameterChangeDialogComponent', () => {
  let component: ParameterChangeDialogComponent;
  let fixture: ComponentFixture<ParameterChangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterChangeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
