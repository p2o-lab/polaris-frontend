import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientationReferralSnackbarComponent } from './orientation-referral-snackbar.component';

describe('OrientationReferralSnackbarComponentComponent', () => {
  let component: OrientationReferralSnackbarComponent;
  let fixture: ComponentFixture<OrientationReferralSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrientationReferralSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrientationReferralSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
