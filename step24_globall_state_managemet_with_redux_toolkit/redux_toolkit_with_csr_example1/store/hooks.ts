import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

import type {
  AppDispatch,
  RootState,
} from './store';

export const selectCount = (state: RootState) => state.counter.value;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;