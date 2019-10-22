import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LoggerTestingModule} from 'ngx-logger/testing';
import {SettingsService} from '../_services/settings.service';
import {settingsServiceStub} from '../_services/settings.service.spec';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {MaterialModule} from '../material/material.module';
import {ParameterViewComponent} from '../parameter-view/parameter-view.component';
import {ServiceViewComponent} from './service-view.component';

describe('ServiceViewComponent', () => {
    let component: ServiceViewComponent;
    let fixture: ComponentFixture<ServiceViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ServiceViewComponent,
            ParameterViewComponent],
            imports: [
                ReactiveFormsModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
                MaterialModule,
                LoggerTestingModule],
            providers: [
                {provide: SettingsService, useValue: settingsServiceStub},
                {provide: WebsocketService, useValue: websocketServiceStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ServiceViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
