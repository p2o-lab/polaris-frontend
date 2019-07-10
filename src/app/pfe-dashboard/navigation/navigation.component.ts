import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
    selectAllConnections,
    selectAllModuleEntities, selectAllPortEntities,
    selectAllSubpantEntities,
    selectAllSubpants,
    selectCurrentLevel,
    selectCurrentSelectionIDs,
    State
} from '../../reducers';
import { select, Store } from '@ngrx/store';
import { AppStateService } from '../../services/app-state.service';
import { Subplant } from '../../models/subplant.model';
import { Module } from '../../models/module.model';
import { Dictionary } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { CurrentSelection } from '../../models/current-selection.model';
import { Connection } from '../../models/connection.model';
import { Port } from '../../models/port.model';
import { NavbarComponent } from './navbar/navbar.component';
import { ShopfloorComponent } from './shopfloor/shopfloor.component';
import { SubplantComponent } from './subplant/subplant.component';
import { ModuleComponent } from './module/module.component';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

    protected currentLevel: number = 1;
    protected currentSelection: CurrentSelection;
    protected modules: Observable<Dictionary<Module>>;
    protected subplants: Observable<Dictionary<Subplant>>;
    protected connections: Observable<Connection[]>;
    protected ports: Observable<Dictionary<Port>>;

    constructor(
        private store$: Store<State>,
        private appStateService: AppStateService
    ) {
    }

    ngOnInit() {
        /*this.modules = this.store$.pipe(select(selectAllModuleEntities));
        this.subplants = this.store$.pipe(select(selectAllSubpantEntities));
        this.ports = this.store$.pipe(select(selectAllPortEntities));
        this.connections = this.store$.pipe(select(selectAllConnections));*/
    }

    goBack(steps: number) {
        this.appStateService.setLevel(steps);
    }

    selectSubplant(subplantID: string) {
        this.appStateService.setSubplant(subplantID);
    }

    selectModules(selection: { modules: string[], jump: boolean }) {
        if (selection.jump) {
            this.appStateService.setSingleModule(selection.modules);
        } else {
            this.appStateService.setModuleSelection(selection.modules);
        }
    }
}
