import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeOverviewComponent} from './recipe-overview.component';
import {MatCardModule, MatIconModule, MatMenuModule, MatSnackBarModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RecipeService} from '../_services/recipe.service';
import {PlayerService} from '../_services/player.service';
import {SettingsService} from '../_services/settings.service';
import {WebsocketService} from '../_services/websocket.service';

describe('RecipeOverviewComponent', () => {
  let component: RecipeOverviewComponent;
  let fixture: ComponentFixture<RecipeOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeOverviewComponent],
        imports: [MatIconModule, MatMenuModule, MatCardModule, RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
        providers: [SettingsService, WebsocketService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
