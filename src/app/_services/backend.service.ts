import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from './settings.service';
import {WebsocketService} from './websocket.service';
import {MatSnackBar} from '@angular/material';
import {ModuleInterface, RecipeInterface} from 'pfe-ree-interface';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private _modules: ModuleInterface[];

  constructor(private http: HttpClient,
              private settings: SettingsService,
              private ws: WebsocketService,
              private snackBar: MatSnackBar) {

    this.ws.connect(this.settings.apiUrl.replace('http', 'ws')).subscribe((msg) => {
      const data = JSON.parse(msg.data);
      console.log('ws received', data);
      if (data.msg === 'refresh') {
        if (data.data === 'recipe') {
          this.refreshRecipe();
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

    this.refreshRecipe();
    this.refreshModules();
    this.refreshAutoReset();
  }

  private _recipe: RecipeInterface;

  get recipe(): RecipeInterface {
    return this._recipe;
  }

  private _autoReset: boolean;

  get autoReset(): boolean {
    return this._autoReset;
  }

  get modules(): ModuleInterface[] {
    return this._modules;
  }

  set autoReset(value: boolean) {
    this.setAutoReset(value);
  }

  public refreshAutoReset() {
    this.http.get(`${this.settings.apiUrl}/autoReset`).subscribe((data: any) => {
      this._autoReset = data.autoReset;
    });
  }

  refreshRecipe() {
    this.http.get(`${this.settings.apiUrl}/recipe`).subscribe(
      (data: RecipeInterface) => {
        this._recipe = data;
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
      this._modules = data;
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
    return this.http.post(`${this.settings.apiUrl}/recipe`, recipeOptions);
  }
}
