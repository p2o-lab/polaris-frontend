import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LogComponent} from './log.component';
import {
    MatIcon, MatIconModule, MatList, MatListItem, MatListModule, MatRipple, MatSnackBar,
    MatSnackBarModule
} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SettingsService} from '../_services/settings.service';
import {WebsocketService} from '../_services/websocket.service';
import {Overlay} from '@angular/cdk/overlay';
import {settingsServiceStub} from '../_services/settings.service.spec';

describe('LogComponent', () => {
  let component: LogComponent;
  let fixture: ComponentFixture<LogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogComponent],
        providers: [{provide: SettingsService, useValue: settingsServiceStub}, WebsocketService],
        imports: [HttpClientTestingModule, MatIconModule, MatListModule, MatSnackBarModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
