import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBusiness from './bar-cafe-data.reducers';

export const getBusinessState =
  createFeatureSelector<fromBusiness.BusinessState>(
    fromBusiness.featureKey
  );

export const getBusinessData = createSelector(
  getBusinessState,
  (state: fromBusiness.BusinessState) => { return state.businessData }
);

export const isLoading = createSelector(
  getBusinessState,
  (state: fromBusiness.BusinessState) => { return state.loading }
);
