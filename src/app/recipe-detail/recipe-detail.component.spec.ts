import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeDetailComponent} from './recipe-detail.component';
import {MatCardModule, MatExpansionModule, MatIconModule, MatListModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SettingsService} from '../_services/settings.service';
import {WebsocketService} from '../_services/websocket.service';

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeDetailComponent],
        imports: [MatCardModule, MatExpansionModule, MatListModule, MatIconModule, RouterTestingModule, HttpClientTestingModule],
        providers: [SettingsService, WebsocketService]
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
