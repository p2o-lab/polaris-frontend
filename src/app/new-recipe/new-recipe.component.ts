import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {RecipeService} from '../_services/recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent {

  public recipe: string;

  constructor(private backend: RecipeService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  public previewFile(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.recipe = e.target.result;

    };
    reader.readAsText(event.target.files[0]);
  }

  public editRecipe() {
    try {
      const recipe = JSON.parse(this.recipe);
      this.snackBar.dismiss();
      this.backend.submitNewRecipe(recipe).subscribe(
        (data) => {
          this.router.navigate(['/recipe']);
        },
        (error) => {
          this.snackBar.open(error.error.error, 'Dismiss');
        }
      );
    } catch {
      this.snackBar.open('Not valid JSON', 'Dismiss');
    }
  }

  public cancel() {
    this.router.navigate(['/recipe']);
  }
}
