import {Component, OnInit} from '@angular/core';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.css']
})
export class RecipeOverviewComponent implements OnInit {

  recipe: any;

  constructor(private backend: BackendService) {
  }

  ngOnInit() {
    this.backend.recipe.subscribe(recipe => {
      this.recipe = recipe;
    });

    this.backend.refreshRecipe();
  }

  startAllowed() {
    return this.recipe.recipe_status === 'idle';
  }

  stopAllowed() {
    return this.recipe.recipe_status === 'running';
  }

  resetAllowed() {
    return (this.recipe.recipe_status === 'stopped' || this.recipe.recipe_status === 'completed');
  }

  abortAllowed() {
    return (this.recipe.recipe_status === 'stopped' || this.recipe.recipe_status === 'completed');
  }


  start() {
    this.backend.startRecipe().subscribe(data => console.log(data));
  }

  reset() {
    this.backend.resetRecipe().subscribe(data => console.log(data));
  }

  stop() {
    this.backend.stopRecipe().subscribe(data => console.log(data));
  }

  abort() {
    this.backend.abortRecipe().subscribe(data => console.log(data));
  }
}
