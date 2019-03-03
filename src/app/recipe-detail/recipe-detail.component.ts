import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RecipeInterface} from '@plt/pfe-ree-interface';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators';
import {StepFormatterService} from '../step-formatter.service';
import {RecipeService} from '../_services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  public recipe$: Observable<RecipeInterface>;

  constructor(private route: ActivatedRoute,
              private backend: RecipeService,
              private location: Location,
              private formatter: StepFormatterService) {
  }

  ngOnInit() {
    this.recipe$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.backend.getRecipe(params.get('id')))
    );
  }

  back() {
    this.location.back();
  }

}
