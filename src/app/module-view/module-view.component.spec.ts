import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule, MatSnackBarModule,
    MatTooltipModule
} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SettingsService} from '../_services/settings.service';
import {settingsServiceStub} from '../_services/settings.service.spec';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {ServiceViewComponent} from '../service-view/service-view.component';
import {ModuleViewComponent} from './module-view.component';

describe('ModuleViewComponent', () => {
    let component: ModuleViewComponent;
    let fixture: ComponentFixture<ModuleViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModuleViewComponent, ServiceViewComponent],
            imports: [
                ReactiveFormsModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
                MatExpansionModule,
                MatCardModule,
                MatDialogModule,
                MatIconModule,
                MatInputModule,
                MatSelectModule,
                MatSnackBarModule,
                MatMenuModule,
                MatDialogModule,
                MatTooltipModule
            ],
            providers: [
                {provide: SettingsService, useValue: settingsServiceStub},
                {provide: WebsocketService, useValue: websocketServiceStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModuleViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add port to opc ua endpoint of module options if not existing', () => {

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
