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

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    public modules: ModuleInterface[] = [];
    private _player: BehaviorSubject<PlayerInterface> = new BehaviorSubject<PlayerInterface>(
        {    playlist: [],
            currentItem: undefined,
            repeat: Repeat.none,
            status: RecipeState.idle,
            recipeRuns: []});

    private _autoReset: boolean;


    constructor(private http: HttpClient,
                private settings: SettingsService,
                private ws: WebsocketService,
                private snackBar: MatSnackBar) {

        this.ws.connect(this.settings.apiUrl.replace('http', 'ws'))
            .subscribe((msg) => {
                const data: { message: string, data: any } = JSON.parse(msg.data);
                console.log('ws received', data.message, data.data);
                if (data.message === 'recipes') {
                    this.refreshRecipes();
                }
                if (data.message === 'module') {
                    if (data.data) {
                        if (data.data.module) {
                            const newModule = this.modules.find((module) => module.id === data.data.module);
                            if (newModule && newModule.services) {
                                const newService = newModule.services
                                    .find((service) => service.name === data.data.service);
                                if (data.data.lastChange) {
                                    newService.lastChange = data.data.lastChange;
                                }
                                if (data.data.state) {
                                    newService.status = data.data.state;
                                }
                                if (data.data.controlEnable) {
                                    newService.controlEnable = data.data.controlEnable;
                                }
                            }
                        }
                    } else {
                        this.refreshModules();
                    }
                }
                if (data.message === 'player') {
                  const player: PlayerInterface = data.data;
                  this._player.next(player);
                }
                if (data.message === 'action') {
                    if (data.data === 'recipeCompleted') {
                        this.snackBar.open('Recipe completed', 'Dismiss', {
                            duration: 3500,
                        });
                    }
                }
            });

        this.refreshRecipes();
        this.refreshModules();
        this.refreshAutoReset();
        this.refreshPlayer();
    }


    private _recipes: BehaviorSubject<RecipeInterface[]> = new BehaviorSubject<RecipeInterface[]>([]);

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

    refreshRecipes() {
        this.http.get(`${this.settings.apiUrl}/recipe`).subscribe(
            (data: RecipeInterface[]) => {
                this._recipes.next(data);
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

    getRecipe(id: string): Observable<RecipeInterface> {
        return this.http.get<RecipeInterface>(`${this.settings.apiUrl}/recipe/${id}`);
    }

    public getLogs() {
        return this.http.get(`${this.settings.apiUrl}/logs`);
    }

    get player(): Observable<PlayerInterface> {
        return this._player.asObservable();
    }

    refreshPlayer() {
        this.http.get(`${this.settings.apiUrl}/player`)
            .subscribe((data: PlayerInterface) => {
                console.log('player update via http get', data);
                this._player.next(data);
            }
        );
    }

    startPlayer() {
        return this.http.post(`${this.settings.apiUrl}/player/start`, {});
    }

    resetPlayer() {
        return this.http.post(`${this.settings.apiUrl}/player/reset`, {});
    }

    pausePlayer() {
        return this.http.post(`${this.settings.apiUrl}/player/pause`, {});
    }

    resumePlayer() {
        return this.http.post(`${this.settings.apiUrl}/player/resume`, {});
    }

    stopPlayer() {
        return this.http.post(`${this.settings.apiUrl}/player/stop`, {});
    }

    enqueueRecipe(id: string) {
        return this.http.post(`${this.settings.apiUrl}/player/enqueue`, {recipeId: id});
    }

    removeRecipeFromPlaylist(index: number) {
        return this.http.post(`${this.settings.apiUrl}/player/remove`, {index});
    }

    abortAllServices() {
        return this.http.post(`${this.settings.apiUrl}/abort`, {});
    }

    submitNewRecipe(recipeOptions) {
        return this.http.put(`${this.settings.apiUrl}/recipe`, recipeOptions);
    }

    removeRecipe(id: string) {
        return this.http.delete(`${this.settings.apiUrl}/recipe/${id}`);
    }

    playerForceTransition(currentStep: string, nextStep: string) {
        const body = {stepName: currentStep, nextStepName: nextStep};
        console.log("body", body);
        return this.http.post(`${this.settings.apiUrl}/player/forceTransition`, body);
    }

}
