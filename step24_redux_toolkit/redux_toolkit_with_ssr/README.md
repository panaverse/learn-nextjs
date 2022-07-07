# Global State Management with Redux Toolkit using  Server Side Rendering (SSR)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


## Important
To use Redux-toolkit on ssr or ssg, use thi library [Redux Wrapper for Next.js](https://github.com/kirill-konshin/next-redux-wrapper#getstaticprops)


## Step 1 (Add dependencies)
```bash
npm install @reduxjs/toolkit react-redux next-redux-wrapper --save
```


## Step 2 (Create the store/store.ts file)
```bash
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import users from './usersSlice'
import counter from './counterSlice'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = () =>
    configureStore({
        reducer: {},
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
```


## Step 3 (Wrap the project root with redux wrapper)

```bash
import { wrapper } from "../store/store";

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
};

export default wrapper.withRedux(App);
```

## Step 4 (Create the store/counterSlice.ts and store/usersSlice.ts file)
Redux requires that we write all state updates immutably, by making copies of data and updating the copies. However, Redux Toolkit's createSlice and createReducer APIs use Immer inside to allow us to write "mutating" update logic that becomes correct immutable updates.

```bash
// store/counterSlice.ts
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
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer

```

```bash
// store/usersSlice.ts
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
        state.users = [...state.users, ...action.payload.users.users]
    },
},

})

export const { addUser, removeUser } = usersSlice.actions
export default usersSlice.reducer

```

## Step 5 (Update the store/store.ts file)
Update the store.ts file which we made in step 1 and pass the rudcer which is exported from counterSlice.ts file. 

```bash
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import users from './usersSlice'
import counter from './counterSlice'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = () =>
    configureStore({
        reducer: combinedReducer,
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
```

## Step 6 (Use redux-toolkit with server side rendering)

```bash
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch(addUser("Added from Server side"))
    return {props:{}} 
  }
)
```

```bash
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch(incrementByAmuont(1))
    return {props:{}} 
  }
)
```


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
