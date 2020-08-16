import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
    ModuleInterface,
    OperationMode,
    ParameterOptions,
    ServiceInterface,
    SourceMode,
    ProcedureInterface
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

    public procedureFormControl: FormControl = new FormControl('', new FormControl());
    public changeDuration: string;
    public selectedProcedureId: string;
    public get selectedProcedure(): ProcedureInterface {
        if (this.service && this.service.procedures) {
            return this.service.procedures.find((s) => s.id === this.selectedProcedureId);
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
        if (this.service) {
            if (this.service.procedures) {
                let proc = this.service.procedures.find((procedure) => procedure.name === this.service.currentProcedure);
                if (!proc) {
                    proc = this.service.procedures.find((procedure) => procedure.isDefault);
                }
                this.selectedProcedureId = proc.id;
            }

            this.procedureFormControl.valueChanges.subscribe((procedureId: string) => {
                this.selectedProcedureId = procedureId;
                if (this.module && this.module.connected) {
                    this.backend.configureService(this.module, this.service, this.selectedProcedure.name)
                        .subscribe(
                            (data) => {
                                this.logger.trace(`Service ${this.service.name} has changed to procedure ` +
                                    `${this.selectedProcedure.name}: ${JSON.stringify(data)}`);
                            },
                            (err) => {
                                this.logger.error(`Error while changing Service ${this.service.name} ` +
                                    `to procedure ${this.selectedProcedure.name}: ${JSON.stringify(err)}`);
                                this.snackBar.open(`Error while changing Service ${this.service.name} ` +
                                    `to procedure ${this.selectedProcedure.name}`, 'Ok');
                            }
                        );
                }
            });
            this.procedureFormControl.setValue(this.selectedProcedureId);
            if (!this.service.procedures || this.service.procedures.length === 1) {
                this.procedureFormControl.disable();
            }
            this.timer = timer(0, 1000).subscribe(() => this.updateDuration());
        }
    }

    ngOnDestroy(): void {
      if(this.timer){
      this.timer.unsubscribe();
      }
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
        const procedureName: string = this.selectedProcedure.name;
        const parameters: ParameterOptions[] = this.getProcedureParameter();

        if (!this.virtualService) {
            this.backend.sendCommand(this.module.id, this.service.name, command, procedureName, parameters)
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

    public onChangeParameter(newParameter: ParameterOptions, continuousParameter = false): void {
        if (newParameter) {
            newParameter.continuous = continuousParameter;
            this.backend.configureService(this.module, this.service, undefined, [newParameter])
                .subscribe((data) => this.logger.debug('parameter changed', data));
        }
    }

    /**
     * get procedure parameters to be sent to backend (only writeable values)
     * @returns {ParameterOptions[]}
     */
    private getProcedureParameter(): ParameterOptions[] {
        const parameters = this.selectedProcedure.parameters;
        return parameters
            .filter((param) => !param.readonly)
            .map((param) => {
                return {
                    name: param.name,
                    value: this.selectedProcedure.parameters[param.name]
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
