import { ActionCreator, createSlice, PayloadAction } from '@reduxjs/toolkit'

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

  }
})

export const { addUser, removeUser } = usersSlice.actions

export default usersSlice.reducer