import { createReducer, on } from '@ngrx/store';
import * as BusinessActions from './bar-cafe-data.actions';
import { BusinessData } from 'src/app/models/business-data';

export const featureKey = 'business';

export interface BusinessState {
  businessData: BusinessData;
}

export const initialState: BusinessState = {
  businessData: new BusinessData,
};

export const reducer = createReducer(
  initialState,
  on(BusinessActions.loadBusinessDataCompleted, (state, action) => {
    return {
      ...state,
      businessData: new BusinessData(action.data),
    };
  })
);
