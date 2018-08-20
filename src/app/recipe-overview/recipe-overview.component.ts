import {Component, OnInit} from '@angular/core';
import {BackendService} from '../_services/backend.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.scss']
})
export class RecipeOverviewComponent implements OnInit {

  constructor(public backend: BackendService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  startAllowed() {
    return this.backend.recipe.recipe_status === 'idle';
  }

  stopAllowed() {
    return this.backend.recipe.recipe_status === 'running';
  }

  resetAllowed() {
    return (this.backend.recipe.recipe_status === 'stopped' || this.backend.recipe.recipe_status === 'completed');
  }

  abortAllowed() {
    return (this.backend.recipe.recipe_status === 'stopped' || this.backend.recipe.recipe_status === 'completed');
  }

  start() {
    this.backend.startRecipe().subscribe(
      data => console.log(data),
      error => this.snackBar.open('Could not connect to all moduless', 'Dismiss'));
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
