import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModuleInterface, ParameterOptions, ServiceInterface} from 'pfe-ree-interface';
import {NgForm} from '@angular/forms';
import {BackendService} from '../_services/backend.service';

@Component({
  selector: 'app-service-parameter-dialog',
  templateUrl: './service-parameter-dialog.component.html',
  styleUrls: ['./service-parameter-dialog.component.css']
})
export class ServiceParameterDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ServiceParameterDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public module: ModuleInterface,
              private backend: BackendService) {
  }

  ngOnInit() {
  }

  save(parameterForm: NgForm) {
    const parameters = [];
      console.log('set configuation parameters', parameterForm);
    if (parameterForm) {
      Object.keys(parameterForm.value).forEach((key) => {
        let service, param;
        [service, param] = key.split('>');
        parameters.push({service: service, parameter: param, value: parameterForm.value[key]});
      });
      console.log('Collected Parameters', parameters);

        if (this.module.services) {
            this.module.services.forEach((service: ServiceInterface) => {
                const parameterOptions: ParameterOptions[] = parameters
                    .filter(item => service.name === item.service)
                    .map((item) => ({name: item.parameter, value: item.value, continuous: false}));
                console.log('Parameters', service.name, parameterOptions);
                this.backend.configureServiceParameters(this.module, service, parameterOptions)
                    .subscribe((data) => {
                        console.log('Configuration parameters updated', data);
                        this.backend.refreshModules();
                    });
            });
        }
    }
      this.dialogRef.close();
  }
}
