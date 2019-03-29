import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LogComponent} from './log.component';
import {MatIcon, MatList, MatListItem, MatRipple, MatSnackBar} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SettingsService} from '../_services/settings.service';
import {WebsocketService} from '../_services/websocket.service';
import {Overlay} from '@angular/cdk/overlay';

describe('LogComponent', () => {
  let component: LogComponent;
  let fixture: ComponentFixture<LogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogComponent, MatIcon, MatListItem, MatList, MatRipple],
        providers: [SettingsService, WebsocketService, MatSnackBar, Overlay],
        imports: [HttpClientTestingModule]
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
