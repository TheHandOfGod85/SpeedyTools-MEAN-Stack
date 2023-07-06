import { createAction, props } from '@ngrx/store';

export const toggleIsLoading = createAction(
  '[Shared Page] Toggle IsLoading',
  props<{ isLoading: boolean }>()
);
