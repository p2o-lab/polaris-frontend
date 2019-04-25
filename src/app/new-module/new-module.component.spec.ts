import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewModuleComponent} from './new-module.component';
import {MatChipsModule, MatFormField, MatInputModule, MatSnackBarModule, MatStepperModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SettingsService} from '../_services/settings.service';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {settingsServiceStub} from '../_services/settings.service.spec';

describe('NewModuleComponent', () => {
  let component: NewModuleComponent;
  let fixture: ComponentFixture<NewModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewModuleComponent],
        imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule,
            MatSnackBarModule, MatStepperModule, MatChipsModule, MatInputModule,
            BrowserAnimationsModule, RouterTestingModule],
        providers: [
            {provide: SettingsService, useValue: settingsServiceStub},
            {provide: WebsocketService, useValue: websocketServiceStub}
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
