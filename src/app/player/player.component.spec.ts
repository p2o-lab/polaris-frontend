import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {LoggerTestingModule} from 'ngx-logger/testing';
import {SettingsService} from '../_services/settings.service';
import {settingsServiceStub} from '../_services/settings.service.spec';
import {StepFormatterService} from '../_services/step-formatter.service';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {MaterialModule} from '../material/material.module';
import {PlayerComponent} from './player.component';

describe('PlayerComponent', () => {
    let component: PlayerComponent;
    let fixture: ComponentFixture<PlayerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlayerComponent],
            imports: [RouterTestingModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
                MaterialModule,
                LoggerTestingModule
            ],
            providers: [
                StepFormatterService,
                {provide: SettingsService, useValue: settingsServiceStub},
                {provide: WebsocketService, useValue: websocketServiceStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlayerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
