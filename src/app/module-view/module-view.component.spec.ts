import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatTooltipModule
} from '@angular/material';
import {SettingsService} from '../_services/settings.service';
import {settingsServiceStub} from '../_services/settings.service.spec';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {ServiceViewComponent} from '../service-view/service-view.component';
import {ModuleViewComponent} from './module-view.component';

describe('ModuleViewComponent', () => {
    let component: ModuleViewComponent;
    let fixture: ComponentFixture<ModuleViewComponent>;

    // create new instance of FormBuilder
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModuleViewComponent, ServiceViewComponent],
            imports: [
                ReactiveFormsModule,
                HttpClientTestingModule,
                MatExpansionModule,
                MatCardModule,
                MatIconModule,
                MatInputModule,
                MatSelectModule,
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
});
