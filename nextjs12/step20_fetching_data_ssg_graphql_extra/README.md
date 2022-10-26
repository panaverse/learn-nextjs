# Consuming GraphQL APIs at Build time i.e. static site generation (SSG)

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
npx create-next-app step20_fetching_data_ssg_graphql_extra --ts
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

## Step 5 (Fetching homepage data on build time)
Fetching data for statically generated pages is done using the getStaticProps method provided by Next.js. Next.js will use this function during the build process to get any data needed to be passed into the page component as props.


Inside the pages/index.tsx file, import the initApollo function from apollo/cleint and create an apollo client instance.
```bash
const client = initApollo();
```

Make a new async function getStaticProps and import GET_ROCKETS query from lib/apollo/queries folder to use them to call the data inside this function. Finally return the data in form of an object that you want to show on homepgae.
```bash
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<RocketsInterface>({ query: GET_ROCKETS });
  return {
    props: {
      rockets: data.rockets
    }
  }
}
```
Now, you can find this data from the props of the main function to consume. 

## Step 6 (Creating all possible routes and fetching rocket detail data on build time)

In the pages folder, create a new folder "rocket" and create a file "[id].tsx". This will act as the route to the detail of any rocket. 

Inside the pages/rocket/[id].tsx file, import the initApollo function from apollo/cleint and create an apollo client instance.
```bash
const client = initApollo();
```

Inside same file, make a new async function "getStaticPaths" and import GET_ROCKETS query from lib/apollo/queries folder use them to call the data. Use this data and map through every entry and make an array consists of all possible paths and return it from this function. 

```bash
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<RocketsInterface>({ query: GET_ROCKETS });
  const paths = data.rockets.map((rocket) => ({
      params: {
        id: rocket.id
      }
  }));

  return {
      paths,
      fallback: false
  };  
}
```

Inside same file, make a new async function "getStaticProps" and get the rocket id from the context prop. Then import GET_ROCKET query from lib/apollo/queries folder use them to call the data inside this function. Finally return the rokcet detail data in form of an object that you want to show on the detail page.

```bash
export const getStaticProps: GetStaticProps = async (context) => {
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
