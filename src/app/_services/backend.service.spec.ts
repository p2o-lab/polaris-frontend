import {inject, TestBed} from '@angular/core/testing';

import {BackendService} from './backend.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SettingsService} from './settings.service';
import {WebsocketService} from './websocket.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material';

describe('BackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendService, SettingsService, WebsocketService, MatSnackBar
      ],
        imports: [HttpClientTestingModule, MatSnackBarModule]
    });
  });

  it('should be created', inject([BackendService], (service: BackendService) => {
    expect(service).toBeTruthy();
  }));
});
