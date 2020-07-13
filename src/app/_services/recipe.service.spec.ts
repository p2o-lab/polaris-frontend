import {DatePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NGXMapperService} from 'ngx-logger';
import {RecipeService} from './recipe.service';
import {SettingsService} from './settings.service';

describe('RecipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeService, HttpClient, SettingsService, NGXLogger, NGXMapperService, NGXLoggerHttpService,
        LoggerConfig, DatePipe],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([RecipeService], (service: RecipeService) => {
    expect(service).toBeTruthy();
  }));
});
