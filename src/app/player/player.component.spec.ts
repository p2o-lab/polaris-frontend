import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    MatTooltipModule
} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {SettingsService} from '../_services/settings.service';
import {settingsServiceStub} from '../_services/settings.service.spec';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {PlayerComponent} from './player.component';
import {StepFormatterService} from '../_services/step-formatter.service';

describe('PlayerComponent', () => {
    let component: PlayerComponent;
    let fixture: ComponentFixture<PlayerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlayerComponent],
            imports: [RouterTestingModule,
                HttpClientTestingModule,
                MatCardModule,
                MatIconModule,
                MatListModule,
                MatInputModule,
                MatSnackBarModule,
                MatTooltipModule
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
