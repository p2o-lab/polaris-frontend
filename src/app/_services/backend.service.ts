import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {BehaviorSubject, Observable} from 'rxjs';
import {timeout} from 'rxjs/internal/operators';
import {ModuleService} from './module.service';
import {PlayerService} from './player.service';
import {RecipeService} from './recipe.service';
import {SettingsService} from './settings.service';
import {WebsocketService} from './websocket.service';

export interface VariableInterface {
    variableName: string;
    recentValue: number;
    unit: string;
    timestamp: Date;
}

export interface ModuleVariableInterface {
    moduleName: string;
    variables: VariableInterface[];
}

export interface UpdatedVariableInterface {
    module: string;
    variable: string;
    value: any;
    unit: string;
    timestamp: Date;
}

export interface SeriesInterface {
    name: string;
    data: number[][];
}

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    // holds last single update of variable
    get updatedVariable(): Observable<UpdatedVariableInterface> {
        return this._updatedVariable.asObservable();
    }

    // current value of all variables from all modules
    get variables(): Observable<ModuleVariableInterface[]> {
        return this._variables.asObservable();
    }

    // timeseries of all variables for last 5 min
    get series(): Observable<SeriesInterface[]> {
        return this._series.asObservable();
    }

    get autoReset(): boolean {
        return this._autoReset;
    }

    set autoReset(value: boolean) {
        this.setAutoReset(value);
    }
    public _series: BehaviorSubject<SeriesInterface[]> = new BehaviorSubject([]);
    private _updatedVariable: BehaviorSubject<UpdatedVariableInterface> = new BehaviorSubject(undefined);
    private _variables: BehaviorSubject<ModuleVariableInterface[]> = new BehaviorSubject([]);

    private pingTimeout: any;
    private _autoReset: boolean;

    constructor(private http: HttpClient,
                private settings: SettingsService,
                private ws: WebsocketService,
                private snackBar: MatSnackBar,
                public recipeService: RecipeService,
                public playerService: PlayerService,
                public moduleService: ModuleService) {

        this.connectToWebsocket();
        this.refreshAutoReset();
    }

    public refreshAutoReset() {
        this.http.get(`${this.settings.apiUrl}/autoReset`)
            .pipe(timeout(2000))
            .subscribe(
            (data: any) => {
                this._autoReset = data.autoReset;
            },
            (error) => {
                this.snackBar.open(`Backend does not respond (${this.settings.apiUrl}).`);
            }
        );
    }

    public getLogs() {
        return this.http.get(`${this.settings.apiUrl}/logs`);
    }

    public abortAllServices() {
        return this.http.post(`${this.settings.apiUrl}/abort`, {});
    }

    public convertMtp(file) {
        const formData: FormData = new FormData();
        formData.append('upload', file);
        return this.http.post(`${this.settings.mtpConverterUrl}/json`, formData);
    }

    public shutdown() {
        return this.http.post(`${this.settings.apiUrl}/shutdown`, null);
    }

    public getVersion() {
        return this.http.get(`${this.settings.apiUrl}/version`);
    }

    private heartbeat() {
        clearTimeout(this.pingTimeout);

        // Use `WebSocket#terminate()` and not `WebSocket#close()`. Delay should be
        // equal to the interval at which your server sends out pings plus a
        // conservative assumption of the latency.
        this.pingTimeout = setTimeout(() => {
            console.log('Connection to backend lost');
            this.snackBar.open('Connection to backend lost');
        }, 3000 + 1000);
    }

    private connectToWebsocket() {
        this.ws.connect(this.settings.apiUrl.replace('http', 'ws'))
            .subscribe((msg) => {
                const data: { message: string, data: any } = JSON.parse(msg.data);
                // console.log('ws received', data.message, data.data);
                if (data.message === 'ping') {
                    this.heartbeat();
                }
                if (data.message === 'recipes') {
                    this.recipeService.refreshRecipes();
                }
                if (data.message === 'module') {
                   this.moduleService.updateModuleState(data.data);
                }
                if (data.message === 'player') {
                    this.playerService.refreshPlayer(data.data);
                }
                if (data.message === 'action') {
                    this.handleAction(data.data);
                }
                if (data.message === 'variable') {
                    this.addData(data.data);
                }
            });
    }

    private handleAction(data: string) {
        if (data === 'recipeCompleted') {
            this.snackBar.open('Recipe completed', 'Dismiss', {
                duration: 3500,
            });
        }
    }

    private addData(data) {
        const name = data.variable as string;
        const module = data.module as string;
        const value = data.value;
        const unit = data.unit;
        const timestamp = new Date(data.timestampPfe);

        const variables: ModuleVariableInterface[] = this._variables.value;
        let m: ModuleVariableInterface = variables
            .find((mod: ModuleVariableInterface) => {
                return (mod.moduleName === module);
            });
        if (!m) {
            m = {moduleName: module, variables: []};
            variables.push(m);
        }
        let v = m.variables.find((moduleVariable) => moduleVariable.variableName === name);
        if (!v) {
            v = {variableName: name, recentValue: value, timestamp, unit};
            m.variables.push(v);
        } else {
            v.recentValue = value;
            v.unit = unit;
            v.timestamp = timestamp;
        }
        this._variables.next(variables);

        this._updatedVariable.next({module, variable: name, value, timestamp, unit});

        const series: SeriesInterface[] = this._series.value;
        const seriesName = `${module}.${name}`;
        const serie = series.find((s) => s.name === seriesName);
        if (serie) {
            if (timestamp.getTime() > serie.data[serie.data.length - 1][0]) {
                serie.data.push([timestamp.getTime(), value * 1]);
                const firstTimestamp = serie.data[0][0];
                if (timestamp.getTime() - firstTimestamp > 1000 * 60 * 5) {
                    serie.data.shift();
                }
            }
        } else {
            series.push({
                name: seriesName,
                type: 'line',
                tooltip: {
                    valueDecimals: 3,
                    valueSuffix: ` ${data.unit}`
                },
                data: [[timestamp.getTime(), value]]
            } as any);
        }
        this._series.next(series);
    }

    private setAutoReset(value: boolean) {
        this.http.post(`${this.settings.apiUrl}/autoReset`, {autoReset: value}).subscribe((data: any) => {
            this._autoReset = data.autoReset;
        });
    }
}
