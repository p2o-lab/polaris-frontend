import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceParameterDialogComponent} from './service-parameter-dialog.component';

describe('ServiceParameterDialogComponent', () => {
  let component: ServiceParameterDialogComponent;
  let fixture: ComponentFixture<ServiceParameterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceParameterDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceParameterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
