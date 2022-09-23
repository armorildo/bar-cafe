import { createAction, props } from '@ngrx/store';
import { BusinessDataDTO } from 'src/app/models/business-data';

// 01 --> Load Business Data
export const loadBusinessData = createAction('[Business Data] Load Business Data');
export const loadBusinessDataCompleted = createAction(
  '[Business Data] Load Business Data Completed',
  props<{ data: BusinessDataDTO }>()
);
export const loadBusinessDataFailed = createAction(
  '[Business Data] Load Business Data Failed'
);
