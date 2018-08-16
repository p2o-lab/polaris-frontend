import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-service-view',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.css']
})
export class ServiceViewComponent implements OnInit {

  @Input() service: any;
  @Input() module: any;

  public strategy;

  constructor(private backend: BackendService) {
  }

  ngOnInit() {
    this.strategy = this.service.strategies.find(strategy => strategy.default);
  }

  sendCommand(command: string, parameterForm: NgForm) {
    const strategy = parameterForm ? parameterForm.value.selectedStrategy.name : undefined;
    const parameters = [];

    if (parameterForm) {
      Object.keys(parameterForm.value).forEach((key, value) => {
        if (key !== 'selectedStrategy') {
          parameters.push({name: key, value: value});
        }
      });
    }

    this.backend.sendCommand(this.module.id, this.service.name, command, strategy, parameters)
      .subscribe(data => {
        this.backend.refreshModules();
      });
  }


}
