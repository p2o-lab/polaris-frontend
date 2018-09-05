import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from './settings.service';
import {WebsocketService} from './websocket.service';
import {MatSnackBar} from '@angular/material';
import {ModuleInterface, PlayerInterface, RecipeInterface} from 'pfe-ree-interface';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient,
              private settings: SettingsService,
              private ws: WebsocketService,
              private snackBar: MatSnackBar) {

    this.ws.connect(this.settings.apiUrl.replace('http', 'ws')).subscribe((msg) => {
      const data = JSON.parse(msg.data);
      console.log('ws received', data);
      if (data.msg === 'refresh') {
        if (data.data === 'recipes') {
          this.refreshRecipes();
        }
        if (data.data === 'recipe') {
          this.refreshPlayer();
          if (data.action === 'completed') {
            this.snackBar.open('Recipe completed', undefined, {
              duration: 4000,
            });
          }
        }
        if (data.data === 'module') {
          this.refreshModules();
        }
      }
    });

    this.refreshRecipes();
    this.refreshModules();
    this.refreshAutoReset();
  }

  private _modules: BehaviorSubject<ModuleInterface[]> = new BehaviorSubject<ModuleInterface[]>([]);

  get modules(): Observable<ModuleInterface[]> {
    return this._modules.asObservable();
  }

  private _recipes: BehaviorSubject<RecipeInterface[]> = new BehaviorSubject<RecipeInterface[]>([]);

  get recipes(): Observable<RecipeInterface[]> {
    return this._recipes.asObservable();
  }

  private _player: BehaviorSubject<PlayerInterface> = new BehaviorSubject<PlayerInterface>(undefined);

  private _autoReset: boolean;

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
    const body = {};
    if (strategy) {
      body['strategy'] = strategy;
    }
    if (parameters) {
      body['parameters'] = parameters;
    }

    return this.http.post(`${this.settings.apiUrl}/module/${module}/service/${service}/${command}`, body);
  }

  refreshModules() {
    this.http.get(`${this.settings.apiUrl}/module`).subscribe((data: any[]) => {
      this._modules.next(data);
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

  getLogs() {
    return this.http.get(`${this.settings.apiUrl}/logs`);
  }


  get player(): Observable<PlayerInterface> {
    return this._player.asObservable();
  }

  refreshPlayer() {
    this.http.get(`${this.settings.apiUrl}/player`).subscribe((data: any) => {
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
    return this.http.post(`${this.settings.apiUrl}/player/remove`, {index: index});
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


}
