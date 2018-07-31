import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.css']
})
export class RecipeOverviewComponent implements OnInit {

  recipe: any;
  status: any;
  private steps: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/recipe').subscribe((data) => {
      this.recipe = data;
      this.steps = Object.values(this.recipe.steps);
    });

    this.http.get('http://localhost:3000/status').subscribe((data) => {
      this.status = data;
    });
  }


  getSteps() {
    if (this.recipe)
      return Array.from(this.recipe.steps.keys());
  }
}
