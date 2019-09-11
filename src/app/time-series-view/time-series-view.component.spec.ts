import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {LoggerTestingModule} from 'ngx-logger/testing';
import {SettingsService} from '../_services/settings.service';
import {settingsServiceStub} from '../_services/settings.service.spec';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {MaterialModule} from '../material/material.module';
import {TimeSeriesViewComponent} from './time-series-view.component';

describe('TimeSeriesViewComponent', () => {
    let component: TimeSeriesViewComponent;
    let fixture: ComponentFixture<TimeSeriesViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TimeSeriesViewComponent],
            imports: [
                MaterialModule,
                LoggerTestingModule,
                NgxChartsModule,
                HttpClientTestingModule,
                NoopAnimationsModule],
            providers: [
                {provide: SettingsService, useValue: settingsServiceStub},
                {provide: WebsocketService, useValue: websocketServiceStub}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeSeriesViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
