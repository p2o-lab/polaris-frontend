import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef, MatInputModule, MatSnackBarModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SettingsService} from '../_services/settings.service';
import {settingsServiceStub} from '../_services/settings.service.spec';
import { NewVirtualServiceComponent } from './new-virtual-service.component';

describe('NewVirtualServiceComponent', () => {
  let component: NewVirtualServiceComponent;
  let fixture: ComponentFixture<NewVirtualServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVirtualServiceComponent ],
        imports: [NoopAnimationsModule, MatInputModule, MatSnackBarModule, MatDialogModule, FormsModule,
        HttpClientTestingModule],
        providers: [
            {provide: SettingsService, useValue: settingsServiceStub},
            {provide: MatDialogRef, useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVirtualServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
