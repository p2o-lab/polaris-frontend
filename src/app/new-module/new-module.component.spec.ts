import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {LoggerTestingModule} from 'ngx-logger/testing';
import {SettingsService} from '../_services/settings.service';
import {settingsServiceStub} from '../_services/settings.service.spec';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {MaterialModule} from '../material/material.module';
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
                MaterialModule,
                NoopAnimationsModule,
                RouterTestingModule,
                LoggerTestingModule,
                ReactiveFormsModule
            ],
            providers: [
                {provide: SettingsService, useValue: settingsServiceStub},
                {provide: WebsocketService, useValue: websocketServiceStub},
                {provide: MatDialogRef, useValue: {}},
                {provide: MAT_DIALOG_DATA, useValue: {id: 'test'}}
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
        expect(component.module.id).toEqual('test');
    });

    it('be anonymous without module options', () => {
        expect(component.formGroup.value.authentication).toEqual('anonymous');
    });

});
