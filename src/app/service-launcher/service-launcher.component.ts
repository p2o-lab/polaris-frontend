import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {ModuleInterface, ParameterInterface, ParameterOptions, ServiceInterface} from '@p2olab/polaris-interface';
import * as moment from 'moment';
import {Observable, Subscription, timer} from 'rxjs';
import { ModuleService} from '../_services/module.service';
import { ServiceSettingsComponent } from './service-settings/service-settings.component';

@Component({
    selector: 'app-service-launcher',
    templateUrl: './service-launcher.component.html',
    styleUrls: ['./service-launcher.component.scss']
})
export class ServiceLauncherComponent implements OnInit, OnDestroy {
  modules$: Observable<ModuleInterface[]> = this.backend.modules;
  modulesWithServices: ModuleInterface[];
  services: ServiceInterface[];

  data;
  pinnedServiceArray: Observable<ServiceInterface[]>;
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

  constructor( private backend: ModuleService, private snackBar: MatSnackBar, public dialog: MatDialog) {}

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

  ngOnDestroy(): void {

  }
    /**
     * triggered from EventEmitter in ServiceLauncher-Button
     * onClick of service icon (svg)
     * open dialog and set current service in appState to this service
     * @param service - clicked service
     */
  openDialog(service: ServiceInterface) {
         const config = new MatDialogConfig();
         const modal: MatDialogRef<ServiceSettingsComponent> = this.dialog.open(ServiceSettingsComponent, config);
         // set selected service in ngrx state
//         this.appStateService.setService(service.id);
    }

    /**
     * triggered from EventEmitter in ServiceLauncher-Button
     * onClick of flag icon (svg)
     * dispatch newly pinned or unpinned service in ngrx store => all lists get updated
     * @param service - clicked service
     */
  pinService(service: ServiceInterface) {
        const newPinnedService = service;
/*        this.store$.dispatch(new UpdateService(
          {service: {id: Number(service.id), changes: service = newPinnedService}})); */
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
     * sort all services by sorting option
     * @param sorting -  sorting option, selection in DropDown menu
     *
     * TODO : sort by activity and by state, implement state and activity for services and reducer,
     * TODO : which filters services by corresponding arguments
     */
  onSelect() {

            switch (this.sorting) {
            case this.sortingOptions.default:
                // this.serviceArray = this.store$.pipe(select(selectAllServicesFromModules(this.moduleIds)));
                this.sorting = this.sortingOptions.default;
                break;
            case this.sortingOptions.alphabetically:
                // this.serviceArray = this.store$.pipe(
              // select(selectAllServicesFromModulesAlphabetically(this.moduleIds)));
                this.sorting = this.sortingOptions.alphabetically;
                break;
            case this.sortingOptions.module:
                // this.serviceArray = this.store$.pipe(select(selectAllServicesFromModulesSeperately(this.moduleIds)));
                this.sorting = this.sortingOptions.module;
                break;
            case this.sortingOptions.state:
                // TODO: implement sort by state functionality
                this.sorting = this.sortingOptions.state;
                break;
            case this.sortingOptions.activity:
                // TODO: implement sort by activity functionality
                this.sorting = this.sortingOptions.activity;
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
  dropedInPinnedSection($event) {
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
  dropedInUnpinnedSection($event) {
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
     * TODO: Adding argument 'Action' to service and set it here + dispatch in ngrx store + commit to opcua server
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
}
