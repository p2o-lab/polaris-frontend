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

    constructor(private backend: BackendService,
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
            (error) => this.snackBar.open(error, 'Dismiss'));
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

    abort() {
        this.backend.abortAllServices().subscribe((data) => this.backend.refreshPlayer());
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

    /**
     * formats transition options
     * @param {ConditionOptions} condition
     * @returns {string}
     */
    conditionToString(condition: ConditionOptions) {
        if (condition.type === ConditionType.time) {
            return `duration == ${condition.duration}`;
        }
        if (condition.type === ConditionType.state) {
            if (condition.module) {
                return `${condition.module}.${condition.service} == ${condition.state}`;
            } else {
                return `${condition.service} == ${condition.state}`;
            }
        }
        if (condition.type === ConditionType.variable) {
            if (condition.module) {
                return `${condition.module}.${condition.variable} ${condition.operator} ${condition.value}`;
            } else {
                return `${condition.variable} ${condition.operator} ${condition.value}`;
            }
        }
        if (condition.type === ConditionType.not) {
            return `!(${this.conditionToString(condition.condition)})`;
        }
        if (condition.type === ConditionType.and) {
            return condition.conditions.map((c) => `(${this.conditionToString(c)})`).join(' && ');
        }
        if (condition.type === ConditionType.or) {
            return condition.conditions.map((c) => `(${this.conditionToString(c)})`).join(' || ');
        }
    }

    parameterToString(parameter: ParameterInterface[]) {
        return parameter.map((param) => `${param.name}=${param.value}`).join(', ');
    }

    private updateDuration() {
        if (this.currentRecipe) {
            this.changeDuration = moment(new Date()).to(this.currentRecipe.lastChange);
        }
    }
}
