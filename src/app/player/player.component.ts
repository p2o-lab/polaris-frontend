import {Component, OnInit} from '@angular/core';
import {BackendService} from '../_services/backend.service';
import {MatSnackBar} from '@angular/material';
import {PlayerInterface, RecipeInterface, StepOptions} from 'pfe-ree-interface';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  public player: PlayerInterface;
  public currentRecipe: RecipeInterface = undefined;
    public currentStep: StepOptions | undefined;

  constructor(private backend: BackendService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.backend.refreshPlayer();
    this.backend.player.subscribe((player) => {
      this.player = player;
      if (player) {
        this.currentRecipe = player.playlist[player.currentItem];
      }
        if (this.currentRecipe) {
            this.currentStep = this.currentRecipe.options.steps.find(step => step.name === this.currentRecipe.currentStep);
        }
    });
  }


  startAllowed() {
    return (this.player.status === 'idle' || this.player.status === 'stopped' || this.player.status === 'paused');
  }

  stopAllowed() {
    return this.player.status === 'running';
  }

  pauseAllowed() {
    return this.player.status === 'running';
  }

  resetAllowed() {
    return (this.player.status === 'stopped' || this.player.status === 'completed');
  }


  start() {
    this.backend.startPlayer().subscribe(
      data => console.log(data),
      error => this.snackBar.open('Could not connect to all modules', 'Dismiss'));
  }

  reset() {
    this.backend.resetPlayer().subscribe(data => this.backend.refreshPlayer());
  }

  pause() {
    this.backend.pausePlayer().subscribe(data => console.log(data));
  }

  resume() {
    this.backend.resumePlayer().subscribe(data => console.log(data));
  }

  stop() {
    this.backend.stopPlayer().subscribe(data => console.log(data));
  }


  abort() {
    this.backend.abortAllServices().subscribe(data => console.log(data));
  }

  remove(id: number) {
    this.backend.removeRecipeFromPlaylist(id).subscribe((data) => {
        console.log(data);
        this.backend.refreshPlayer();
      }
    );
  }


}
