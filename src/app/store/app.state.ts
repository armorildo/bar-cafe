import { ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as businessData from './bar-cafe-data/bar-cafe-data.reducers';
import { BusinessData } from '../models/business-data';


export interface State {
  // router: fromRouter.RouterReducerState<any>;
  [businessData.featureKey]: businessData.BusinessState;
}

export const reducers: ActionReducerMap<State> = {
  // router: fromRouter.routerReducer,
  [businessData.featureKey]: businessData.reducer,
};

// export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<any>>('router');

