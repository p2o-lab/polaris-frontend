import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from '../_services/backend.service';
import {MatSnackBar} from '@angular/material';
import {PlayerInterface, RecipeInterface, StepOptions} from 'pfe-ree-interface';
import {Subscription, timer} from 'rxjs';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {
    public player: PlayerInterface;
    public currentRecipe: RecipeInterface = undefined;
    public currentStep: StepOptions | undefined;
    public currentStepDuration: number;
    private interval;
    private timer: Subscription;

    constructor(private backend: BackendService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.currentStepDuration = 0;
        this.backend.refreshPlayer();
        /* Continously update data from backend service */
        this.backend.player.subscribe((player) => {
            this.player = player;
            if (player) {
                this.currentRecipe = player.playlist[player.currentItem];
            }
            if (this.currentRecipe) {
                const newStep = this.currentRecipe.options.steps.find(step => step.name === this.currentRecipe.currentStep);
                if (newStep !== this.currentStep) {
                    this.currentStepDuration = 0;
                }
                this.currentStep = newStep;
            }
        });

        this.timer = timer(1000, 1000)
            .subscribe(() => console.log('still alive'));
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
            data => console.log(data),
            error => this.snackBar.open('Could not connect to all modules', 'Dismiss'));
    }

    reset() {
        this.backend.resetPlayer().subscribe(data => this.backend.refreshPlayer());
    }

    pause() {
        this.backend.pausePlayer().subscribe(data => this.backend.refreshPlayer());
    }

    resume() {
        this.backend.resumePlayer().subscribe(data => this.backend.refreshPlayer());
    }

    stop() {
        this.backend.stopPlayer().subscribe(data => this.backend.refreshPlayer());
    }


    abort() {
        this.backend.abortAllServices().subscribe(data => this.backend.refreshPlayer());
    }

    forceTransition(currentStep, nextStep) {
        this.backend.playerForceTransition(currentStep, nextStep).subscribe(data => console.log(data));
    }

    remove(id: number) {
        this.backend.removeRecipeFromPlaylist(id).subscribe((data) => {
                console.log(data);
                this.backend.refreshPlayer();
            }
        );
    }
}
