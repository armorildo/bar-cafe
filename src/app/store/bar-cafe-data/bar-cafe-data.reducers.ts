import { createReducer, on } from '@ngrx/store';
import * as BusinessActions from './bar-cafe-data.actions';
import * as RouterActions from '../../store/router/router.actions';
import { BusinessData } from 'src/app/models/business-data';

export const featureKey = 'business';

export interface BusinessState {
  businessData: BusinessData;
  loading: boolean;
}

export const initialState: BusinessState = {
  businessData: new BusinessData,
  loading: true,
};

export const reducer = createReducer(
  initialState,
  on(BusinessActions.loadBusinessDataCompleted, (state, action) => {
    RouterActions.routerGo({
      path: ['']
    });
    return {
      ...state,
      businessData: new BusinessData(action.data),
      loading: false,
    };
  })
);
