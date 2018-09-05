import {Component, OnInit} from '@angular/core';
import {BackendService} from '../_services/backend.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

  recipe: string;

  constructor(private backend: BackendService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  public previewFile(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.recipe = e.target.result;

    };
    reader.readAsText(event.target.files[0]);
  }

  editRecipe() {
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

  cancel() {
    this.router.navigate(['/recipe']);
  }
}
