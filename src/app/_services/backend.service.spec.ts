import {inject, TestBed} from '@angular/core/testing';

import {BackendService} from './backend.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SettingsService} from './settings.service';
import {WebsocketService, websocketServiceStub} from './websocket.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material';
import {settingsServiceStub} from './settings.service.spec';

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
