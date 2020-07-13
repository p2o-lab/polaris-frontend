import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';
import {RouterTestingModule} from '@angular/router/testing';
import {LoggerTestingModule} from 'ngx-logger/testing';
import {SettingsService} from '../_services/settings.service';
import {settingsServiceStub} from '../_services/settings.service.spec';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {MaterialModule} from '../material/material.module';
import {RecipeOverviewComponent} from './recipe-overview.component';

describe('RecipeOverviewComponent', () => {
  let component: RecipeOverviewComponent;
  let fixture: ComponentFixture<RecipeOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeOverviewComponent],
      imports: [
        MaterialModule,
        LoggerTestingModule,
        RouterTestingModule,
        HttpClientTestingModule],
      providers: [
        {provide: SettingsService, useValue: settingsServiceStub},
        {provide: WebsocketService, useValue: websocketServiceStub},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
