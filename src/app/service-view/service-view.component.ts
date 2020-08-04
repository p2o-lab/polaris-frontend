import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
    ModuleInterface,
    OperationMode,
    ParameterOptions,
    ServiceInterface,
    SourceMode,
    StrategyInterface
} from '@p2olab/polaris-interface';
import * as moment from 'moment';
import {NGXLogger} from 'ngx-logger';
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
    @Input() virtualService = false;

    public strategyFormControl: FormControl = new FormControl('', new FormControl());
    public changeDuration: string;
    public selectedStrategyId: string;
    public get selectedStrategy(): StrategyInterface {
        if (this.service && this.service.strategies) {
            return this.service.strategies.find((s) => s.id === this.selectedStrategyId);
        } else {
            return undefined;
        }
    }
    private timer: Subscription;

    constructor(private backend: ModuleService,
                private snackBar: MatSnackBar,
                private logger: NGXLogger) {
    }

    ngOnInit(): void {
        if (this.service ) {
            if (this.service.strategies) {
                let strat = this.service.strategies.find((strategy) => strategy.name === this.service.currentStrategy);
                if (!strat) {
                    strat = this.service.strategies.find((strategy) => strategy.default);
                }
                this.selectedStrategyId = strat.id;
            }

            this.strategyFormControl.valueChanges.subscribe((strategyId: string) => {
                this.selectedStrategyId = strategyId;
                if (this.module && this.module.connected) {
                    this.backend.configureService(this.module, this.service, this.selectedStrategy.name)
                        .subscribe(
                            (data) => {
                                this.logger.trace(`Service ${this.service.name} has changed to strategy ` +
                                    `${this.selectedStrategy.name}: ${JSON.stringify(data)}`);
                            },
                            (err) => {
                                this.logger.error(`Error while changing Service ${this.service.name} ` +
                                    `to strategy ${this.selectedStrategy.name}: ${JSON.stringify(err)}`);
                                this.snackBar.open(`Error while changing Service ${this.service.name} ` +
                                    `to strategy ${this.selectedStrategy.name}`, 'Ok');
                            }
                        );
                }
            });
            this.strategyFormControl.setValue(this.selectedStrategyId);
            if (!this.service.strategies || this.service.strategies.length === 1) {
                this.strategyFormControl.disable();
            }
            this.timer = timer(0, 1000).subscribe(() => this.updateDuration());
        }
    }

    ngOnDestroy(): void {
        this.timer.unsubscribe();
    }

    disabled(): boolean {
        if (!this.module) {
            return false;
        }
        return !this.module.connected ||
            this.service.operationMode !== OperationMode.Automatic ||
            this.service.sourceMode !== SourceMode.Manual;
    }

    sendCommand(command: string): void {
        const strategyName: string = this.selectedStrategy.name;
        const parameters: ParameterOptions[] = this.getProcedureParameter();

        if (!this.virtualService) {
            this.backend.sendCommand(this.module.id, this.service.name, command, strategyName, parameters)
                .subscribe((data) => {
                    this.logger.debug('command sent', data);
                });
        } else {
            this.backend.sendVirtualServiceCommand(this.service.name, command, parameters)
                .subscribe((data) => {
                    this.logger.debug('command sent virtual service', data);
                });
        }
    }

    public onChangeParameter(newParameter: ParameterOptions, continousParameter = false): void {
        if (newParameter) {
            newParameter.continuous = continousParameter;
            this.backend.configureService(this.module, this.service, undefined, [newParameter])
                .subscribe((data) => this.logger.debug('parameter changed', data));
        }
    }

    /**
     * get procedure parameters to be sent to backend (only writeable values)
     * @returns {ParameterOptions[]}
     */
    private getProcedureParameter(): ParameterOptions[] {
        const parameters = this.selectedStrategy.parameters;
        return parameters
            .filter((param) => !param.readonly)
            .map((param) => {
                return {
                    name: param.name,
                    value: this.selectedStrategy.parameters[param.name]
                };
            });
    }

    private updateDuration() {
        if (this.service && this.service.lastChange != null) {
            this.service.lastChange = this.service.lastChange + 1;
            this.changeDuration = moment.duration(-this.service.lastChange, 'seconds').humanize();
        }
    }

}
