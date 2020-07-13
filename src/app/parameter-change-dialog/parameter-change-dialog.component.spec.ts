import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LoggerTestingModule} from 'ngx-logger/testing';
import {MaterialModule} from '../material/material.module';
import {ParameterChangeDialogComponent} from './parameter-change-dialog.component';

describe('ParameterChangeDialogComponent', () => {
  let component: ParameterChangeDialogComponent;
  let fixture: ComponentFixture<ParameterChangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParameterChangeDialogComponent],
      imports: [NoopAnimationsModule, MaterialModule, LoggerTestingModule, FormsModule,
        HttpClientTestingModule],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {name: 'test', value: 10}},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
