import {DragDropModule} from '@angular/cdk/drag-drop';
import {ObserversModule} from '@angular/cdk/observers';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {HttpClientModule } from '@angular/common/http';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatOption, MatPseudoCheckbox, MatRippleModule} from '@angular/material/core';
import {MatDialogActions, MatDialogRef} from '@angular/material/dialog';
import {MatDivider} from '@angular/material/divider';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatSlider} from '@angular/material/slider';
import {MatTab, MatTabBody, MatTabGroup, MatTabHeader, MatTabLabel} from '@angular/material/tabs';
import {ServiceSettingsComponent} from './service-settings.component';

describe('ServiceSettingsComponent', () => {
  let component: ServiceSettingsComponent;
  let fixture: ComponentFixture<ServiceSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSettingsComponent, MatSlider,
        MatTab, MatOption, MatTabGroup, MatDivider, MatDialogActions,
        MatSelect, MatLabel, MatInput, MatFormField, MatPseudoCheckbox,
        MatTabHeader, MatTabBody, MatTabLabel],
      imports: [
        HttpClientModule,
        FormsModule,
        DragDropModule,
        ObserversModule,
          CommonModule,
          PortalModule,
          MatRippleModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSettingsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
