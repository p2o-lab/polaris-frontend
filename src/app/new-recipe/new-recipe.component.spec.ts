import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewRecipeComponent} from './new-recipe.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatInputModule, MatSnackBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SettingsService} from '../_services/settings.service';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {RouterTestingModule} from '@angular/router/testing';
import {settingsServiceStub} from '../_services/settings.service.spec';

describe('NewRecipeComponent', () => {
  let component: NewRecipeComponent;
  let fixture: ComponentFixture<NewRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewRecipeComponent],
        imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule, MatInputModule, BrowserAnimationsModule, RouterTestingModule, MatSnackBarModule],
        providers: [
            {provide: SettingsService, useValue: settingsServiceStub},
            {provide: WebsocketService, useValue: websocketServiceStub}
            ]
    })
      .compileComponents();
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
