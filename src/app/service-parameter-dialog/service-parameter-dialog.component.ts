import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModuleInterface, ParameterOptions, ServiceInterface} from '@p2olab/polaris-interface';
import {NGXLogger} from 'ngx-logger';
import {ModuleService} from '../_services/module.service';

@Component({
  selector: 'app-service-parameter-dialog',
  templateUrl: './service-parameter-dialog.component.html',
  styleUrls: ['./service-parameter-dialog.component.css']
})
export class ServiceParameterDialogComponent {

  constructor(public dialogRef: MatDialogRef<ServiceParameterDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public module: ModuleInterface,
              private moduleService: ModuleService,
              private logger: NGXLogger) {
  }

  save(parameterForm: NgForm) {
    const parameters = [];
    this.logger.info('set configuration parameters', parameterForm);
    if (parameterForm) {
      Object.keys(parameterForm.value).forEach((key) => {
        let service;
        let param;
        [service, param] = key.split('>');
        parameters.push({service, parameter: param, value: parameterForm.value[key]});
      });
      this.logger.debug('Collected Parameters', parameters);

      if (this.module.services) {
            this.module.services.forEach((service: ServiceInterface) => {
                const parameterOptions: ParameterOptions[] = parameters
                    .filter((item) => service.name === item.service)
                    .map((item) => ({name: item.parameter, value: item.value, continuous: false}));
                this.logger.debug('Parameters', service.name, parameterOptions);
                this.moduleService.configureService(this.module, service, undefined, parameterOptions)
                    .subscribe((data) => {
                        this.logger.debug('Configuration parameters updated', data);
                        this.moduleService.refreshModulesViaHttp();
                    });
            });
        }
    }
    this.dialogRef.close();
  }
}
