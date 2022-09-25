import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MenuModule } from './menu/menu.module';
import { HeaderComponent } from './header/header.component';
import { Store, StoreModule } from '@ngrx/store';
import { reducers, State } from './store/app.state';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { loadBusinessData } from './store/bar-cafe-data/bar-cafe-data.actions';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RouterEffects } from './store/router/router.effects';
import { featureKey } from './store/bar-cafe-data/bar-cafe-data.reducers';
import * as fromBusinessData from './store/bar-cafe-data/bar-cafe-data.reducers';
import { BusinessEffects } from './store/bar-cafe-data/bar-cafe-data.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MenuModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    StoreModule.forFeature(featureKey, fromBusinessData.reducer),
    EffectsModule.forFeature([BusinessEffects]),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([RouterEffects]),
  ],
  providers: [
    // dispatch call to load business data on app initialisation
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<State>) => () => { return store.dispatch(loadBusinessData()) },
      deps: [Store],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
