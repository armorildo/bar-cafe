import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBusiness from './bar-cafe-data.reducers';

// feature selector
export const getBusinessState =
  createFeatureSelector<fromBusiness.BusinessState>(
    fromBusiness.featureKey
  );

// business data selector
export const getBusinessData = createSelector(
  getBusinessState,
  (state: fromBusiness.BusinessState) => { return state.businessData }
);

// loading state selector
export const isLoading = createSelector(
  getBusinessState,
  (state: fromBusiness.BusinessState) => { return state.loading }
);
