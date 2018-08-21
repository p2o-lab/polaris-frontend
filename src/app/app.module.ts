import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
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
    AboutComponent
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
    MatCheckboxModule,
    AppRoutingModule,
    HttpClientModule,
    WebStorageModule
  ],
  providers: [SettingsService, BackendService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
