import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {
    MatChipsModule, MatDialogModule,
    MatDialogRef,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatStepperModule
} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {SettingsService} from '../_services/settings.service';
import {settingsServiceStub} from '../_services/settings.service.spec';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {NewModuleComponent} from './new-module.component';

describe('NewModuleComponent', () => {
  let component: NewModuleComponent;
  let fixture: ComponentFixture<NewModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewModuleComponent],
        imports: [
            FormsModule,
            HttpClientTestingModule,
            MatFormFieldModule,
            MatSnackBarModule,
            MatStepperModule,
            MatChipsModule,
            MatInputModule,
            MatDialogModule,
            NoopAnimationsModule,
            RouterTestingModule],
        providers: [
            {provide: SettingsService, useValue: settingsServiceStub},
            {provide: WebsocketService, useValue: websocketServiceStub},
            {provide: MatDialogRef, useValue: {}}
        ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
