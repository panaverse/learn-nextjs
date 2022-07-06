# Consuming GraphQL APIs on Client Side i.e. Client-side rendering (CSR)

To run Project give the following command:

npm run dev

Now open the project in the browser:

http://localhost:3000

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

## Tutorial
This example is based on this tutorial: [Getting Started With Apollo Client in Next.js](https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/)


## Step 1 (Creating a new project)
Create a new Next project with the following command. 
```bash
npx create-next-app step21_fetching_data_csr_graphql_extra --ts
```
## Step 2 (Addind required dependencies)
Add required dependencies in your project. 
```bash
yarn add @apollo/client graphql isomorphic-unfetch
```
## Step 3 (Setup apollo client)
Setup Apollo client for our Next.js application by creating a new file inside lib/apollo/index.js (See example of this project)

## Step 4 (Updating the _app.ts file with ApolloProvider wrapper)
Moving to you pages/ directory, we can now create a new _app.ts file and wrap the whole app using the official Apollo context provider:

```bash
export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
```

## Step 5 (Contructing the required queries)
Create two new files, lib/apollo/queries/getRockets.ts and lib/apollo/queries/getRocket.ts and contruct the queries. 

## Step 6 (Fetching homepage data on client side)
Client-side rendering is what we typically do in React apps. The browser requests the app, the page loads, then React requests the data and presents it to the user.

Inside the pages/index.tsx file, import useQuery hook and GET_ROCKETS query from "@apollo/client" and "lib/apollo/queries/getRockets" respectively. Finally use the useQuery hook to fetch the data from the api. 

```bash
import { useQuery } from '@apollo/client';
import GET_ROCKETS from '../lib/apollo/queries/getRockets';

const { loading, data } = useQuery<RocketsInterface>(GET_ROCKETS, {
    fetchPolicy: 'no-cache',
});
```

## Step 7 (Fetching rocket data on client side)
In the pages folder, create a new folder "rocket" and create a file "[id].tsx". This will act as the route to the detail of any rocket. 
In the [id].tsx page, import the useRouter hook from 'next/router' and use it to extract the id of the rocket in a query variable. Then import useQuery hook and GET_ROCKET query from '@apollo/client' and 'lib/apollo/queries/getRocket' respectively to call the rocket detail.

```bash
import { useQuery } from '@apollo/client';
import GET_ROCKET from '../../lib/apollo/queries/getRocket';
import { useRouter } from 'next/router';

const { query } = useRouter();
const { loading, data } = useQuery<RokcetInterface>(GET_ROCKET, {
    fetchPolicy: 'no-cache',
    variables: { rocketId: query.id }
});
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
