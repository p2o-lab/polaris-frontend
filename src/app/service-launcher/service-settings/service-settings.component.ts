import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ParameterInterface, ServiceInterface, StrategyInterface} from '@p2olab/polaris-interface';
import * as cloneDeep from 'lodash';
import * as moment from 'moment';
import {Subscription, timer} from 'rxjs';
import {ModuleService} from '../../_services/module.service';

@Component({
    selector: 'app-service-settings',
    templateUrl: './service-settings.component.html',
    styleUrls: ['./service-settings.component.scss']
})
export class ServiceSettingsComponent implements OnInit, OnDestroy {

    currentService: ServiceInterface;
    serviceStrategies: StrategyInterface[];
    currentStrategy: StrategyInterface;
    serviceParameter: ParameterInterface[] = [];
    strategyParameter: ParameterInterface[] = [];
    // needed for resetting the parameter values
    prevServiceParameters: ParameterInterface[] = [];
    prevStrategyParameters: ParameterInterface[] = [];

    public changeDuration: string;

    private timer: Subscription;

    constructor(
        private dialogRef: MatDialogRef<ServiceSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) data,
        private snackBar: MatSnackBar
    ) {
      this.currentService = data.service;
    }

    ngOnInit() {
       // fill the modal with data
      this.serviceParameter = this.currentService.parameters;
      this.serviceStrategies = this.currentService.strategies;

      this.currentService.strategies.forEach((strategy, index) => {
        if (strategy.name === this.currentService.currentStrategy) {
          this.currentStrategy = strategy;
          this.strategyParameter = strategy.parameters;
        }
      });

      this.timer = timer(0, 1000)
        .subscribe(() => this.updateDuration());
    }

    /**
     *  close dialog and save nothing
     */
    close() {
        this.dialogRef.close();
    }

    /**
     * apply all changes from dialog with the help of opcuaService
     */
    apply() {
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
    reset() {
      // this.strategyParameter = this.prevStrategyParameters;
      this.snackBar.open('Not implemented yet');
    }

    /**
    *
    */
    showStrategyParameters() {
      // read form & display parameters
    }
    /**
     * unsubscribe from all subscriptions
     */
    ngOnDestroy() {
      this.timer.unsubscribe();
    }

    private updateDuration() {
      if (this.currentService && this.currentService.lastChange) {
        this.currentService.lastChange = this.currentService.lastChange + 1;
        this.changeDuration = moment.duration(-this.currentService.lastChange, 'seconds').humanize();
      }
    }

}
