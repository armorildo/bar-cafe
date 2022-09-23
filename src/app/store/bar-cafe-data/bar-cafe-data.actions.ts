import { createAction, props } from '@ngrx/store';
import { BusinessDataDTO } from 'src/app/models/business-data';

// 01 --> Load Business Data
export const loadBusinessData = createAction('[BusinessData] Load BusinessData');
export const loadBusinessDataCompleted = createAction(
  '[BusinessData] Load BusinessData Completed',
  props<{ data: BusinessDataDTO }>()
);
export const loadBusinessDataFailed = createAction(
  '[BusinessData] Load BusinessData Failed'
);
