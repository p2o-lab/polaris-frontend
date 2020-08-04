import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {PlayerInterface, RecipeInterface} from '@p2olab/polaris-interface';
import * as moment from 'moment';
import {NGXLogger} from 'ngx-logger';
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
    private timer: Subscription;
    private changeDuration: string;

    constructor(private playerService: PlayerService,
                public settings: SettingsService,
                private snackBar: MatSnackBar,
                private formatter: StepFormatterService,
                private logger: NGXLogger) {
    }

    ngOnInit(): void {
        /* Continuously update data from backend service */
        this.playerService.player.subscribe((player) => {
            this.logger.debug('Got new info for player', player);
            this.player = player;
        });

        this.timer = timer(0, 1000)
            .subscribe(() => {
                this.updateDuration();
            });
    }

    ngOnDestroy(): void {
        this.timer.unsubscribe();
    }

    startAllowed(): boolean {
        return (this.player.status === 'idle' || this.player.status === 'paused');
    }

    stopAllowed(): boolean {
        return this.player.status === 'running';
    }

    pauseAllowed(): boolean {
        return this.player.status === 'running';
    }

    resetAllowed(): boolean {
        return (this.player.status === 'stopped' || this.player.status === 'completed');
    }

    start(): void {
        this.playerService.startPlayer().subscribe(
            (data) => {
                this.logger.debug('start player', data);
                this.playerService.refreshPlayer();
            },
            (error) => this.snackBar.open(error.error.error, 'Dismiss')
        );
    }

    reset(): void {
        this.playerService.resetPlayer().subscribe(() => this.playerService.refreshPlayer());
    }

    pause(): void {
        this.playerService.pausePlayer().subscribe(() => this.playerService.refreshPlayer());
    }

    resume(): void {
        this.playerService.resumePlayer().subscribe(() => this.playerService.refreshPlayer());
    }

    stop(): void {
        this.playerService.stopPlayer().subscribe(() => this.playerService.refreshPlayer());
    }

    forceTransition(nextStep: string): void {
        this.playerService.playerForceTransition(this.player.currentRecipe.currentStep.name, nextStep)
            .subscribe((data) => this.logger.debug('transitions forced', data));
    }

    remove(id: number): void {
        this.playerService.removeRecipeFromPlaylist(id).subscribe(() => {
                this.playerService.refreshPlayer();
            }
        );
    }

    public getTime(time: moment.MomentInput): string {
        return moment(time).calendar();
    }

    public getDuration(startTime: moment.MomentInput, endTime: moment.MomentInput): string {
        return moment.duration(moment(startTime).diff(moment(endTime))).humanize();
    }

    private updateDuration() {
        if (this.player && this.player.currentRecipe && this.player.currentRecipe.lastChange) {
            this.player.currentRecipe.lastChange = this.player.currentRecipe.lastChange + 1;
            this.changeDuration = moment.duration(-this.player.currentRecipe.lastChange, 'seconds').humanize();
        }
    }
}
