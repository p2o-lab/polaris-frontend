import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeOverviewComponent} from './recipe-overview.component';

describe('RecipeOverviewComponent', () => {
  let component: RecipeOverviewComponent;
  let fixture: ComponentFixture<RecipeOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeOverviewComponent]
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
