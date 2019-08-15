import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {ModuleInterface, ParameterOptions, ServiceInterface} from '@p2olab/polaris-interface';
import {Observable, Subscription} from 'rxjs';
import {ModuleService} from '../_services/module.service';
import {ServiceSettingsComponent} from './service-settings/service-settings.component';

@Component({
  selector: 'app-service-launcher',
  templateUrl: './service-launcher.component.html',
  styleUrls: ['./service-launcher.component.scss']
})
export class ServiceLauncherComponent implements OnInit {
  modules$: Observable<ModuleInterface[]> = this.backend.modules;
  modulesWithServices: ModuleInterface[] = [];
  services: ServiceInterface[] = [];
  pinnedServiceArray: ServiceInterface[] = [];
  states: any[] = [];
  activeServices: any[];

  data: any;
  sorting: string;

  strategyFormControl: FormControl = new FormControl('', new FormControl());
  strategyParameterFormGroup: FormGroup = new FormGroup({}, {updateOn: 'blur'});

  public changeDuration: string;

  /**
   * all available sorting methods (used for directives)
   */
  sortingOptions: { default: string; activity: string; module: string; alphabetically: string; state: string } =
    {
      default: 'default',
      alphabetically: 'alphabetisch',
      module: 'nach Modul',
      state: 'nach Zustand',
      activity: 'nach Aktivität'
    };
  sortingOptionsArray: string[] = ['default', 'alphabetisch', 'nach Modul', 'nach Zustand', 'nach Aktivität'];
  private timer: Subscription;

  constructor(private backend: ModuleService, private snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  /**
   * subscribe to current module selection and already pinned services
   */
  ngOnInit() {
    this.sorting = this.sortingOptions.alphabetically;

    this.modules$.subscribe((data) => {
      // Refresh the data in the directives
      if (data.length > 0) {
        this.modulesWithServices = [];
        this.services = [];
        for (const module of data) {
          if ((module.services) && (module.services.length > 0)) {
            this.modulesWithServices.push(module);
            for (const service of module.services) {
              this.services.push(service);
            }
          }
        }
        console.log('ServiceLauncher got ' + data.length + ' modules to render.');
      }
    });
  }

  /**
   * triggered from EventEmitter in ServiceLauncher-Button
   * onClick of service icon (svg)
   * open dialog and set current service in appState to this service
   * @param service - clicked service
   */
  openDialog(service: ServiceInterface) {
    const config = new MatDialogConfig();
    config.data = {
      'service': service
    };
    const modal: MatDialogRef<ServiceSettingsComponent> = this.dialog.open(ServiceSettingsComponent, config);
  }

  /**
   * triggered from EventEmitter in ServiceLauncher-Button
   * onClick of flag icon (svg)
   * dispatch newly pinned or unpinned service in ngrx store => all lists get updated
   * @param service - clicked service
   */
  pinService(service: ServiceInterface) {
    let reminder: number = 0;
    this.pinnedServiceArray.forEach((pinnedService, index) => {
      if (pinnedService.name === service.name) {
        // if element is found, delete it from the pin list
        reminder++;
        this.pinnedServiceArray.splice(index, 1);
      }
    });
    // if it's not in the list, put it in
    if (reminder === 0) {
      this.pinnedServiceArray.push(service);
    }
  }

  /**
   * filter all services by input of search bar
   * @param event - input of search bar
   */
  onKey(event) {
    this.sorting = this.sortingOptions.default;
    // this.serviceArray = this.store$.pipe(
    // select(selectAllServicesFromModulesWhichStartsWith(this.moduleIds, event.target.value)));
  }

  /**
   * sort all services by selected sorting option
   */
  onSelect() {

    switch (this.sorting) {
      case this.sortingOptions.default:
        this.sorting = this.sortingOptions.default;
        break;
      case this.sortingOptions.alphabetically:
        this.sorting = this.sortingOptions.alphabetically;
        break;
      case this.sortingOptions.module:
        this.sorting = this.sortingOptions.module;
        break;
      case this.sortingOptions.state:
        this.sorting = this.sortingOptions.state;
        // create object with all the states
        this.services.forEach((service) => {
          // short memo if the state was found
          let reminder: number = 0;
          // check already existing array, if the current state is already in there
          this.states.forEach((state) => {
            if (state.state === service.status) {
              state.services.push(service);
              reminder++;
            }
          });
          // if the state was not found, push a new item in the states array
          if (reminder === 0) {
            this.states.push({state: service.status, services: [service]});
          }
        });
        break;
      case this.sortingOptions.activity:
        this.sorting = this.sortingOptions.activity;
        // create array with the active services
        this.activeServices = [{activity: true, services: []}, {activity: false, services: []}];
        this.services.forEach((service) => {
          // check if the service is idling
          if (service.status === 'IDLE') {
            this.activeServices[0].services.push(service);
          } else {
            this.activeServices[1].services.push(service);
          }
        });
        break;
      default:
        console.warn('Sorting not available');
        break;
    }
  }

  /**
   * drop function, service got dragged into pinned service section
   * @param $event -  DragAndDrop Event from angular cdk
   */
  droppedInPinnedSection($event) {
    const service = $event.item.data;
    if (service.pinned) {
      console.log('do nothing');
    } else {
      service.pinned = true;
      this.pinService(service);
    }
  }

  /**
   * drop function, service got dragged into normal (unpinned) service section
   * @param $event -  DragAndDrop Event from angular cdk
   */
  droppedInUnpinnedSection($event) {
    const service = $event.item.data;
    if (!service.pinned) {
      console.log('do nothing');
    } else {
      service.pinned = false;
      this.pinService(service);
    }
  }

  /**
   * triggered from EventEmitter in ServiceLauncher-Button
   * onClick of Action buttons (svg)
   * @param action -  type of clicked action button
   *
   * TODO: react to events.
   * TODO: Adding argument 'Action' to service and set it here + commit to opcua server
   */
  setAction(action: string) {
    switch (action) {
      case 'stateChange':
        break;
      case 'abort':
        break;
      case 'hold':
        break;
      case 'stop':
        break;
      case 'pause':
        break;
    }
  }

  /*
    Send opcua control command via backend service
   */
  sendCommand(command: string) {
    const strategy: string = this.strategyFormControl.value.name;
    const parameters: any[] = this.getParameter();

    // this.backend.sendCommand(this.module.id, this.service.name, command, strategy, parameters)
    //   .subscribe((data) => {
    //     console.log('command sent', data);
    //   });
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
}
