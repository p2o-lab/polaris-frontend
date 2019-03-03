import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {
    ConditionOptions, ConditionType, ParameterInterface, PlayerInterface, RecipeInterface, StepOptions,
    TransitionOptions
} from '@plt/pfe-ree-interface';
import {Subscription, timer} from 'rxjs';
import {BackendService} from '../_services/backend.service';
import * as moment from 'moment';
import {SettingsService} from '../_services/settings.service';
import {StepFormatterService} from '../step-formatter.service';
import {PlayerService} from '../_services/player.service';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {
    public player: PlayerInterface;
    public currentRecipe: RecipeInterface = undefined;
    public currentStep: StepOptions | undefined;
    private timer: Subscription;
    private changeDuration: string;

    constructor(private backend: PlayerService,
                public settings: SettingsService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.backend.refreshPlayer();
        /* Continuously update data from backend service */
        this.backend.player.subscribe((player) => {
            this.player = player;
            if (player) {
                this.currentRecipe = player.playlist[player.currentItem];
            }
            if (this.currentRecipe) {
                const newStep = this.currentRecipe.options.steps
                    .find((step) => step.name === this.currentRecipe.currentStep);
                this.currentStep = newStep;
            }
        });

        this.timer = timer(0, 1000)
            .subscribe(() => this.updateDuration());
    }

    ngOnDestroy() {
        this.timer.unsubscribe();
    }

    startAllowed() {
        return (this.player.status === 'idle' || this.player.status === 'paused');
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
            (data) => console.log('start player', data),
            (error) => this.snackBar.open(error.error.error, 'Dismiss'));
    }

    reset() {
        this.backend.resetPlayer().subscribe((data) => this.backend.refreshPlayer());
    }

    pause() {
        this.backend.pausePlayer().subscribe((data) => this.backend.refreshPlayer());
    }

    resume() {
        this.backend.resumePlayer().subscribe((data) => this.backend.refreshPlayer());
    }

    stop() {
        this.backend.stopPlayer().subscribe((data) => this.backend.refreshPlayer());
    }

    forceTransition(nextStep) {
        this.backend.playerForceTransition(this.currentStep.name, nextStep).subscribe((data) => console.log(data));
    }

    remove(id: number) {
        this.backend.removeRecipeFromPlaylist(id).subscribe((data) => {
                this.backend.refreshPlayer();
            }
        );
    }

    private updateDuration() {
        if (this.currentRecipe) {
            this.currentRecipe.lastChange = this.currentRecipe.lastChange + 1;
            this.changeDuration = moment.duration(-this.currentRecipe.lastChange, 'seconds').humanize();
        }
    }
}
