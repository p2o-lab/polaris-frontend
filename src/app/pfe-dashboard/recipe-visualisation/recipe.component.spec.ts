import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeComponent } from './recipe.component';
import {SidebarComponent} from '../ui/sidebar/sidebar.component';
import {HttpClientModule} from '@angular/common/http';
import {Store, StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from '../../reducers';
import {MaterialModule} from '../../../material/material.module';

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;
  let store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeComponent ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        MaterialModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeComponent);
    component = fixture.componentInstance;
    store = store = fixture.debugElement.injector.get(Store);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('expect store to be defined', async(() => {
    expect(store).toBeTruthy();
  }));
});
