import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {PlayerInterface, RecipeInterface, StepOptions} from '@p2olab/polaris-interface';
import * as moment from 'moment';
import {Subscription, timer} from 'rxjs';
import {PlayerService} from '../_services/player.service';
import {SettingsService} from '../_services/settings.service';
import {StepFormatterService} from '../_services/step-formatter.service';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {
    public player: PlayerInterface;
    public currentRecipe: RecipeInterface = undefined;
    public currentStep: StepOptions;
    private timer: Subscription;
    private changeDuration: string;

    constructor(private playerService: PlayerService,
                public settings: SettingsService,
                private snackBar: MatSnackBar,
                private formatter: StepFormatterService) {
    }

    ngOnInit() {
        /* Continuously update data from backend service */
        this.playerService.player.subscribe((player) => {
            console.log('Got new info for player', player);
            this.player = player;
        });

        this.timer = timer(0, 1000)
            .subscribe(() => {
                this.updateDuration();
            });
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
        this.playerService.startPlayer().subscribe(
            (data) => {
                console.log('start player', data);
                this.playerService.refreshPlayer();
            },
            (error) => this.snackBar.open(error.error.error, 'Dismiss')
        );
    }

    reset() {
        this.playerService.resetPlayer().subscribe((data) => this.playerService.refreshPlayer());
    }

    pause() {
        this.playerService.pausePlayer().subscribe((data) => this.playerService.refreshPlayer());
    }

    resume() {
        this.playerService.resumePlayer().subscribe((data) => this.playerService.refreshPlayer());
    }

    stop() {
        this.playerService.stopPlayer().subscribe((data) => this.playerService.refreshPlayer());
    }

    forceTransition(nextStep) {
        this.playerService.playerForceTransition(this.player.currentRecipe.currentStep.name, nextStep)
            .subscribe((data) => console.log('transitions forced', data));
    }

    remove(id: number) {
        this.playerService.removeRecipeFromPlaylist(id).subscribe((data) => {
                this.playerService.refreshPlayer();
            }
        );
    }

    public getTime(time): string {
        return moment(time).calendar();
    }

    public getDuration(startTime, endTime): string {
        return moment.duration(moment(startTime).diff(moment(endTime))).humanize();
    }

    private updateDuration() {
        if (this.player && this.player.currentRecipe && this.player.currentRecipe.lastChange) {
            this.player.currentRecipe.lastChange = this.player.currentRecipe.lastChange + 1;
            this.changeDuration = moment.duration(-this.player.currentRecipe.lastChange, 'seconds').humanize();
        }
    }
}
