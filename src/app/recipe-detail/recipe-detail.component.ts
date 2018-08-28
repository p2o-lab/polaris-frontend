import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators';
import {BackendService} from '../_services/backend.service';
import {RecipeInterface} from 'pfe-ree-interface';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material';

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
              private snackBar: MatSnackBar) {
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
