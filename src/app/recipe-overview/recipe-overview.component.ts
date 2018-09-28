import {Component, OnInit} from '@angular/core';
import {BackendService} from '../_services/backend.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {RecipeInterface} from 'pfe-ree-interface';


@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.scss']
})
export class RecipeOverviewComponent implements OnInit {

  recipes: RecipeInterface[] = [];

  constructor(private backend: BackendService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
    this.backend.refreshRecipes();
    this.backend.recipes.subscribe((recipes) => this.recipes = recipes);
  }

  addToPlayList(id: string) {
    console.log('Add to Playlist', id);
    this.backend.enqueueRecipe(id).subscribe(
        () => {
            // this.router.navigate(['/player']);
            this.backend.refreshPlayer();
            console.log('Recipe added to playlist', id);
        },
      (err) => console.log(err)
    );
  }

  remove(id: string) {
    this.backend.removeRecipe(id).subscribe((data) => {
        this.snackBar.open(`Recipe removed`, 'Dismiss');
      },
      (err) => {
        this.snackBar.open(`Error: ${JSON.stringify(err)}`, 'Dismiss');
      });
  }
}
