import 'zone.js/dist/zone-testing';
import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {PfeDashboardComponent} from './pfe-dashboard.component';
import {MatCardModule, MatGridListModule, MatIconModule, MatMenuModule} from '@angular/material';
import {SettingsService} from '../_services/settings.service';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {settingsServiceStub} from '../_services/settings.service.spec';

describe('PfeDashboardComponent', () => {
  let component: PfeDashboardComponent;
  let fixture: ComponentFixture<PfeDashboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PfeDashboardComponent],
        imports: [MatCardModule, MatMenuModule, MatIconModule, MatGridListModule],
        providers: [
            {provide: SettingsService, useValue: settingsServiceStub},
            {provide: WebsocketService, useValue: websocketServiceStub}
        ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PfeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
