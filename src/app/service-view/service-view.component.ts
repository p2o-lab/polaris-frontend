import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BackendService} from '../_services/backend.service';
import {ModuleInterface, ServiceInterface} from 'pfe-interface';
import {StrategyInterface} from 'pfe-interface/dist/interfaces';

@Component({
  selector: 'app-service-view',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.css']
})
export class ServiceViewComponent implements OnInit {

  @Input() service: ServiceInterface;
  @Input() module: ModuleInterface;

  public strategy: StrategyInterface;

  constructor(private backend: BackendService) {
  }

  ngOnInit() {
    this.strategy = this.service.strategies.find(strategy => strategy.default);
  }

  sendCommand(command: string, parameterForm: NgForm) {
    const strategy: string = parameterForm ? parameterForm.value.selectedStrategy.name : undefined;
    const parameters = [];

    if (parameterForm) {
      Object.keys(parameterForm.value).forEach((key,) => {
        if (key !== 'selectedStrategy') {
          parameters.push({name: key.replace(this.service.name + '>', ''), value: parameterForm.value[key]});
        }
      });
      console.log('Parameters', parameters);
    }

    this.backend.sendCommand(this.module.id, this.service.name, command, strategy, parameters)
      .subscribe(data => {
        this.backend.refreshModules();
      });
  }


}
