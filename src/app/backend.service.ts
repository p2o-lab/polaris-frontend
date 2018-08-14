import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from './_services/settings.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {WebsocketService} from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient,
              private settings: SettingsService,
              private ws: WebsocketService) {


    this._modules = new BehaviorSubject<any[]>([]);
    this._recipe = new BehaviorSubject<any>(undefined);

    this.ws.connect(this.settings.apiUrl.replace('http', 'ws')).subscribe((msg) => {
      console.log('ws received', msg);
      if (msg.data === 'refresh') {
        this.refreshRecipe();
        this.refreshModules();
      }
    });
  }

  private _modules: BehaviorSubject<any[]>;

  get modules() {
    return this._modules.asObservable();
  }

  private _recipe: BehaviorSubject<any>;

  get recipe(): Observable<any> {
    return this._recipe.asObservable();
  }

  sendCommand(module: string, service: string, command: string) {
    return this.http.post(`${this.settings.apiUrl}/module/${module}/service/${service}/${command}`, {});

  }

  refreshModules() {
    this.http.get(`${this.settings.apiUrl}/module`).subscribe((data: any[]) => {
      this._modules.next(data);
    });
  }

  refreshRecipe() {
    this.http.get(`${this.settings.apiUrl}/recipe`).subscribe((data) => {
      this._recipe.next(data);
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
    return this.http.post(`${this.settings.apiUrl}/module`, moduleOptions);
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
