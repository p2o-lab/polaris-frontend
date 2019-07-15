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

  it('add port if not existing', () => {

    const testCases = [
        {input: 'opc.tcp://192.168.31.23:4840', expected: 'opc.tcp://192.168.31.23:4840'},
        {input: 'opc.tcp://192.168.31.23:1660', expected: 'opc.tcp://192.168.31.23:1660'},
        {input: 'opc.tcp://192.168.31.23:4840/test/de', expected: 'opc.tcp://192.168.31.23:4840/test/de'},
        {input: 'opc.tcp://192.168.31.23', expected: 'opc.tcp://192.168.31.23:4840'},
        {input: 'opc.tcp://192.168.31.23/test/de', expected: 'opc.tcp://192.168.31.23:4840/test/de'},
        {input: 'opc.tcp://pol.test.com:4840', expected: 'opc.tcp://pol.test.com:4840'},
        {input: 'opc.tcp://pol.tu-dresden.de:4840', expected: 'opc.tcp://pol.tu-dresden.de:4840'},
        {input: 'opc.tcp://pol.tu-dresden.de:1660', expected: 'opc.tcp://pol.tu-dresden.de:1660'},
        {input: 'opc.tcp://pol.tu-dresden.de:4840/test/de', expected: 'opc.tcp://pol.tu-dresden.de:4840/test/de'},
        {input: 'opc.tcp://pol.tu-dresden.de', expected: 'opc.tcp://pol.tu-dresden.de:4840'},
        {input: 'opc.tcp://pol.tu-dresden.de/test/de', expected: 'opc.tcp://pol.tu-dresden.de:4840/test/de'},
        {input: 'test', expected: 'test'}
    ];

    testCases.forEach((tc) => {
        expect(component.addDefaultPort(tc.input)).toEqual(tc.expected);
    });

  });

});
