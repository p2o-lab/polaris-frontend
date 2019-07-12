import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ModuleInterface, ParameterInterface, ParameterOptions, ServiceInterface} from '@p2olab/polaris-interface';
import * as moment from 'moment';
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

    constructor(private backend: ModuleService,
                private snackBar: MatSnackBar) {
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
                    .subscribe(
                        (data) => {
                            console.log(`Service ${this.service.name} has changed to strategy ${strategy.name}: ` +
                                `${JSON.stringify(data)}`);
                        },
                        (err) => {
                            console.log(`Error while changing Service ${this.service.name} to strategy ${strategy}: ` +
                                `${JSON.stringify(err)}`);
                            this.snackBar.open(`Error while changing Service ${this.service.name} ` +
                                `to strategy ${strategy}`, 'Ok');
                        }
                    );
                this.strategyParameterFormGroup.valueChanges
                    .subscribe((data) => {
                        console.log('Strategy parameter changed', this.module.id, this.service.name, data);
                        this.backend.configureStrategy(this.module, this.service,
                            this.strategyFormControl.value, this.getParameter())
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
        return this.service.opMode.source === 'internal';
    }

    sendCommand(command: string) {
        const strategy: string = this.strategyFormControl.value.name;
        const parameters: any[] = this.getParameter();

        this.backend.sendCommand(this.module.id, this.service.name, command, strategy, parameters)
            .subscribe((data) => {
                console.log('command sent', data);
            });
    }

    /**
     * get parameters to be sent to backend (only writeable values)
     * @returns {ParameterOptions[]}
     */
    private getParameter(): ParameterOptions[] {
        return this.strategyFormControl.value.parameters
            .filter((param) => !param.readonly)
            .map((param) => {
                return {
                    name: param.name,
                    value: this.strategyParameterFormGroup.value[param.name]
                };
            });
    }

    private updateDuration() {
        if (this.service && this.service.lastChange) {
            this.service.lastChange = this.service.lastChange + 1;
            this.changeDuration = moment.duration(-this.service.lastChange, 'seconds').humanize();
        }
    }

}
