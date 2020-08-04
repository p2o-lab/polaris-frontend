import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RecipeInterface} from '@p2olab/polaris-interface';
import {NGXLogger} from 'ngx-logger';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators';
import {RecipeService} from '../_services/recipe.service';
import {StepFormatterService} from '../_services/step-formatter.service';

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
              private formatter: StepFormatterService,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.recipe$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.backend.getRecipe(params.get('id')))
    );
    this.logger.trace('Load recipe on init', this.recipe$);
  }

  back(): void {
    this.location.back();
  }

}
