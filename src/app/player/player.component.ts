import {Component, OnInit} from '@angular/core';
import {BackendService} from '../_services/backend.service';
import {MatSnackBar} from '@angular/material';
import {RecipeInterface} from 'pfe-ree-interface';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  public activeRecipe: RecipeInterface;

  constructor(private backend: BackendService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.backend.refreshActiveRecipe();
    this.backend.activeRecipe.subscribe(recipe => this.activeRecipe = recipe);
  }


  startAllowed() {
    return this.activeRecipe.status === 'idle';
  }

  stopAllowed() {
    return this.activeRecipe.status === 'running';
  }

  resetAllowed() {
    return (this.activeRecipe.status === 'stopped' || this.activeRecipe.status === 'completed');
  }

  start() {
    this.backend.startRecipe().subscribe(
      data => console.log(data),
      error => this.snackBar.open('Could not connect to all modules', 'Dismiss'));
  }

  reset() {
    this.backend.resetRecipe().subscribe(data => console.log(data));
  }


  abort() {
    this.backend.abortRecipe().subscribe(data => console.log(data));
  }


}
