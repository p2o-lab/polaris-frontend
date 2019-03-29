import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceViewComponent} from './service-view.component';
import {
    MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatSelectModule, MatSnackBarModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SettingsService} from '../_services/settings.service';
import {WebsocketService} from '../_services/websocket.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ServiceViewComponent', () => {
  let component: ServiceViewComponent;
  let fixture: ComponentFixture<ServiceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceViewComponent],
        imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule, BrowserAnimationsModule,
            MatInputModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatSnackBarModule],
        providers: [SettingsService, WebsocketService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
