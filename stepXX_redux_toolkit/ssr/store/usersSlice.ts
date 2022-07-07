import { ActionCreator, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

interface Users {
  users: string[] | []
}

const initialState: Users = {
  users: []
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = [...state.users, action.payload]
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user: string) => (user !== action.payload))
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
        console.log('HYDRATE Actioin', action.payload.users.users);
        state.users = [...state.users, ...action.payload.users.users]
    },
},

})

export const { addUser, removeUser } = usersSlice.actions

export default usersSlice.reducer