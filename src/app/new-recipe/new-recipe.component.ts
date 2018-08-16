import {Component, OnInit} from '@angular/core';
import {BackendService} from '../backend.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

  recipe: any;

  constructor(private backend: BackendService,
              private router: Router) {
  }

  ngOnInit() {
    this.recipe = JSON.stringify(this.backend.recipe.options) || undefined;
  }

  public previewFile(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.recipe = e.target.result;

    };
    reader.readAsText(event.target.files[0]);
  }

  editRecipe() {
    this.backend.editRecipe(JSON.parse(this.recipe)).subscribe((data) => {
      this.router.navigate(['/recipe']);
    });
  }

  cancel() {
    this.router.navigate(['/recipe']);
  }
}
