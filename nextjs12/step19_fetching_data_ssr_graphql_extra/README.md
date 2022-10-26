# Consuming GraphQL APIs on Server Side i.e. server-side rendering (SSR)

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
npx create-next-app step19_fetching_data_ssr_graphql_extra --ts
```

## Step 2 (Addind required dependencies)
Add required dependencies in your project. 
```bash
yarn add @apollo/client graphql isomorphic-unfetch
```
## Step 3 (Setup apollo client)
Setup Apollo client for our Next.js application by creating a new file inside lib/apollo/index.js (See example of this project)

## Step 4 (Contructing the required queries)
Create two new files, lib/apollo/queries/getRockets.ts and lib/apollo/queries/getRocket.ts and contruct the queries. 

## Step 5 (Fetching homepage data on server side)
Fetching data for server-side generated pages is done using the getServerSideProps method provided by Next.js. This function will be used during each page request to get any data passed into the page component as props.

Inside the pages/index.tsx file, import the initApollo function from apollo/cleint and create an apollo client instance.
```bash
const client = initApollo();
```

Then make a new aysnc function "getServerSideProps", and import GET_ROCKETS query from lib/apollo/queries folder use them to call the data inside this function. Finally return the data in form of an object that you want to show on homepgae.
export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query<RocketsInterface>({ query: GET_ROCKETS });
  return {
    props: {
      rockets: data.rockets
    }
  }
}
```
Now, you can find this data from the props of the main function to consume. 

## Step 6 (Fetching rocket detail data on server side)
In the pages folder, create a new folder "rocket" and create a file "[id].tsx". This will act as the route to the detail of any rocket. 

Then import the initApollo function from apollo/cleint and create an apollo client instance. 
```bash
const client = initApollo();
```

Inside the pages/rocket/[id].tsx file, make a new async function "getServerSideProps", get the rocket id from the context prop, and import GET_ROCKET query from lib/apollo/queries folder use them to call the data. Finally return the rokcet detail data in form of an object that you want to show on the detail page.

```bash
export const getServerSideProps: GetServerSideProps = async (context) => {
  const rocketId = context!.params!.id;
  const { data } = await client.query<RokcetInterface>({ query: GET_ROCKET, variables: { rocketId } });
  return {
    props: {
      rocket: data.rocket
    }
  };
}
```
Now, you can find this data from the props of the main function to consume. 

 
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
