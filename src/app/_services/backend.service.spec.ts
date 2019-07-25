import {inject, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatSnackBarModule} from '@angular/material';
import {BackendService} from './backend.service';
import {SettingsService} from './settings.service';
import {settingsServiceStub} from './settings.service.spec';
import {WebsocketService, websocketServiceStub} from './websocket.service';

describe('BackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendService,
          {provide: SettingsService, useValue: settingsServiceStub},
          {provide: WebsocketService, useValue: websocketServiceStub}
      ],
        imports: [HttpClientTestingModule, MatSnackBarModule]
    });
  });

  it('should be created', inject([BackendService], (service: BackendService) => {
    expect(service).toBeTruthy();
  }));
});
