import {CommonModule} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatSelectModule, MatSnackBarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SettingsService} from '../_services/settings.service';
import {settingsServiceStub} from '../_services/settings.service.spec';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {ServiceViewComponent} from './service-view.component';

describe('ServiceViewComponent', () => {
  let component: ServiceViewComponent;
  let fixture: ComponentFixture<ServiceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceViewComponent],
        imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule, BrowserAnimationsModule,
            MatInputModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatSnackBarModule],
        providers: [
            {provide: SettingsService, useValue: settingsServiceStub},
            {provide: WebsocketService, useValue: websocketServiceStub}
        ]
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
