# Consuming GraphQL APIs on Server Side i.e. server-side rendering (SSR)

Read pages 99-111 of Chapter 4 of the [Real World Next.js](https://www.packtpub.com/product/real-world-next-js/9781801073493)

To Create Project give the following command:

Create the pages/index.tsx and pages/new-sign.tsx file

npm run dev

Now open the project in the browser:

http://localhost:3000



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started


## Step 1 (Creating a new project)
Create a new Next project with the following command. 
```bash
npx create-next-app signbook
```

## Step 2 (Addind required dependencies)
Add required dependencies in your project. 
```bash
yarn add @apollo/client graphql isomorphic-unfetch
```

## Step 3 (Creating an apollo client instance)
Create an Apollo client for our Next.js application by creating a new file inside lib/apollo/index.js (See example of this project)

## Step 4 (Updating the _app.ts file with ApolloProvider wrapper)
Moving to you pages/ directory, we can now create a new _app.ts file and wrap the whole app using the official Apollo context provider:
```bash
<ApolloProvider client={apolloClient}>
    <Component {...pageProps} />
</ApolloProvider>
```

## Step 5 (Contructing the required queries)
Create two new files, lib/apollo/queries/getLatestSigns.ts and lib/apollo/queries/addSign.ts and contruct the queries. 

## Step 6 (Fetching the data on client side)
Inside the pages/index.tsx file, import the useQuery hook and GET_LATEST_SIGNS query from apollo/cleint and lib/apollo/queries folder respectively and use them to call the data.   

```bash
import { useQuery } from "@apollo/client";
import GET_LATEST_SIGNS from '../lib/apollo/queries/getLatestSigns'

const { loading, data } = useQuery(GET_LATEST_SIGNS, {
    fetchPolicy: 'no-cache',
});

```
After showing the data on UI, If we now try to browse the home page, we will see a list of signs!

## Step 7 (Add functionality to add a new sign)
Create a simple route for adding a new sign by creating a new page under pages/new-sign.tsx.
Inside the pages/new-sign.tsx file, import the useMutation hook and ADD_SIGN query from apollo/cleint and lib/apollo/queries folder respectively and use them to call the data. 

const [addSign] = useMutation(ADD_SIGN, {
onCompleted() {
    router.push("/");
    }
});

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
