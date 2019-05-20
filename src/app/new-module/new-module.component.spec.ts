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

  it('add port if not existing', () => {

    const testCases= [
        {input: "opc.tcp://192.168.31.23:4840", expected: "opc.tcp://192.168.31.23:4840"},
        {input: "opc.tcp://192.168.31.23:1660", expected: "opc.tcp://192.168.31.23:1660"},
        {input: "opc.tcp://192.168.31.23:4840/test/de", expected: "opc.tcp://192.168.31.23:4840/test/de"},
        {input: "opc.tcp://192.168.31.23", expected: "opc.tcp://192.168.31.23:4840"},
        {input: "opc.tcp://192.168.31.23/test/de", expected: "opc.tcp://192.168.31.23:4840/test/de"},
        {input: 'opc.tcp://pol.test.com:4840', expected: "opc.tcp://pol.test.com:4840"},
        {input: 'opc.tcp://pol.tu-dresden.de:4840', expected: "opc.tcp://pol.tu-dresden.de:4840"},
        {input: "opc.tcp://pol.tu-dresden.de:1660", expected: "opc.tcp://pol.tu-dresden.de:1660"},
        {input: 'opc.tcp://pol.tu-dresden.de:4840/test/de', expected: "opc.tcp://pol.tu-dresden.de:4840/test/de"},
        {input: "opc.tcp://pol.tu-dresden.de", expected: "opc.tcp://pol.tu-dresden.de:4840"},
        {input: "opc.tcp://pol.tu-dresden.de/test/de", expected: "opc.tcp://pol.tu-dresden.de:4840/test/de"},
        {input: "test", expected: "test"}
    ];

    testCases.forEach((tc) => {
        expect(component.addDefaultPort(tc.input)).toEqual(tc.expected);
    });

  });



});
