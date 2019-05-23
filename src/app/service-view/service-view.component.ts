import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {ModuleInterface, ParameterInterface, ParameterOptions, ServiceInterface} from '@p2olab/polaris-interface';
import {Subscription, timer} from 'rxjs';
import {ModuleService} from '../_services/module.service';

@Component({
    selector: 'app-service-view',
    templateUrl: './service-view.component.html',
    styleUrls: ['./service-view.component.css']
})
export class ServiceViewComponent implements OnInit, OnDestroy {
    @Input() service: ServiceInterface;
    @Input() module: ModuleInterface;

    strategyFormControl: FormControl = new FormControl('', new FormControl());
    strategyParameterFormGroup: FormGroup = new FormGroup({}, {updateOn: 'blur'});

    public changeDuration: string;
    private timer: Subscription;

    constructor(private backend: ModuleService) {
    }

    ngOnInit() {
        if (this.service) {
            let newStrategy = this.service.strategies.find((strategy) => strategy.id === this.service.currentStrategy);
            if (!newStrategy && this.service.strategies) {
                newStrategy = this.service.strategies.find((strategy) => strategy.default);
            }
            this.strategyFormControl.valueChanges.subscribe((strategy) => {
                this.strategyParameterFormGroup = new FormGroup({}, {updateOn: 'blur'});
                strategy.parameters.forEach((param: ParameterInterface) => {
                    this.strategyParameterFormGroup
                        .registerControl(param.name, new FormControl({value: param.value, disabled: param.readonly}));
                });
                this.backend.configureStrategy(this.module, this.service, this.strategyFormControl.value)
                    .subscribe((data) => console.log('strategy changed', strategy, data));
                this.strategyParameterFormGroup.valueChanges
                    .subscribe((data) => {
                        console.log('Strategy parameter changed', this.module.id, this.service.name, data);
                        this.backend.configureStrategy(this.module, this.service, this.strategyFormControl.value, this.getParameter())
                            .subscribe((strategyReturn) => {
                                console.log('parameter sent', strategyReturn);
                            });
                    });
            });
            this.strategyFormControl.setValue(newStrategy);
            if (this.service.strategies.length === 1) {
                this.strategyFormControl.disable();
            }
        }

        this.timer = timer(0, 1000)
            .subscribe(() => this.updateDuration());
    }

    ngOnDestroy() {
        this.timer.unsubscribe();
    }

    disabled() {
        return this.service.opMode.source=='internal'
    }

    sendCommand(command: string) {
        const strategy: string = this.strategyFormControl.value.name;
        const parameters: any[] = this.getParameter();

        this.backend.sendCommand(this.module.id, this.service.name, command, strategy, parameters)
            .subscribe((data) => {
                console.log('command sent', data);
            });
    }

    private getParameter(): ParameterOptions[] {
        return Object.keys(this.strategyParameterFormGroup.value)
            .map((key) => {
                return {
                    name: key,
                    value: this.strategyParameterFormGroup.value[key]
                };
            });
    }

    private updateDuration() {
        this.service.lastChange = this.service.lastChange + 1;
        this.changeDuration = moment.duration(-this.service.lastChange, 'seconds').humanize();
    }

}
