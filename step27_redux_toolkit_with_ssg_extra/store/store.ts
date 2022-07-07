import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import users from './usersSlice'
import counter from './counterSlice'
import { createWrapper } from 'next-redux-wrapper'

const combinedReducer = combineReducers({
  counter,
  users,
});

const makeStore = () =>
    configureStore({
        reducer: combinedReducer,
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);