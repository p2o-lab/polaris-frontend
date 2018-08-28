import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from './settings.service';
import {WebsocketService} from './websocket.service';
import {MatSnackBar} from '@angular/material';
import {ModuleInterface, RecipeInterface} from 'pfe-ree-interface';
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
      // console.log('ws received', data);
      if (data.msg === 'refresh') {
        if (data.data === 'recipes') {
          this.refreshRecipes();
        }
        if (data.data === 'recipe') {
          this.refreshActiveRecipe();
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

  private _activeRecipe: BehaviorSubject<RecipeInterface> = new BehaviorSubject<RecipeInterface>(undefined);

  private _autoReset: boolean;

  get autoReset(): boolean {
    return this._autoReset;
  }

  get activeRecipe(): Observable<RecipeInterface> {
    return this._activeRecipe.asObservable();
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

  refreshActiveRecipe() {
    this.http.get(`${this.settings.apiUrl}/activeRecipe`).subscribe((data: RecipeInterface) => {
        this._activeRecipe.next(data);
      }
    );
  }

  activateRecipe(id: string) {
    return this.http.post(`${this.settings.apiUrl}/recipe/${id}/active`, {});
  }

  startRecipe() {
    return this.http.post(`${this.settings.apiUrl}/recipe/start`, {});
  }

  resetRecipe() {
    return this.http.post(`${this.settings.apiUrl}/recipe/reset`, {});
  }

  abortRecipe() {
    return this.http.post(`${this.settings.apiUrl}/recipe/abort`, {});
  }

  editRecipe(recipeOptions) {
    return this.http.put(`${this.settings.apiUrl}/recipe`, recipeOptions);
  }

  removeRecipe(id: string) {
    return this.http.delete(`${this.settings.apiUrl}/recipe/${id}`);
  }
}
