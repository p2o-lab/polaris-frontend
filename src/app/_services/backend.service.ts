import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {BackendNotification, ModuleOptions} from '@p2olab/polaris-interface';
import {NGXLogger} from 'ngx-logger';
import {BehaviorSubject, Observable, of} from 'rxjs';
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

    // time series of all variables for last 5 min
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

    private pingTimeout:  any;
    private _autoReset: boolean;

    constructor(private http: HttpClient,
                private settings: SettingsService,
                private ws: WebsocketService,
                private snackBar: MatSnackBar,
                public recipeService: RecipeService,
                public playerService: PlayerService,
                public moduleService: ModuleService,
                private logger: NGXLogger) {

        this.connectToWebsocket();
    }

    public refreshAutoReset(): void {
        this.http.get(`${this.settings.apiUrl}/autoReset`)
            .pipe(timeout(2000))
            .subscribe(
            (data: any) => {
                this._autoReset = data.autoReset;
            },
            (error) => {
                this.logger.warn(`Backend does not respond (${this.settings.apiUrl})`, error);
            }
        );
    }

    public getLogs(): Observable<Record<string, any>> {
        return this.http.get(`${this.settings.apiUrl}/logs`);
    }

    public abortAllServices(): Observable<Record<string, any>> {
        return this.http.post(`${this.settings.apiUrl}/abort`, {});
    }

    public convertMtp(file: any): Observable<Record<string, any>> {
        const formData: FormData = new FormData();
        formData.append('upload', file);
        return this.http.post(`${this.settings.mtpConverterUrl}/json`, formData);
    }
  public convertNewPEAMtp(file: any): Observable<Record<string, any>> {
    //const formData: FormData = new FormData();
    //formData.append('upload', file);
    //return this.http.post(`${this.settings.apiUrl}/mtpConvertRequest`, formData);
    const data = {module: Array.of<ModuleOptions>()};
    return of(data);
  }

    public shutdown(): Observable<Record<string, any>> {
        return this.http.post(`${this.settings.apiUrl}/shutdown`, null);
    }

    public getVersion(): Observable<Record<string, any>> {
        return this.http.get(`${this.settings.apiUrl}/version`);
    }

    private heartbeat(): void {
        clearTimeout(this.pingTimeout);

        // Use `WebSocket#terminate()` and not `WebSocket#close()`. Delay should be
        // equal to the interval at which your server sends out pings plus a
        // conservative assumption of the latency.
        this.pingTimeout = setTimeout(() => {
            this.logger.warn('Connection to backend lost');
            this.snackBar.open('Connection to backend lost');
        }, 3000 + 1000);
    }

    private connectToWebsocket(): void {
        this.ws.connect(this.settings.apiUrl.replace('http', 'ws'))
            .subscribe((msg) => {
                const notification: BackendNotification = JSON.parse(msg.data);
                this.logger.trace('ws received', notification);
                if (notification.message === 'ping') {
                    this.heartbeat();
                }
                if (notification.message === 'recipes') {
                    this.recipeService.updateRecipes(notification.recipes);
                }
                if (notification.message === 'module') {
                   this.moduleService.updateModuleState(notification.module);
                }
                if (notification.message === 'service') {
                    this.moduleService.updateService(notification.moduleId, notification.service);
                }
                if (notification.message === 'virtualService') {
                    this.moduleService.updateVirtualServices(notification.virtualService);
                }
                if (notification.message === 'player') {
                    this.playerService.updatePlayer(notification.player);
                }
                if (notification.message === 'variable') {
                    this.addData(notification.variable);
                }
            });
    }

    private addData(data): void {
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
        const foundSeries = series.find((s) => s.name === seriesName);
        if (foundSeries) {
            if (timestamp.getTime() > foundSeries.data[foundSeries.data.length - 1][0]) {
                foundSeries.data.push([timestamp.getTime(), value * 1]);
                const firstTimestamp = foundSeries.data[0][0];
                if (timestamp.getTime() - firstTimestamp > 1000 * 60 * 5) {
                    foundSeries.data.shift();
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

    private setAutoReset(value: boolean): void {
        this.http.post(`${this.settings.apiUrl}/autoReset`, {autoReset: value}).subscribe((data: any) => {
            this._autoReset = data.autoReset;
        });
    }
}
