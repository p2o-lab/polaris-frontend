import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceSettingsComponent } from './service-settings.component';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../../reducers';
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
import { FormsModule, NgModel } from '@angular/forms';
import { UnitMappingService } from '../../../services/unit-mapping.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ObserversModule} from '@angular/cdk/observers';
import {CommonModule} from '@angular/common';
import {Portal, PortalModule} from '@angular/cdk/portal';

describe('ServiceSettingsComponent', () => {
  let component: ServiceSettingsComponent;
  let fixture: ComponentFixture<ServiceSettingsComponent>;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSettingsComponent, MatSlider,
        MatTab, MatOption, MatTabGroup, MatDivider, MatDialogActions,
        MatSelect, MatLabel, MatInput, MatFormField, MatPseudoCheckbox,
        MatTabHeader, MatTabBody, MatTabLabel],
      imports: [
        HttpClientModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        FormsModule,
        DragDropModule,
        ObserversModule,
          CommonModule,
          PortalModule,
          MatRippleModule
      ],
      providers: [
        UnitMappingService,
        {provide: MatDialogRef, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSettingsComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);

    fixture.detectChanges();
  });
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
  xit('expect store to be defined', async(() => {
    expect(store).toBeTruthy();
  }));
});
