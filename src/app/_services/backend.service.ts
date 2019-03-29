import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {
    ModuleInterface, ParameterOptions, PlayerInterface, RecipeInterface, RecipeState, Repeat,
    ServiceInterface, StrategyInterface
} from '@plt/pfe-ree-interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {SettingsService} from './settings.service';
import {WebsocketService} from './websocket.service';
import {RecipeService} from './recipe.service';
import {PlayerService} from './player.service';

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    public modules: ModuleInterface[] = [];

    private _autoReset: boolean;


    constructor(private http: HttpClient,
                private settings: SettingsService,
                private ws: WebsocketService,
                private snackBar: MatSnackBar,
                public recipeService: RecipeService,
                public playerService: PlayerService) {

        this.ws.connect(this.settings.apiUrl.replace('http', 'ws'))
            .subscribe((msg) => {
                const data: { message: string, data: any } = JSON.parse(msg.data);
                console.log('ws received', data.message, data.data);
                if (data.message === 'recipes') {
                    this.recipeService.refreshRecipes();
                }
                if (data.message === 'module') {
                    if (data.data) {
                        if (data.data.module) {
                            const newModule = this.modules.find((module) => module.id === data.data.module);
                            if (newModule && newModule.services) {
                                const newService = newModule.services
                                    .find((service) => service.name === data.data.service);
                                Object.assign(newService, data.data);
                            }
                        }
                    } else {
                        this.refreshModules();
                    }
                }
                if (data.message === 'player') {
                  this.playerService.refreshPlayer(data.data);
                }
                if (data.message === 'action') {
                    if (data.data === 'recipeCompleted') {
                        this.snackBar.open('Recipe completed', 'Dismiss', {
                            duration: 3500,
                        });
                    }
                }
            });
        this.refreshModules();
        this.refreshAutoReset();
    }

    get autoReset(): boolean {
        return this._autoReset;
    }

    set autoReset(value: boolean) {
        this.setAutoReset(value);
    }

    public refreshAutoReset() {
        this.http.get(`${this.settings.apiUrl}/autoReset`).subscribe((data: any) => {
            this._autoReset = data.autoReset;
        });
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

    configureStrategy(module: ModuleInterface, service: ServiceInterface, strategy: StrategyInterface, parameters: ParameterOptions[]) {
        return this.http.post(`${this.settings.apiUrl}/module/${module.id}/service/${service.name}/strategy`,
            {strategy: strategy.name, parameters});
    }

    refreshModules() {
        this.http.get(`${this.settings.apiUrl}/module`).subscribe((data: ModuleInterface[]) => {
            console.log('modules refreshed via HTTP GET', data);
            this.modules = data;
        });
    }

    addModule(moduleOptions) {
        return this.http.put(`${this.settings.apiUrl}/module`, moduleOptions);
    }

    connect(module: string) {
        return this.http.post(`${this.settings.apiUrl}/module/${module}/connect`, {});
    }

    disconnect(module: string) {
        return this.http.post(`${this.settings.apiUrl}/module/${module}/disconnect`, {});
    }

    removeModule(module: string) {
        return this.http.delete(`${this.settings.apiUrl}/module/${module}`);
    }

    private setAutoReset(value: boolean) {
        this.http.post(`${this.settings.apiUrl}/autoReset`, {autoReset: value}).subscribe((data: any) => {
            this._autoReset = data.autoReset;
        });
    }

    public getLogs() {
        return this.http.get(`${this.settings.apiUrl}/logs`);
    }

    abortAllServices() {
        return this.http.post(`${this.settings.apiUrl}/abort`, {});
    }
}
