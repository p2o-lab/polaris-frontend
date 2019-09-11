import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ModuleInterface, ModuleOptions, VirtualServiceInterface} from '@p2olab/polaris-interface';
import {NGXLogger} from 'ngx-logger';
import {Observable} from 'rxjs';
import {BackendService} from '../_services/backend.service';
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

    public modules$: Observable<ModuleInterface[]> = this.moduleService.modules;

    public virtualServices$: Observable<VirtualServiceInterface[]> = this.moduleService.virtualServices;

    constructor(private moduleService: ModuleService,
                private dialog: MatDialog,
                private backend: BackendService,
                private logger: NGXLogger) {
    }

    connect(module: string) {
        this.moduleService.connect(module).subscribe((data) => {
            this.logger.debug('Connect result', data);
        });
    }

    disconnect(module: string) {
        this.moduleService.disconnect(module).subscribe((data) => {
            this.logger.debug('Disconnect result', data);
        });
    }

    remove(module: string) {
        this.moduleService.removeModule(module).subscribe((data) => this.logger.debug('Remove result', data));
    }

    configure(module: ModuleInterface) {
        this.dialog.open(ServiceParameterDialogComponent, {
            data: module
        });
    }

    instantiateVirtualService() {
        this.dialog.open(NewVirtualServiceComponent, {});
    }

    public async fileNameChanged(event) {
        const file: File = event.target.files[0];
        let module: ModuleOptions = null;
        await new Promise((resolve) => {
            if (file.name.endsWith('.mtp') || file.name.endsWith('.zip')) {
                this.backend.convertMtp(file).subscribe((data: { modules: ModuleOptions[] }) => {
                    module = data.modules[0];
                    resolve();
                });
            } else {
                const reader: FileReader = new FileReader();
                reader.onload = () => {
                    module = JSON.parse(reader.result.toString()).modules[0] as ModuleOptions;
                    resolve();
                };
                reader.readAsText(file);
            }
        });
        module.opcua_server_url = this.addDefaultPort(module.opcua_server_url);

        this.dialog.open(NewModuleComponent, {
            width: '800px',
            height: '800px',
            data: module
        });
    }
    /**
     * Add default port (4840) to server url if not present
     * @param opcuaServerUrl
     */
    public addDefaultPort(opcuaServerUrl: string): string {
        const re = new RegExp('(opc\.tcp):\/\/([^:\/]+)(:[0-9]+)?(\S*)?');
        return opcuaServerUrl.replace(re, (match, scheme, host, port, path) => {
            return `${scheme}://${host}${port || ':4840'}${path || ''}`;
        });
    }

    public newModule() {
        this.dialog.open(NewModuleComponent);
    }
}
