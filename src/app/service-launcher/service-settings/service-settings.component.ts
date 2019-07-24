import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ParameterInterface, ServiceInterface, StrategyInterface} from '@p2olab/polaris-interface';
import * as moment from 'moment';
import {Subscription, timer} from 'rxjs';

@Component({
    selector: 'app-service-settings',
    templateUrl: './service-settings.component.html',
    styleUrls: ['./service-settings.component.scss']
})
export class ServiceSettingsComponent implements OnInit, OnDestroy {

    unitMapping;
    currentService: ServiceInterface;
    serviceStrategies: StrategyInterface[];
    currentStrategy: StrategyInterface;
    serviceParameter: ParameterInterface[] = [];
    strategyParameter: ParameterInterface[] = [];

    public changeDuration: string;

    private timer: Subscription;

    constructor(
        private dialogRef: MatDialogRef<ServiceSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) data
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
      * get service of id
      * get strategies of service
      * @param id - id of currently selected service
      */
    getService(id) {
/*        this.subscriptions.add(this.store$.pipe(select(selectSpecificServices([id]))).subscribe(
            (_service) => {
                this.currentService = _service[0];
            }
        ));
        if (this.currentService) {
            this.subscriptions.add(this.store$.pipe(
              select(selectSpecificStrategies(this.currentService.strategies))).subscribe(
                (_strats) => {
                    this.serviceStrategies = _strats;
                    this.showServiceParameter();
                }
            ));
        }*/
    }

    /**
     * get service parameter
     */
    showServiceParameter() {
/*        this.subscriptions.add(this.store$.pipe(
          select(selectSpecificNamedNodeCollections(this.currentService.parameters))).subscribe(
            (_params) => {
                this.serviceParameter = this.createParameter(_params);
            }
        ));*/
    }

     /**
      * helper function to create an array of parameter objects
      * which easily bind to angular directives in layout
      * transform nodes to there proper interpretation
      *
      * @params - parameters of currently selected service
      *
      * TODO: use correct name for op_mode Node (OpMode or op_mode ?!)
      */
    createParameter(params) {
        const tmpArray = [];

        params.forEach((param) => {
            const paramNorm = {
                name: null,
                value: null,
                valueNode: null,
                min: null,
                max: null,
                unit: null,
            };
            paramNorm.name = param.name;
            /*this.subscriptions.add(this.store$.pipe(select(selectNodesFromNamedNodeCollection(param.id))).subscribe(
                    (_nodes) => {
                        _nodes.forEach((node) => {
                            switch (node.name) {
                                case 'VOut':
                                    paramNorm.value = node.value;
                                    paramNorm.valueNode = node;
                                    break;
                                case 'VMin':
                                    paramNorm.min = node.value;
                                    break;
                                case 'VMax':
                                    paramNorm.max = node.value;
                                    break;
                                case 'VUnit':
                                    paramNorm.unit = node.value;
                                    if (this.unitMapping) {
                                        if (this.unitMapping[node.value]) {
                                            paramNorm.unit = this.unitMapping[node.value].unit;
                                        }
                                    }
                                    break;
                                case 'op_mode':
                                    this.showOperationMode(node);
                                default:
                                    break;
                            }
                        });
                    }
                ));*/
            tmpArray.push(paramNorm);
        });
        return tmpArray;
    }

    /**
     * get strategy parameter
     */
    showStrategyParameter() {
/*        this.subscriptions.add(this.store$.pipe(
          select(selectSpecificNamedNodeCollections(this.currentStrategy.parameters))).subscribe(
            (_params) => {
                this.strategyParameter = this.createParameter(_params);
            }
        ));*/
    }

    /**
     * TODO: transform node value to proper OpMode state by decoding value
     * generate svg
     */
    showOperationMode(node) {
        console.log('OpMode', node);
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
        this.serviceParameter.map((param) => {
            param.value = param.valueNode.value;
        });
        this.strategyParameter.map((param) => {
            param.value = param.valueNode.value;
        });
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
