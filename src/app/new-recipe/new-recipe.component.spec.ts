import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {LoggerTestingModule} from 'ngx-logger/testing';
import {SettingsService} from '../_services/settings.service';
import {settingsServiceStub} from '../_services/settings.service.spec';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {MaterialModule} from '../material/material.module';
import {NewRecipeComponent} from './new-recipe.component';

describe('NewRecipeComponent', () => {
  let component: NewRecipeComponent;
  let fixture: ComponentFixture<NewRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewRecipeComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
        LoggerTestingModule
      ],
      providers: [
        {provide: SettingsService, useValue: settingsServiceStub},
        {provide: WebsocketService, useValue: websocketServiceStub},
        {provide: MatDialogRef, useValue: {}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
