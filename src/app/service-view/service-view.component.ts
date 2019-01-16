import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {ModuleInterface, ServiceInterface, StrategyInterface} from '@plt/pfe-ree-interface';
import {Subscription, timer} from 'rxjs';
import {BackendService} from '../_services/backend.service';

@Component({
    selector: 'app-service-view',
    templateUrl: './service-view.component.html',
    styleUrls: ['./service-view.component.css']
})
export class ServiceViewComponent implements OnInit, OnDestroy {
    @Input() service: ServiceInterface;
    @Input() module: ModuleInterface;

    public strategy: StrategyInterface;

    public changeDuration: string;
    private timer: Subscription;

    constructor(private backend: BackendService) {
    }

    ngOnInit() {
        if (this.service.strategies) {
            this.strategy = this.service.strategies.find((strategy) => strategy.default);
        }
        this.timer = timer(0, 1000)
            .subscribe(() => this.updateDuration());
    }

    ngOnDestroy() {
        this.timer.unsubscribe();
    }

    sendCommand(command: string, parameterForm?: NgForm) {
        const strategy: string = this.strategy ? this.strategy.name : undefined;
        const parameters = [];

        if (parameterForm) {
            Object.keys(parameterForm.value).forEach((key) => {
                if (key !== 'selectedStrategy') {
                    parameters.push({name: key.replace(this.service.name + '>', ''), value: parameterForm.value[key]});
                }
            });
        }
        console.log('Strategy', strategy, 'Parameters', parameters);

        this.backend.sendCommand(this.module.id, this.service.name, command, strategy, parameters)
            .subscribe((data) => {
                console.log('command sent', data);
            });
    }

    private updateDuration() {
        this.changeDuration = moment(new Date()).to(this.service.lastChange);
    }

}
