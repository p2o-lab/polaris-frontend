import {DragDropModule} from '@angular/cdk/drag-drop';
import {ObserversModule} from '@angular/cdk/observers';
import {Portal, PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogRef,
  MatDivider, MatFormField, MatFormFieldModule, MatInput,
  MatInputModule,
  MatLabel,
  MatOption, MatPseudoCheckbox, MatRipple, MatRippleModule,
  MatSelect,
  MatSlider,
  MatTab, MatTabBody,
  MatTabGroup, MatTabHeader, MatTabLabel
} from '@angular/material';
import { ServiceSettingsComponent } from './service-settings.component';

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
