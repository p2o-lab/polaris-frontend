import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ParameterInterface, ServiceInterface, ProcedureInterface} from '@p2olab/polaris-interface';
import * as moment from 'moment';
import {Subscription, timer} from 'rxjs';

@Component({
    selector: 'app-service-settings',
    templateUrl: './service-settings.component.html',
    styleUrls: ['./service-settings.component.scss']
})
export class ServiceSettingsComponent implements OnInit, OnDestroy {

    currentService: ServiceInterface;
    serviceProcedures: ProcedureInterface[];
    currentProcedure: ProcedureInterface;
    serviceParameter: ParameterInterface[] = [];
    procedureParameter: ParameterInterface[] = [];
    // needed for resetting the parameter values
    prevServiceParameters: ParameterInterface[] = [];
    prevProcedureParameters: ParameterInterface[] = [];

    public changeDuration: string;

    private timer: Subscription;

    constructor(
        private dialogRef: MatDialogRef<ServiceSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) data,
        private snackBar: MatSnackBar
    ) {
      this.currentService = data.service;
    }

    ngOnInit(): void {
       // fill the modal with data
      this.serviceParameter = this.currentService.parameters;
      this.serviceProcedures = this.currentService.procedures;

      this.currentService.procedures.forEach((procedure) => {
        if (procedure.name === this.currentService.currentProcedure) {
          this.currentProcedure = procedure;
          this.procedureParameter = procedure.parameters;
        }
      });

      this.timer = timer(0, 1000)
        .subscribe(() => this.updateDuration());
    }

    /**
     *  close dialog and save nothing
     */
    close(): void {
        this.dialogRef.close();
    }

    /**
     * apply all changes from dialog with the help of OPC-UA-Service
     */
    apply(): void {
        /*this.subscriptions.add(this.store$.pipe(select(selectModuleOfService(this.currentService.id))).subscribe(
            (_module) => {
                this.serviceParameter.forEach(
                    (param) => {
                        this.opcuaService.postNodeWithNewValue(_module, param.valueNode, param.value);
                    }
                );
                this.strategyParameter.forEach(
                    (param) => {
                        this.opcuaService.postNodeWithNewValue(_module, param.valueNode, param.value);
                    }
                );
            }
        ));*/
    }

    /**
     * reset all parameters to value of valueNode (previous value)
     */
    reset(): void {
      // this.procedureParameter = this.prevProcedureParameters;
      this.snackBar.open('Not implemented yet');
    }

    /**
     *
     */
    showProcedureParameters(): void {
      // read form & display parameters
    }
    /**
     * unsubscribe from all subscriptions
     */
    ngOnDestroy(): void {
      this.timer.unsubscribe();
    }

    private updateDuration() {
      if (this.currentService && this.currentService.lastChange) {
        this.currentService.lastChange = this.currentService.lastChange + 1;
        this.changeDuration = moment.duration(-this.currentService.lastChange, 'seconds').humanize();
      }
    }

}
