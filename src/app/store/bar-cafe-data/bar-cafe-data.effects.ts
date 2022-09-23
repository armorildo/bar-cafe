import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { State } from 'src/app/store/app.state';
import * as BusinessActions from './bar-cafe-data.actions';
import * as RouterActions from '../../store/router/router.actions';
import { BusinessDataService } from 'src/app/http/business-data.service';
import { of } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Injectable()
export class BusinessEffects {
  // 01 --> Load Business Data
  loadBusinessData = createEffect(() =>
    this.actions$.pipe(
      ofType(BusinessActions.loadBusinessData),
      mergeMap(() =>
        this.businessDataService.getBusinessData().pipe(
          tap((data) => console.log('recieved data', data)),
          map((data) => {
            RouterActions.routerGo({
              path: ['/menu']
            });
            return BusinessActions.loadBusinessDataCompleted({ data })
          }),
          catchError(() => of(BusinessActions.loadBusinessDataFailed()))
        )
      )
    )
  );

  loadBusinessDataFailed = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BusinessActions.loadBusinessDataFailed),
        tap(() =>
          this.snackbarService.showSnackbar(
            'general.feedback.data-loading.failed',
            4000
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private businessDataService: BusinessDataService,
    private snackbarService: SnackbarService
  ) { }
}