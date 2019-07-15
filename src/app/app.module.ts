import {LayoutModule} from '@angular/cdk/layout';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MAT_SNACK_BAR_DEFAULT_OPTIONS,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { ChartModule } from 'angular-highcharts';
import 'hammerjs';
import * as moment from 'moment';
import {WebStorageModule} from 'ngx-store';
import { environment } from '../environments/environment';
import {BackendService} from './_services/backend.service';
import {SettingsService} from './_services/settings.service';
import {WebsocketService} from './_services/websocket.service';
import {AboutComponent} from './about/about.component';
import {AppRoutingModule} from './app-routing';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LogComponent} from './log/log.component';
import {ModuleViewComponent} from './module-view/module-view.component';
import {NewModuleComponent} from './new-module/new-module.component';
import {NewRecipeComponent} from './new-recipe/new-recipe.component';
import {PlayerComponent} from './player/player.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeOverviewComponent} from './recipe-overview/recipe-overview.component';
import {ServiceParameterDialogComponent} from './service-parameter-dialog/service-parameter-dialog.component';
import {ServiceViewComponent} from './service-view/service-view.component';
import {SettingsComponent} from './settings/settings.component';
import { TimeSeriesViewComponent } from './time-series-view/time-series-view.component';

moment.updateLocale('en', {
    relativeTime : {
        future: 'in %s',
        past:   '%s ago',
        s  : 'a few seconds',
        ss : '%d seconds',
        m:  'a minute',
        mm: '%d minutes',
        h:  'an hour',
        hh: '%d hours',
        d:  'a day',
        dd: '%d days',
        M:  'a month',
        MM: '%d months',
        y:  'a year',
        yy: '%d years'
    }
});
moment.relativeTimeThreshold('ss', 5);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RecipeOverviewComponent,
    SettingsComponent,
    ModuleViewComponent,
    NewRecipeComponent,
    NewModuleComponent,
    ServiceViewComponent,
    AboutComponent,
    RecipeDetailComponent,
    PlayerComponent,
    LogComponent,
    ServiceParameterDialogComponent,
    TimeSeriesViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    WebStorageModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatStepperModule,
      MatTooltipModule,
      MatProgressSpinnerModule,
    NgxChartsModule,
      ChartModule,
      LoadingBarHttpClientModule,
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    ServiceParameterDialogComponent
  ],
  providers: [
      SettingsService,
      BackendService,
      WebsocketService,
      {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
