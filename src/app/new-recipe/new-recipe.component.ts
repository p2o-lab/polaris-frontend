import {Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {NGXLogger} from 'ngx-logger';
import {RecipeService} from '../_services/recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent {

  public recipe: string;

  constructor(private dialogRef: MatDialogRef<NewRecipeComponent>,
              private backend: RecipeService,
              private snackBar: MatSnackBar,
              private logger: NGXLogger) {
  }

  public previewFile(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.recipe = e.target.result.toString();

    };
    reader.readAsText(event.target.files[0]);
  }

  public submitRecipe() {
    try {
      const recipe = JSON.parse(this.recipe);
      this.snackBar.dismiss();
      this.backend.submitNewRecipe(recipe).subscribe(
        (data) => {
          this.logger.debug('submitted new recipe', data);
          this.dialogRef.close();
        },
        (error) => {
          this.snackBar.open(JSON.stringify(error.error), 'Dismiss');
        }
      );
    } catch {
      this.snackBar.open('Not valid JSON', 'Dismiss');
    }
  }
}
