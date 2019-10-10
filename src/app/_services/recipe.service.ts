import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RecipeInterface} from '@p2olab/polaris-interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {SettingsService} from './settings.service';
import {NGXLogger} from 'ngx-logger';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    get recipes(): Observable<RecipeInterface[]> {
        return this._recipes.asObservable();
    }

    private _recipes: BehaviorSubject<RecipeInterface[]> = new BehaviorSubject<RecipeInterface[]>([]);

    constructor(private http: HttpClient,
                private settings: SettingsService,
                private logger: NGXLogger) {
        this.refreshRecipes();
    }

    public updateRecipes(recipes: RecipeInterface[]) {
        this._recipes.next(recipes);
    }

    refreshRecipes() {
        this.http.get(`${this.settings.apiUrl}/recipe`).subscribe(
            (data: RecipeInterface[]) => {
                this._recipes.next(data);
            },
            (error) => {
                this.logger.warn(`Something went wrong during getting recipes:`, error)
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

    instantiateVirtualService(virtualService: any) {
        return this.http.put(`${this.settings.apiUrl}/virtualService`, virtualService);
    }
}
