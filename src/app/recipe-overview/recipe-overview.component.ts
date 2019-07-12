import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {RecipeInterface} from '@p2olab/polaris-interface';
import {PlayerService} from '../_services/player.service';
import {RecipeService} from '../_services/recipe.service';

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.scss']
})
export class RecipeOverviewComponent implements OnInit {

  recipes: RecipeInterface[] = [];

  constructor(private recipeService: RecipeService,
              private playerService: PlayerService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.recipeService.refreshRecipes();
    this.recipeService.recipes.subscribe((recipes) => this.recipes = recipes);
  }

  addToPlayList(id: string) {
    this.playerService.enqueueRecipe(id).subscribe(
        () => {
            // this.router.navigate(['/player']);
            this.playerService.refreshPlayer();
            this.snackBar.open(`Recipe has been added to playlist`, 'Ok');
        },
      (err) => console.log(err)
    );
  }

  remove(id: string) {
    this.recipeService.removeRecipe(id).subscribe((data) => {
        this.snackBar.open(`Recipe removed`, 'Ok');
      },
      (err) => {
        this.snackBar.open(`Error while removing recipe: ${JSON.stringify(err)}`, 'Dismiss');
      });
  }
}
