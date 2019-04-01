import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsComponent} from './settings.component';
import {
    MatCheckboxModule, MatFormFieldModule, MatInputModule,
    MatSnackBarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SettingsService} from '../_services/settings.service';
import {RouterTestingModule} from '@angular/router/testing';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {settingsServiceStub} from '../_services/settings.service.spec';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsComponent],
        imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule,
            MatCheckboxModule, MatFormFieldModule, MatSnackBarModule, MatInputModule],
        providers: [
            {provide: SettingsService, useValue: settingsServiceStub},
            {provide: WebsocketService, useValue: websocketServiceStub}
        ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
