import { Component, OnInit , OnDestroy } from '@angular/core';
import { Module } from '../../models/module.model';
import { Subplant } from '../../models/subplant.model';
import { ServiceSettingsComponent } from './service-settings/service-settings.component';
import { select, Store } from '@ngrx/store';
import {selectModuleSelection,
        selectAllServicesFromModules,
        State,
        selectAllPinnedServices,
        selectAllServicesFromModulesAlphabetically,
        selectAllServicesFromModulesWhichStartsWith,
        selectAllServicesFromModulesSeperately} from '../../reducers';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import { Service } from 'src/app/models/service.model';
import { AppStateService } from '../../services/app-state.service';
import { UpdateService } from 'src/app/actions/service.actions';


@Component({
    selector: 'app-service-launcher',
    templateUrl: './service-launcher.component.html',
    styleUrls: ['./service-launcher.component.scss']
})

export class ServiceLauncherComponent implements OnInit, OnDestroy {
    data: Subplant;
    serviceArray;
    subscriptions;
    pinnedServiceArray: Observable<Service[]>;
    moduleIds;
    sorting;


    /**
     * all available sorting methods (used for directives)
     */
    SortingOptions = {
        default: 'default',
        alphabetically: 'alphabetisch',
        module: 'nach Modul',
        state: 'nach Zustand',
        activity: 'nach Aktivität'
    };


    constructor( private store$: Store<State>, private appStateService: AppStateService, public dialog: MatDialog) {}


    /**
     * subscribe to current module selection and already pinned services
     */
    ngOnInit() {
        this.sorting = this.SortingOptions.alphabetically;
        this.subscriptions = this.store$.pipe(select(selectModuleSelection)).subscribe(
            (_modules) => {
                this.getServices(_modules);
            }
        );
        this.pinnedServiceArray = this.store$.pipe(select(selectAllPinnedServices));
    }



    /**
     * get all services of current module selection
     * @param modules - all currently selected modules
     */
     getServices(modules: Module[]) {
        this.moduleIds = modules.map((module) => module.id);
        this.onSelect();
    }


    /**
     * triggered from EventEmitter in ServiceLauncher-Button
     * onClick of service icon (svg)
     * open dialog and set current service in appState to this service
     * @param service - clicked service
     */
    openDialog(service: Service) {
         const config = new MatDialogConfig();
         const modal: MatDialogRef<ServiceSettingsComponent> = this.dialog.open(ServiceSettingsComponent, config);
         // set selected service in ngrx state
         this.appStateService.setService(service.id);
    }


    /**
     * triggered from EventEmitter in ServiceLauncher-Button
     * onClick of flag icon (svg)
     * dispatch newly pinned or unpinned service in ngrx store => all lists get updated
     * @param service - clicked service
     */
    pinService(service: Service) {
        const newPinnedService = service;
        this.store$.dispatch(new UpdateService({service: {id: Number(service.id), changes: service = newPinnedService}}));
    }


    /**
     * filter all services by input of search bar
     * @param event - input of search bar
     */
    onKey(event) {
        this.sorting = this.SortingOptions.default;
        this.serviceArray = this.store$.pipe(select(selectAllServicesFromModulesWhichStartsWith(this.moduleIds, event.target.value)));
    }


    /**
     * sort all services by sorting option
     * @param sorting -  sorting option, selection in DropDown menu
     *
     * TODO : sort by activity and by state, implement state and activity for services and reducer, which filters services by
     * TODO : corresponding arguments
     */
    onSelect() {

        switch (this.sorting) {
            case this.SortingOptions.default:
                this.serviceArray = this.store$.pipe(select(selectAllServicesFromModules(this.moduleIds)));
                this.sorting = this.SortingOptions.default;
                break;
            case this.SortingOptions.alphabetically:
                this.serviceArray = this.store$.pipe(select(selectAllServicesFromModulesAlphabetically(this.moduleIds)));
                this.sorting = this.SortingOptions.alphabetically;
                break;
            case this.SortingOptions.module:
                this.serviceArray = this.store$.pipe(select(selectAllServicesFromModulesSeperately(this.moduleIds)));
                this.sorting = this.SortingOptions.module;
                break;
            case this.SortingOptions.state:
                // TODO: implement sort by state functionality
                this.sorting = this.SortingOptions.state;
                break;
            case this.SortingOptions.activity:
                // TODO: implement sort by activity functionality
                this.sorting = this.SortingOptions.activity;
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
     * TODO: react to events. Adding argument 'Action' to service and set it here + dispatch in ngrx store + commit to opcua server
     */
    setAction(action: String) {
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


    /**
     * finally unsubscribe from all subscriptions
     */
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
