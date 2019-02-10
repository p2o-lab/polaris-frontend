import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AboutComponent} from './about/about.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LogComponent} from './log/log.component';
import {ModuleViewComponent} from './module-view/module-view.component';
import {NewModuleComponent} from './new-module/new-module.component';
import {NewRecipeComponent} from './new-recipe/new-recipe.component';
import {PlayerComponent} from './player/player.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeOverviewComponent} from './recipe-overview/recipe-overview.component';
import {SettingsComponent} from './settings/settings.component';
import {TimeSeriesViewComponent} from './time-series-view/time-series-view.component';

const routes: Routes = [
  {path: '', redirectTo: '/modules', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'modules', component: ModuleViewComponent},
  {path: 'modules/new', component: NewModuleComponent},
  {path: 'logs', component: LogComponent},
  {path: 'player', component: PlayerComponent},
  {path: 'recipe', component: RecipeOverviewComponent},
  {path: 'recipe/new', component: NewRecipeComponent},
  {path: 'recipe/:id', component: RecipeDetailComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'timeseries', component: TimeSeriesViewComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
