import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceParameterDialogComponent} from './service-parameter-dialog.component';
import {SettingsService} from '../_services/settings.service';
import {WebsocketService} from '../_services/websocket.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
    MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatFormFieldModule, MatInputModule,
    MatSnackBarModule
} from '@angular/material';

describe('ServiceParameterDialogComponent', () => {
  let component: ServiceParameterDialogComponent;
  let fixture: ComponentFixture<ServiceParameterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceParameterDialogComponent],
        imports:   [CommonModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule, NoopAnimationsModule,
            MatInputModule, MatDialogModule, MatFormFieldModule, MatSnackBarModule],
        providers: [SettingsService, WebsocketService,
            {provide: MatDialogRef, useValue: {}},
            { provide: MAT_DIALOG_DATA, useValue: [] },]
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
