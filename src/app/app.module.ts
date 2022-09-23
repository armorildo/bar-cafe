import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenuModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([RouterEffects]),
  ],
  providers: [
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
