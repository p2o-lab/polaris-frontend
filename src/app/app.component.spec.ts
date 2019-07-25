import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {
    MatBadgeModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule
} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {AppComponent} from './app.component';
import {WebsocketService, websocketServiceStub} from './_services/websocket.service';
import {SettingsService} from './_services/settings.service';
import {settingsServiceStub} from './_services/settings.service.spec';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatSidenavModule,
                MatSnackBarModule,
                MatToolbarModule,
                MatIconModule,
                MatListModule,
                MatBadgeModule,
                NoopAnimationsModule,
                RouterTestingModule,
                HttpClientTestingModule,
                LoadingBarModule
            ],
            declarations: [ AppComponent ],
            providers: [
                // TODO: use stub of Backend service instead
                {provide: SettingsService, useValue: settingsServiceStub},
                {provide: WebsocketService, useValue: websocketServiceStub}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', async(() => {
        expect(component).toBeTruthy();
    }));
    it('should render title in a h1 tag', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('mat-toolbar>span').textContent).toContain('Polaris Recipe Engine');
    }));
});
