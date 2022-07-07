# Global State Management with Redux Toolkit using  client-side rendering (CSR)

First understand the [Redux overview and concepts](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)

The Redux team recommends that everyone should use Redux Toolkit, therefore we are not following the plain Redux example of our textbook, but only covering Redux Toolkit from seprate sources.

You can also watch the introductory [Redux Video Tutorial by Zeeshan Hanif](https://github.com/panacloud/bootcamp-2020#part-vi-managing-state-with-redux)

We will follow this [tutorial](https://www.merixstudio.com/blog/introduction-using-redux-toolkit-nextjs-and-typescript/)

Also review the official [example](https://github.com/vercel/next.js/tree/canary/examples/with-redux)

yarn add @reduxjs/toolkit react-redux 

yarn add axios


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Step 1 (Add dependencies)
```bash
npm install @reduxjs/toolkit react-redux
```

## Step 2 (Create the store/store.ts file)
```bash
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```

## Step 3 (Wrap the project root with redux Provider)
Once the store is created, we can make it available to our React components by putting a React-Redux <Provider> around our application in pages/_app.tsx. Import the Redux store we just created, put a <Provider> around your <App>, and pass the store as a prop:

```bash
import { Provider } from 'react-redux';
import { store } from '../store/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
```


## Step 4 (Create the store/counterSlice.ts file)
Redux requires that we write all state updates immutably, by making copies of data and updating the copies. However, Redux Toolkit's createSlice and createReducer APIs use Immer inside to allow us to write "mutating" update logic that becomes correct immutable updates.

```bash
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer

```

```bash
import { ActionCreator, createSlice, PayloadAction } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = [...state.users, action.payload]
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user: string) => (user !== action.payload))
    }
  }
})

export const { addUser, removeUser } = usersSlice.actions
export default usersSlice.reducer
```


## Step 5 (Update the store/store.ts file)
Update the store.ts file which we made in step 1 and pass the rudcer which is exported from counterSlice.ts file. 

```bash
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import users from './usersSlice'
import counter from './counterSlice'

const combinedReducer = combineReducers({
  counter,
  users,
});

export const store = configureStore({
  reducer: {
    reducer: combinedReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
```

## Step 6 (Read and update the state)


```bash
// Read
import { useSelector } from 'react-redux'
const {counter} = useSelector((state) => state.counter);
const { users } = useSelector((state) => state.reducer.users );
```

```bash
// Update

// import functions
import { useDispatch } from 'react-redux'
import { increment, decrement } from "../store/counterSlice";

// make a dispatch instance
const dispatch = useDispatch()

// use like this
<button style={btnStyle} onClick={() => dispatch(decrement())}>-1</button>
<button style={btnStyle} onClick={() => dispatch(increment())}>+1</button>

```


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
