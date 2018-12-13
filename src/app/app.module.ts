import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RecipeOverviewComponent} from './recipe-overview/recipe-overview.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing';
import {SettingsService} from './_services/settings.service';
import {WebStorageModule} from 'ngx-store';
import {SettingsComponent} from './settings/settings.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModuleViewComponent} from './module-view/module-view.component';
import {BackendService} from './_services/backend.service';
import {WebsocketService} from './_services/websocket.service';
import {NewRecipeComponent} from './new-recipe/new-recipe.component';
import {NewModuleComponent} from './new-module/new-module.component';
import {ServiceViewComponent} from './service-view/service-view.component';
import {AboutComponent} from './about/about.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {PlayerComponent} from './player/player.component';
import {LogComponent} from './log/log.component';
import {ServiceParameterDialogComponent} from './service-parameter-dialog/service-parameter-dialog.component';
import * as moment from 'moment';


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
    ServiceParameterDialogComponent
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
    MatSortModule
  ],
  entryComponents: [
    ServiceParameterDialogComponent
  ],
  providers: [SettingsService, BackendService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
