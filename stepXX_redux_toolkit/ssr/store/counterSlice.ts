import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';

export interface CountState {
    counter: number,
}

const initialState: CountState = {
    counter: 0,
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.counter = state.counter + 1;
        },
        decrement: (state) => {
            state.counter = state.counter - 1;
        },
        incrementByAmuont: (state, action: PayloadAction<number>) => {
            state.counter = state.counter + action.payload;
        },

    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log('HYDRATE', state.counter, action.payload.counter.counter);
            state.counter = state.counter + action.payload.counter.counter
        },
    },

})

export const { increment, decrement, incrementByAmuont } = counterSlice.actions

export default counterSlice.reducer