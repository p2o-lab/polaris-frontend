import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModuleViewComponent} from './module-view.component';
import {
    MatAccordion,
    MatButton, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule, MatCardSubtitle, MatCardTitle,
    MatCheckbox,
    MatCheckboxModule, MatDialogModule,
    MatExpansionModule, MatExpansionPanel,
    MatExpansionPanelActionRow,
    MatExpansionPanelDescription, MatExpansionPanelHeader,
    MatExpansionPanelTitle, MatFormField, MatFormFieldControl, MatHint,
    MatIcon, MatIconModule, MatInputModule, MatMenu, MatMenuModule,
    MatMenuTrigger, MatOption, MatPseudoCheckbox, MatPseudoCheckboxModule, MatRipple, MatSelect, MatSelectModule,
    MatSnackBarModule
} from '@angular/material';
import {ServiceViewComponent} from '../service-view/service-view.component';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Template} from '@angular/compiler/src/render3/r3_ast';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SettingsService} from '../_services/settings.service';
import {WebsocketService} from '../_services/websocket.service';

describe('ModuleViewComponent', () => {
  let component: ModuleViewComponent;
  let fixture: ComponentFixture<ModuleViewComponent>;

    // create new instance of FormBuilder
    const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleViewComponent, ServiceViewComponent],
        imports: [CommonModule, ReactiveFormsModule, HttpClientTestingModule,
            MatExpansionModule, MatPseudoCheckboxModule, MatCardModule, MatIconModule,
            MatInputModule, MatSelectModule, MatMenuModule, MatSnackBarModule, MatDialogModule],
        providers: [SettingsService, WebsocketService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
