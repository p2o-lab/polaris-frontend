import {SettingsService} from './settings.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ModuleInterface, ServiceInterface, StrategyInterface} from '@p2olab/polaris-interface/dist/interfaces';
import {ParameterOptions} from '@p2olab/polaris-interface/dist/RecipeOptions';

@Injectable({
    providedIn: 'root'
})
export class ModuleService {

    // all modules
    get modules(): Observable<ModuleInterface[]> {
        return this._modules.asObservable();
    }
    private _modules: BehaviorSubject<ModuleInterface[]> = new BehaviorSubject([]);


    constructor(private http: HttpClient,
                private settings: SettingsService) {
        this.refreshModules();
    }

    /** update internal variables of module (service states, controlEnable of services, strategy parameters)
     * by searching according to the name of module, service, strategy and parameter provided in data
     * @param data
     */
    public updateModuleState(data) {
        if (data) {
            if (data.module) {
                let modules = this._modules.value;
                const newModule = modules.find((module) => module.id === data.module);
                if (newModule && newModule.services && data.service) {
                    const newService = newModule.services.find((service) => service.name === data.service);
                    if (newService && newService.strategies) {
                        if (data.strategy) {
                            const newStrategy = newService.strategies.find((strategy) => strategy.id === data.strategy);
                            if (newStrategy && newStrategy.parameters && data.parameter ) {
                                const newParameter = newStrategy.parameters
                                    .find((parameter) => parameter.name === data.parameter);
                                if (newParameter) {
                                    Object.assign(newParameter, data);
                                }
                            }
                        } else {
                            Object.assign(newService, data);
                        }
                    }

                }
                this._modules.next(modules)
            }
        } else {
            this.refreshModules();
        }
    }

    refreshModules() {
        this.http.get(`${this.settings.apiUrl}/module`).subscribe((modules: ModuleInterface[]) => {
            console.log('modules refreshed via HTTP GET', modules);
            this._modules.next(modules);
        });
    }

    addModule(moduleOptions) {
        return this.http.put(`${this.settings.apiUrl}/module`, {module: moduleOptions});
    }

    connect(module: string) {
        return this.http.post(`${this.settings.apiUrl}/module/${module}/connect`, {});
    }

    disconnect(module: string) {
        let modules = this._modules.value;
        const index = modules.findIndex((mod) => module === mod.id);
        modules.splice(index, 1);
        return this.http.post(`${this.settings.apiUrl}/module/${module}/disconnect`, {});
    }

    removeModule(module: string) {
        return this.http.delete(`${this.settings.apiUrl}/module/${module}`);
    }

    sendCommand(module: string, service: string, command: string, strategy: string, parameters: object[]) {
        const body: any = {};
        if (strategy) {
            body.strategy = strategy;
        }
        if (parameters) {
            body.parameters = parameters;
        }
        return this.http.post(`${this.settings.apiUrl}/module/${module}/service/${service}/${command}`, body);
    }

    configureServiceParameters(module: ModuleInterface, service: ServiceInterface, parameterOptions: ParameterOptions[]) {
        return this.http.post(`${this.settings.apiUrl}/module/${module.id}/service/${service.name}/parameter`,
            {parameters: parameterOptions});
    }

    configureStrategy(module: ModuleInterface, service: ServiceInterface, strategy: StrategyInterface, parameters?: ParameterOptions[]) {
        return this.http.post(`${this.settings.apiUrl}/module/${module.id}/service/${service.name}/strategy`,
            {strategy: strategy.name, parameters: parameters});
    }

}