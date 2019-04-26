import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSeriesViewComponent } from './time-series-view.component';
import {MatCardModule, MatGridListModule, MatSnackBarModule} from '@angular/material';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SettingsService} from '../_services/settings.service';
import {settingsServiceStub} from '../_services/settings.service.spec';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('TimeSeriesViewComponent', () => {
  let component: TimeSeriesViewComponent;
  let fixture: ComponentFixture<TimeSeriesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSeriesViewComponent ],
        imports: [
            MatGridListModule, MatCardModule, MatSnackBarModule,
            NgxChartsModule, HttpClientTestingModule, BrowserAnimationsModule],
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
