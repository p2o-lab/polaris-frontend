import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatCardModule, MatExpansionModule, MatIconModule, MatListModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {SettingsService} from '../_services/settings.service';
import {settingsServiceStub} from '../_services/settings.service.spec';
import {WebsocketService, websocketServiceStub} from '../_services/websocket.service';
import {RecipeDetailComponent} from './recipe-detail.component';

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeDetailComponent],
        imports: [MatCardModule, MatExpansionModule, MatListModule, MatIconModule,
          RouterTestingModule, HttpClientTestingModule],
        providers: [
            {provide: SettingsService, useValue: settingsServiceStub},
            {provide: WebsocketService, useValue: websocketServiceStub}
        ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
