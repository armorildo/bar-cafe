import { createReducer, on } from '@ngrx/store';
import * as BusinessActions from './bar-cafe-data.actions';
import * as RouterActions from '../../store/router/router.actions';
import { BusinessData } from 'src/app/models/business-data';

// feature name
export const featureKey = 'business';

//state interface
export interface BusinessState {
  businessData: BusinessData;
  loading: boolean;
}
//initial state
export const initialState: BusinessState = {
  //main data for the app
  businessData: new BusinessData,
  //is data loading
  loading: true,
};

export const reducer = createReducer(
  initialState,
  //update state
  on(BusinessActions.loadBusinessDataCompleted, (state, action) => {
    // navigate to menu
    RouterActions.routerGo({
      path: ['menu']
    });
    return {
      //initial state
      ...state,
      // update business data
      businessData: new BusinessData(action.data),
      // update loading status to false
      loading: false,
    };
  })
);
