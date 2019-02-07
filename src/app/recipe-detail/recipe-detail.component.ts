import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RecipeInterface} from '@plt/pfe-ree-interface';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators';
import {BackendService} from '../_services/backend.service';
import {ParameterInterface} from '@plt/pfe-ree-interface/dist/interfaces';
import {ConditionOptions} from '@plt/pfe-ree-interface/dist/options';
import {ConditionType} from '@plt/pfe-ree-interface/dist/enum';
import {StepFormatterService} from '../step-formatter.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  public recipe$: Observable<RecipeInterface>;

  constructor(private route: ActivatedRoute,
              private backend: BackendService,
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
