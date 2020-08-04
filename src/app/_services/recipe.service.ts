import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RecipeInterface, RecipeOptions, VirtualServiceInterface} from '@p2olab/polaris-interface';
import {NGXLogger} from 'ngx-logger';
import {BehaviorSubject, Observable} from 'rxjs';
import {SettingsService} from './settings.service';

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

    public updateRecipes(recipes: RecipeInterface[]): void {
        this._recipes.next(recipes);
    }

    refreshRecipes(): void {
        this.http.get(`${this.settings.apiUrl}/recipe`).subscribe(
            (data: RecipeInterface[]) => {
                this._recipes.next(data);
            },
            (error) => {
                this.logger.warn(`Something went wrong during getting recipes:`, error);
            });
    }

    getRecipe(id: string): Observable<RecipeInterface> {
        return this.http.get<RecipeInterface>(`${this.settings.apiUrl}/recipe/${id}`);
    }

    submitNewRecipe(recipeOptions: RecipeOptions): Observable<Record<string, any>> {
        return this.http.put(`${this.settings.apiUrl}/recipe`, recipeOptions);
    }

    removeRecipe(id: string): Observable<Record<string, any>> {
        return this.http.delete(`${this.settings.apiUrl}/recipe/${id}`);
    }

    instantiateVirtualService(virtualService: VirtualServiceInterface): Observable<Record<string, any>> {
        return this.http.put(`${this.settings.apiUrl}/virtualService`, virtualService);
    }
}
