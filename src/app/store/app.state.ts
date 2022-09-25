import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as businessData from './bar-cafe-data/bar-cafe-data.reducers';

//app state
export interface State {
  router: fromRouter.RouterReducerState<any>;
  [businessData.featureKey]: businessData.BusinessState;
}
//app reducers
export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  [businessData.featureKey]: businessData.reducer,
};
//router state selector
export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<any>>('router');

