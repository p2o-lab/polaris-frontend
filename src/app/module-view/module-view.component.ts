import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ModuleInterface, VirtualServiceInterface} from '@p2olab/polaris-interface';
import {Observable} from 'rxjs';
import {ModuleService} from '../_services/module.service';
import {NewModuleComponent} from '../new-module/new-module.component';
import {NewVirtualServiceComponent} from '../new-virtual-service/new-virtual-service.component';
import {ServiceParameterDialogComponent} from '../service-parameter-dialog/service-parameter-dialog.component';

@Component({
    selector: 'app-module-view',
    templateUrl: './module-view.component.html',
    styleUrls: ['./module-view.component.css']
})
export class ModuleViewComponent {

    public modules$: Observable<ModuleInterface[]> = this.backend.modules;

    public virtualServices$: Observable<VirtualServiceInterface[]> = this.backend.virtualServices;

    constructor(public backend: ModuleService,
                private dialog: MatDialog) {
    }

    connect(module: string) {
        this.backend.connect(module).subscribe((data) => {
            console.log('Connect result', data);
        });
    }

    disconnect(module: string) {
        this.backend.disconnect(module).subscribe((data) => {
            console.log('Disconnect result', data);
        });
    }

    remove(module: string) {
        this.backend.removeModule(module).subscribe((data) => console.log('Remove result', data));
    }

    configure(module: ModuleInterface) {
        this.dialog.open(ServiceParameterDialogComponent, {
            data: module
        });
    }

    instantiateVirtualService() {
        this.dialog.open(NewVirtualServiceComponent, {});
    }

    newModule() {
        this.dialog.open(NewModuleComponent, {
            width: '800px',
            height: '800px'
        });
    }
}
