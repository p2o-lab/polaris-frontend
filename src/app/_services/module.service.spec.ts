import {Overlay} from '@angular/cdk/overlay';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NGXMapperService} from 'ngx-logger';
import {ModuleService} from './module.service';
import {SettingsService} from './settings.service';

describe('ModuleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModuleService, HttpClient, SettingsService, MatSnackBar, Overlay, NGXLogger, NGXMapperService,
        LoggerConfig, NGXLoggerHttpService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([ModuleService], (service: ModuleService) => {
    expect(service).toBeTruthy();
  }));
});
