import {async, TestBed} from '@angular/core/testing';
import {MatBadge, MatIcon, MatNavList, MatSidenavModule, MatSnackBarModule, MatToolbar} from '@angular/material';
import {AppComponent} from './app.component';
import {SettingsService} from './_services/settings.service';
import {WebsocketService, websocketServiceStub} from './_services/websocket.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {settingsServiceStub} from './_services/settings.service.spec';
import {LoadingBarComponent} from '@ngx-loading-bar/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule, MatSnackBarModule,
          BrowserAnimationsModule, RouterTestingModule,
          HttpClientTestingModule],
      declarations: [
        AppComponent, MatToolbar, MatIcon, MatBadge, MatNavList, LoadingBarComponent
      ],
        providers: [
            {provide: SettingsService, useValue: settingsServiceStub},
            {provide: WebsocketService, useValue: websocketServiceStub}
            ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-toolbar>span').textContent).toContain('PFE Recipe Engine');
  }));
});
