import 'zone.js/dist/zone-testing';
import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {MatCardModule, MatGridListModule, MatIconModule, MatMenuModule} from '@angular/material';
import {SettingsService} from '../_services/settings.service';
import {WebsocketService} from '../_services/websocket.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
        imports: [MatCardModule, MatMenuModule, MatIconModule, MatGridListModule],
        providers: [SettingsService, WebsocketService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
