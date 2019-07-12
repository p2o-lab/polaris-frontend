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

    refreshPlayer(player?: PlayerInterface) {
        if (!player) {
            this.http.get(`${this.settings.apiUrl}/player`)
                .subscribe((data: PlayerInterface) => {
                        this._player.next(data);
                    }
                );
        } else {
            this._player.next(player);
        }
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
        return this.http.post(`${this.settings.apiUrl}/player/remove`, {index});
    }

    playerForceTransition(currentStep: string, nextStep: string) {
        const body = {stepName: currentStep, nextStepName: nextStep};
        return this.http.post(`${this.settings.apiUrl}/player/forceTransition`, body);
    }

}
