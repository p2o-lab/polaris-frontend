import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ModuleInterface,
  ModuleOptions,
  ParameterOptions,
  ServiceInterface,
  VirtualServiceInterface
} from '@p2olab/polaris-interface';
import * as assignDeep from 'assign-deep';
import {NGXLogger} from 'ngx-logger';
import {BehaviorSubject, Observable} from 'rxjs';
import {SettingsService} from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class ModuleService {

    get modules(): Observable<ModuleInterface[]> {
        return this._modules.asObservable();
    }

    private _modules: BehaviorSubject<ModuleInterface[]> = new BehaviorSubject([]);

    get virtualServices(): Observable<VirtualServiceInterface[]> {
        return this._virtualServices.asObservable();
    }

    private _virtualServices: BehaviorSubject<VirtualServiceInterface[]> = new BehaviorSubject([]);

    constructor(private http: HttpClient,
                private settings: SettingsService,
                private snackBar: MatSnackBar,
                private logger: NGXLogger) {
        this.refreshModulesViaHttp();
        this.refreshVirtualServicesViaHttp();
    }

    public updateService(moduleId: string, newService: ServiceInterface): void {
        this.logger.trace('update service', newService);
        const modules = this._modules.value;
        const oldModule = modules.find((module) => module.id === moduleId);
        if (oldModule) {
            const oldService = oldModule.services.find((s) => s.name === newService.name);
            oldService.controlEnable = newService.controlEnable;
            oldService.status = newService.status;
            oldService.lastChange = newService.lastChange;
            oldService.operationMode = newService.operationMode;
            oldService.sourceMode = newService.sourceMode;
            newService.procedures.forEach((newProcedure) => {
                const oldProcedure = oldService.procedures.find((s) => s.id === newProcedure.id);
                newProcedure.parameters.forEach((newParam) => {
                    const oldParam = oldProcedure.parameters.find((p) => p.name === newParam.name);
                    Object.assign(oldParam, newParam);
                });
                newProcedure.processValuesIn.forEach((newParam) => {
                    const oldParam = oldProcedure.processValuesIn.find((p) => p.name === newParam.name);
                    Object.assign(oldParam, newParam);
                });
                newProcedure.processValuesOut.forEach((newParam) => {
                    const oldParam = oldProcedure.processValuesOut.find((p) => p.name === newParam.name);
                    Object.assign(oldParam, newParam);
                });
                newProcedure.reportParameters.forEach((newParam) => {
                    const oldParam = oldProcedure.reportParameters.find((p) => p.name === newParam.name);
                    Object.assign(oldParam, newParam);
                });
            });
        }
    }

    /**
     * update internal variables of module (service states, controlEnable of services, strategy parameters)
     */
    public updateModuleState(moduleInterface: ModuleInterface): void {
        const modules = this._modules.value;
        this.logger.debug('Update module', moduleInterface);
        const oldModule = modules.find((module) => module.id === moduleInterface.id);
        if (oldModule) {
            assignDeep(oldModule, moduleInterface);
        } else {
            modules.push(moduleInterface);
        }
    }

    updateVirtualServices(vService: VirtualServiceInterface): void {
        this.logger.info('Update virtual service');
        const virtualServices = this._virtualServices.value;
        const oldVirtualService = virtualServices.find((vs) => vs.name === vService.name);
        if (oldVirtualService) {
            Object.assign(oldVirtualService, vService);
        } else {
            virtualServices.push(vService);
        }
    }

    refreshModulesViaHttp(): void {
        this.http.get(`${this.settings.apiUrl}/module`).subscribe(
            (modules: ModuleInterface[]) => {
                this.logger.debug('modules refreshed via HTTP GET', modules);
                this._modules.next(modules);
            },
            () => {
                this.logger.warn(`Could not connect to ${this.settings.apiUrl}/module`);
                this.snackBar.open(`Could not connect to ${this.settings.apiUrl}/module. Check settings`);
            });
    }

    refreshVirtualServicesViaHttp(): void {
        this.http.get(`${this.settings.apiUrl}/virtualService`).subscribe((vServices: VirtualServiceInterface[]) => {
            this.logger.debug('virtual services refreshed via HTTP GET', vServices);
            this._virtualServices.next(vServices);
        });
    }

    addModule(moduleOptions: ModuleOptions): Observable<ModuleInterface[]> {
        return this.http.put<ModuleInterface[]>(`${this.settings.apiUrl}/module`, {module: moduleOptions});
    }

    connect(module: string): Observable<ModuleInterface> {
        return this.http.post<ModuleInterface>(`${this.settings.apiUrl}/module/${module}/connect`, {});
    }

    disconnect(module: string): Observable<ModuleInterface> {
        return this.http.post<ModuleInterface>(`${this.settings.apiUrl}/module/${module}/disconnect`, {});
    }

    removeModule(module: string): Observable<Record<string, any>> {
        this.removeModuleFromInternalStorage(module);
        return this.http.delete(`${this.settings.apiUrl}/module/${module}`);
    }

    sendCommand(module: string, service: string, command: string, procedure: string, parameters: Record<string, any>[]): Observable<any> {
        const body = {procedure:'',parameters:[]};
        if (procedure) {
            body.procedure = procedure;
        }
        if (parameters) {
            body.parameters = parameters;
        }
        return this.http.post(`${this.settings.apiUrl}/module/${module}/service/${service}/${command}`, body);
    }

    sendVirtualServiceCommand(service: string, command: string, parameters: Record<string, any>[]):Observable<Record<string, any>>{
        const body = {parameters:[]};
        if (parameters) {
            body.parameters = parameters;
        }
        return this.http.post(`${this.settings.apiUrl}/virtualService/${service}/${command}`, body);
    }

    configureService(module: ModuleInterface, service: ServiceInterface, procedureName?: string,
                     parameterOptions?: ParameterOptions[]): Observable<Record<string, any>> {
        return this.http.post(`${this.settings.apiUrl}/module/${module.id}/service/${service.name}`,
            {procedure: procedureName, parameters: parameterOptions});
    }

    private removeModuleFromInternalStorage(id: string) {
        this.logger.info(`remove module ${id}`);
        const modules = this._modules.value;
        const index = modules.findIndex((module) => module.id === id);
        if (index >= 0) {
            modules.splice(index, 1);
            this._modules.next(modules);
        }
    }
}
