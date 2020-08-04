import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PlayerInterface, RecipeState, Repeat} from '@p2olab/polaris-interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {SettingsService} from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    private _player: BehaviorSubject<PlayerInterface> = new BehaviorSubject<PlayerInterface>(
        {   playlist: [],
            currentRecipe: undefined,
            currentItem: undefined,
            repeat: Repeat.none,
            status: RecipeState.idle,
            recipeRuns: []});

    constructor(private http: HttpClient,
                private settings: SettingsService) {
        this.refreshPlayer();
    }

    get player(): Observable<PlayerInterface> {
        return this._player.asObservable();
    }

    public updatePlayer(player: PlayerInterface): void {
        this._player.next(player);
    }

    refreshPlayer(): void {
        this.http.get(`${this.settings.apiUrl}/player`)
            .subscribe((data: PlayerInterface) => {
                    this._player.next(data);
                }
            );
    }

    startPlayer(): Observable<Record<string, any>> {
        return this.http.post(`${this.settings.apiUrl}/player/start`, {});
    }

    resetPlayer(): Observable<Record<string, any>> {
        return this.http.post(`${this.settings.apiUrl}/player/reset`, {});
    }

    pausePlayer(): Observable<Record<string, any>> {
        return this.http.post(`${this.settings.apiUrl}/player/pause`, {});
    }

    resumePlayer(): Observable<Record<string, any>> {
        return this.http.post(`${this.settings.apiUrl}/player/resume`, {});
    }

    stopPlayer(): Observable<Record<string, any>> {
        return this.http.post(`${this.settings.apiUrl}/player/stop`, {});
    }

    enqueueRecipe(id: string): Observable<Record<string, any>> {
        return this.http.post(`${this.settings.apiUrl}/player/enqueue`, {recipeId: id});
    }

    removeRecipeFromPlaylist(index: number): Observable<Record<string, any>> {
        return this.http.post(`${this.settings.apiUrl}/player/remove`, {index});
    }

    playerForceTransition(currentStep: string, nextStep: string): Observable<Record<string, any>> {
        const body = {stepName: currentStep, nextStepName: nextStep};
        return this.http.post(`${this.settings.apiUrl}/player/forceTransition`, body);
    }

}
