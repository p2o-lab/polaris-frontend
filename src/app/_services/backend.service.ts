import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {
    ModuleInterface, ParameterOptions, RecipeInterface,
    ServiceInterface, StrategyInterface
} from '@plt/pfe-ree-interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {SettingsService} from './settings.service';
import {WebsocketService} from './websocket.service';
import {RecipeService} from './recipe.service';
import {PlayerService} from './player.service';

export interface VariableInterface {
    variableName: string;
    recentValue: number;
    timestamp: Date;
}

export interface ModuleVariableInterface {
    moduleName: string;
    variables: VariableInterface[];
}

export interface UpdatedVariableInterface {
    module: string, variable: string; value: number, timestamp: Date
}

export interface SeriesInterface {
    name: string, data: number[][]
}

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    public modules: ModuleInterface[] = [];

    private _autoReset: boolean;

    private _variables: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]) ;
    private _var: ModuleVariableInterface[] = [];

    private _updatedVariable: BehaviorSubject<UpdatedVariableInterface> = new BehaviorSubject<UpdatedVariableInterface>(undefined);
    public series: SeriesInterface[] = [];


    constructor(private http: HttpClient,
                private settings: SettingsService,
                private ws: WebsocketService,
                private snackBar: MatSnackBar,

                private recipeService: RecipeService,
                private playerService: PlayerService) {

        this.ws.connect(this.settings.apiUrl.replace('http', 'ws'))
            .subscribe((msg) => {
                const data: { message: string, data: any } = JSON.parse(msg.data);
                // console.log('ws received', data.message, data.data);
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
                if (data.message === 'variable') {
                    const name = <string> data.data.variable;
                    const module = <string> data.data.module;
                    const value  = <number> data.data.value;
                    const timestamp = new Date(data.data.timestampPfe);

                    let m: ModuleVariableInterface = this._var
                        .find((m: ModuleVariableInterface) => {return (m.moduleName == module)});
                    if (!m) {
                        m = {moduleName: module, variables: []};
                        this._var.push(m);
                    }
                    let v = m.variables.find(v => v.variableName == name);
                    if (!v) {
                        v = {variableName: name, recentValue: value, timestamp: timestamp};
                        m.variables.push(v);
                    } else {
                        v.recentValue = value;
                        v.timestamp = timestamp;
                    }
                    this._variables.next(this._var);
                    this._updatedVariable.next({module: module, variable: name, value: value, timestamp: timestamp});

                    const seriesName = `${module}.${name}`;
                    let serie = this.series.find(s=> s.name === seriesName);

                    if (serie) {
                        serie.data.push([timestamp.getTime(), value]);
                        const firstTimestamp = serie.data[0][0];
                        if (new Date().getTime() - firstTimestamp > 1000*60*5) {
                            serie.data.shift();
                        }
                    } else {
                        this.series.push({name: seriesName, data: [[timestamp.getTime(), value]]});
                    }
             }
            });
        this.refreshModules();
        this.refreshAutoReset();
    }

    get updatedVariable(): Observable<UpdatedVariableInterface> {
        return this._updatedVariable.asObservable();
    }

    private _recipes: BehaviorSubject<RecipeInterface[]> = new BehaviorSubject<RecipeInterface[]>([]);

    get variables(): Observable<any[]> {
        return this._variables.asObservable();
    }

    get recipes(): Observable<RecipeInterface[]> {
        return this._recipes.asObservable();
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
        return this.http.put(`${this.settings.apiUrl}/module`, {modules: moduleOptions});
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

    public convertMtp(file) {
        const formData: FormData = new FormData();
        formData.append('upload', file);
        return this.http.post(`${this.settings.mtpConverterUrl}/json`, formData);
    }
}
