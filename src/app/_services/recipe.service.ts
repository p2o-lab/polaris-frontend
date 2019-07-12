import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from './settings.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {RecipeInterface} from '@p2olab/polaris-interface';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    get recipes(): Observable<RecipeInterface[]> {
        return this._recipes.asObservable();
    }

    private _recipes: BehaviorSubject<RecipeInterface[]> = new BehaviorSubject<RecipeInterface[]>([]);

    constructor(private http: HttpClient,
                private settings: SettingsService) {
        this.refreshRecipes();
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
