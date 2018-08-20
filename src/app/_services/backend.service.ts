import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from './settings.service';
import {WebsocketService} from './websocket.service';
import {MatSnackBar} from '@angular/material';
import {ModuleInterface, RecipeManagerInterface} from 'pfe-interface';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient,
              private settings: SettingsService,
              private ws: WebsocketService,
              private snackBar: MatSnackBar) {


    this._modules = [];
    this._recipe = undefined;

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
  }

  private _modules: ModuleInterface[];

  get modules(): ModuleInterface[] {
    return this._modules;
  }

  private _recipe: RecipeManagerInterface;

  get recipe(): RecipeManagerInterface {
    return this._recipe;
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

  refreshRecipe() {
    this.http.get(`${this.settings.apiUrl}/recipe`).subscribe((data: RecipeManagerInterface) => {
      this._recipe = data;
    });
  }

  getRecipeOptions() {
    return this.http.get(`${this.settings.apiUrl}/recipe/options`);
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

  addModule(moduleOptions) {
    return this.http.post(`${this.settings.apiUrl}/module/new`, moduleOptions);
  }

  startRecipe() {
    return this.http.post(`${this.settings.apiUrl}/recipe/start`, {});
  }

  resetRecipe() {
    return this.http.post(`${this.settings.apiUrl}/recipe/reset`, {});
  }

  stopRecipe() {
    return this.http.post(`${this.settings.apiUrl}/recipe/stop`, {});
  }

  abortRecipe() {
    return this.http.post(`${this.settings.apiUrl}/recipe/abort`, {});
  }

  editRecipe(recipeOptions) {
    return this.http.post(`${this.settings.apiUrl}/recipe`, recipeOptions);
  }
}
