import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from './settings.service';
import {MatSnackBar} from '@angular/material';
import {BehaviorSubject, Observable} from 'rxjs';
import {RecipeInterface} from '@plt/pfe-ree-interface';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    constructor(private http: HttpClient,
                private settings: SettingsService) {
        this.refreshRecipes();
    }

    private _recipes: BehaviorSubject<RecipeInterface[]> = new BehaviorSubject<RecipeInterface[]>([]);

    get recipes(): Observable<RecipeInterface[]> {
        return this._recipes.asObservable();
    }

    refreshRecipes() {
        this.http.get(`${this.settings.apiUrl}/recipe`).subscribe(
            (data: RecipeInterface[]) => {
                this._recipes.next(data);
            });
    }

    getRecipe(id: string): Observable<RecipeInterface> {
        return this.http.get<RecipeInterface>(`${this.settings.apiUrl}/recipe/${id}`);
    }

    submitNewRecipe(recipeOptions) {
        return this.http.put(`${this.settings.apiUrl}/recipe`, recipeOptions);
    }

    removeRecipe(id: string) {
        return this.http.delete(`${this.settings.apiUrl}/recipe/${id}`);
    }

}