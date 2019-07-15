import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import 'zone.js/dist/zone-testing';

import {MatCardModule, MatGridListModule, MatIconModule, MatMenuModule} from '@angular/material';
import {DashboardComponent} from './dashboard.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        MatIconModule,
        MatCardModule,
        MatMenuModule,
        MatGridListModule],
      providers: []
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
