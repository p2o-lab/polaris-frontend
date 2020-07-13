import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LoggerTestingModule} from 'ngx-logger/testing';
import {SettingsService} from '../_services/settings.service';
import {settingsServiceStub} from '../_services/settings.service.spec';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {MaterialModule} from '../material/material.module';
import {ServiceParameterDialogComponent} from './service-parameter-dialog.component';

describe('ServiceParameterDialogComponent', () => {
    let component: ServiceParameterDialogComponent;
    let fixture: ComponentFixture<ServiceParameterDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ServiceParameterDialogComponent],
            imports: [
                FormsModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
                MaterialModule,
                LoggerTestingModule],
            providers: [
                {provide: SettingsService, useValue: settingsServiceStub},
                {provide: WebsocketService, useValue: websocketServiceStub},
                {provide: MatDialogRef, useValue: {}},
                {provide: MAT_DIALOG_DATA, useValue: []}]
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
