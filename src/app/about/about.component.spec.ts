import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatGridListModule} from '@angular/material/grid-list';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SettingsService} from '../_services/settings.service';
import {settingsServiceStub} from '../_services/settings.service.spec';
import {AboutComponent} from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent],
      imports: [
        MatGridListModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: SettingsService, useValue: settingsServiceStub}
      ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct API URL', () => {
    expect(component.apiDocUrl).toEqual('http://test.com/api/../doc');
  });
});
