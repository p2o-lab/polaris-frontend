import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {RecipeInterface} from '@plt/pfe-ree-interface';
import {RecipeService} from '../_services/recipe.service';
import {PlayerService} from '../_services/player.service';

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
    console.log('Add to Playlist', id);
    this.playerService.enqueueRecipe(id).subscribe(
        () => {
            // this.router.navigate(['/player']);
            this.playerService.refreshPlayer();
            console.log('Recipe added to playlist', id);
        },
      (err) => console.log(err)
    );
  }

  remove(id: string) {
    this.recipeService.removeRecipe(id).subscribe((data) => {
        this.snackBar.open(`Recipe removed`, 'Dismiss');
      },
      (err) => {
        this.snackBar.open(`Error: ${JSON.stringify(err)}`, 'Dismiss');
      });
  }
}
