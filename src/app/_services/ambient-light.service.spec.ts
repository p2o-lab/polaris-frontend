import {inject, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatSnackBarModule} from '@angular/material';
import {AmbientLightService} from './ambient-light.service';
import {BackendService} from './backend.service';
import {SettingsService} from './settings.service';
import {settingsServiceStub} from './settings.service.spec';
import {WebsocketService, websocketServiceStub} from './websocket.service';

describe('AmbientLightService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmbientLightService,
        {provide: SettingsService, useValue: settingsServiceStub}
      ],
      imports: [HttpClientTestingModule, MatSnackBarModule, SettingsService]
    });
  });

  it('should be created', inject([AmbientLightService], (service: AmbientLightService) => {
    expect(service).toBeTruthy();
  }));
});
