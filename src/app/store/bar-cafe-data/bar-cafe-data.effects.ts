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
          map((data) => {
            // finish data load
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
          //show error if data could not be retrieved
          this.snackbarService.showSnackbar(
            'Failed to retrieve data',
            4000
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store$: Store<State>,
    private businessDataService: BusinessDataService,
    private snackbarService: SnackbarService
  ) { }
}
