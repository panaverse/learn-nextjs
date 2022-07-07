import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from './store';
// import type { RootState } from '../app/store';

// declaring the types for our state
export interface CounterState {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions. 
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app. 
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. 
      // It doesn't actually mutate the state because it uses the Immer library, which detects changes to a "draft state" and produces a brand new immutable state based off those changes
      state.value++;
    },
    decrement: state => {
      state.value--;
    },
    multiply: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. 
      // It doesn't actually mutate the state because it uses the Immer library, which detects changes to a "draft state" and produces a brand new immutable state based off those changes
      state.value *= 2;
    },
    divide: state => {
      state.value /= 2;
    },
    // 'The increment by amount' action here, has one job and that is to take whatever value is passed to it and add that to state.value. 
    // The PayloadAction type here is used to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    // 'The multiply by amount' action here, has one job and that is to take whatever value is passed to it and multiply that to state.value. 
    // The PayloadAction type here is used to declare the contents of `action.payload`
    multiplyByAmount: (state, action: PayloadAction<number>) => {
      state.value *= action.payload;
    },
  },
});

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
// export const selectCount = (state: RootState) => state.countReducer.value;



// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { increment, decrement, multiply, divide, incrementByAmount, multiplyByAmount } = counterSlice.actions;
// exporting the reducer here, as we need to add this to the store
export default counterSlice.reducer;